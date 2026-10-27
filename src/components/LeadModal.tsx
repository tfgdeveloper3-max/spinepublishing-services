import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
    type ReactNode,
    type Ref,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./motion";
import { submitLead, withHeading } from "../lib/submitLead";

export type SelectedPlan = { name: string; price: number };

type LeadModalContextValue = {
    openLeadModal: () => void;
    openLeadModalForPlan: (plan: SelectedPlan) => void;
};
const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
    const ctx = useContext(LeadModalContext);
    if (!ctx) throw new Error("useLeadModal must be used inside <LeadModalProvider>");
    return ctx;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState<SelectedPlan | null>(null);

    const openLeadModal = useCallback(() => {
        setPlan(null);
        setOpen(true);
    }, []);
    const openLeadModalForPlan = useCallback((p: SelectedPlan) => {
        setPlan(p);
        setOpen(true);
    }, []);

    return (
        <LeadModalContext.Provider value={{ openLeadModal, openLeadModalForPlan }}>
            {children}
            <LeadModal open={open} plan={plan} onClose={() => setOpen(false)} />
        </LeadModalContext.Provider>
    );
}

/* =========================================================
   Modal
   ========================================================= */
type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const EMPTY: Fields = { name: "", email: "", phone: "", message: "" };

function validate(f: Fields, hasPlan: boolean): Errors {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email.";
    if (!/^[+\d\s()-]{7,}$/.test(f.phone)) e.phone = "Please enter a valid phone number.";
    // when a plan is chosen, the message is optional (the plan already says what they want)
    if (!hasPlan && !f.message.trim()) e.message = "Tell us a little about your book.";
    return e;
}

const inputCls =
    "w-full rounded-lg border border-white/80 bg-white/70 px-4 py-3 font-body text-[15px] text-ink outline-none transition-[box-shadow,background-color] duration-300 placeholder:text-neutral-500 focus:bg-white focus:shadow-[0_0_0_2px_var(--color-brand-light)] 2xl:text-[16px]";

function LeadModal({ open, plan, onClose }: { open: boolean; plan: SelectedPlan | null; onClose: () => void }) {
    const [fields, setFields] = useState<Fields>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const firstInputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    // reset when closed
    useEffect(() => {
        if (!open) {
            const t = window.setTimeout(() => {
                setFields(EMPTY);
                setErrors({});
                setStatus("idle");
            }, 300);
            return () => window.clearTimeout(t);
        }
    }, [open]);

    // lock page scroll, close on Esc, keep keyboard focus inside the modal
    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 150);

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Tab" && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusables.length) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.clearTimeout(focusTimer);
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFields((f) => ({ ...f, [name]: value }));
        if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
        if (status === "error") setStatus("idle");
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const found = validate(fields, !!plan);
        setErrors(found);
        if (Object.keys(found).length) return;

        setStatus("sending");
        try {
            await submitLead({
                name: fields.name.trim(),
                email: fields.email.trim(),
                phone_number: fields.phone.trim(),
                // the API has no "plan" field, so the chosen plan goes on top of the message as a heading
                message: plan
                    ? withHeading(`Selected Plan: ${plan.name} ($${plan.price})`, fields.message)
                    : fields.message.trim(),
            });
            setStatus("sent");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    const field = (name: keyof Fields, label: string, type = "text", ref?: Ref<HTMLInputElement>) => (
        <div>
            <label htmlFor={`lead-${name}`} className="sr-only">
                {label}
            </label>
            <input
                ref={ref}
                id={`lead-${name}`}
                name={name}
                type={type}
                value={fields[name]}
                onChange={onChange}
                placeholder={label}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `lead-${name}-error` : undefined}
                className={inputCls}
            />
            {errors[name] && (
                <p id={`lead-${name}-error`} className="mt-1 font-body text-[12px] text-red-600">
                    {errors[name]}
                </p>
            )}
        </div>
    );

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="lead-modal"
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* backdrop */}
                    <div
                        className="absolute inset-0 bg-[#2a1f36]/45 backdrop-blur-md"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* dialog */}
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="lead-modal-title"
                        className="relative my-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-[0_30px_80px_-20px_rgba(42,31,54,0.6)] backdrop-blur-2xl 2xl:max-w-[640px]"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.97 }}
                        transition={{ duration: 0.45, ease: EASE }}
                    >
                        {/* header */}
                        <div className="bg-brand-gradient relative px-7 pb-6 pt-7 text-white 2xl:px-9">
                            <motion.span
                                aria-hidden="true"
                                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                                animate={{ scale: [1, 1.25, 1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                            <h2 id="lead-modal-title" className="relative pr-10 font-heading text-[26px] leading-tight 2xl:text-[32px]">
                                Start Your Publishing Journey
                            </h2>
                            <p className="relative mt-2 font-body text-[14px] text-white/85 2xl:text-[16px]">
                                Share a few details and a publishing specialist will contact you within one business day.
                            </p>
                            {plan && (
                                <motion.div
                                    className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 font-body text-[13px] backdrop-blur-sm 2xl:text-[15px]"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    Selected plan: <strong className="font-semibold">{plan.name}</strong> · ${plan.price}
                                </motion.div>
                            )}
                        </div>

                        {/* body */}
                        <div className="px-7 py-7 2xl:px-9 2xl:py-8">
                            <AnimatePresence mode="wait" initial={false}>
                                {status === "sent" ? (
                                    <motion.div
                                        key="success"
                                        className="flex flex-col items-center py-6 text-center"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, ease: EASE }}
                                    >
                                        <motion.div
                                            className="bg-brand-gradient flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                                        >
                                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <motion.path
                                                    d="M5 12l5 5L20 7"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 0.5, delay: 0.35 }}
                                                />
                                            </svg>
                                        </motion.div>
                                        <h3 className="mt-5 font-heading text-[24px] text-[#2c2c2c]">Thank You!</h3>
                                        <p className="mt-2 max-w-[360px] font-body text-[15px] text-neutral-600" role="status">
                                            We've received your details. Our team will reach out to you shortly.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="bg-brand-gradient mt-6 px-8 py-2.5 font-body text-[15px] font-semibold text-white"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={onSubmit}
                                        noValidate
                                        className="grid gap-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {field("name", "Your Full Name", "text", firstInputRef)}
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {field("email", "Email Address", "email")}
                                            {field("phone", "Phone Number", "tel")}
                                        </div>
                                        <div>
                                            <label htmlFor="lead-message" className="sr-only">
                                                Tell us about your book
                                            </label>
                                            <textarea
                                                id="lead-message"
                                                name="message"
                                                rows={4}
                                                value={fields.message}
                                                onChange={onChange}
                                                placeholder={
                                                    plan
                                                        ? "Anything you'd like us to know about your book? (optional)"
                                                        : "Tell us about your book or what you need help with..."
                                                }
                                                aria-invalid={!!errors.message}
                                                aria-describedby={errors.message ? "lead-message-error" : undefined}
                                                className={`${inputCls} resize-none`}
                                            />
                                            {errors.message && (
                                                <p id="lead-message-error" className="mt-1 font-body text-[12px] text-red-600">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {status === "error" && (
                                            <p className="rounded-lg bg-red-50 px-4 py-3 font-body text-[13px] text-red-700" role="alert">
                                                Sorry, something went wrong sending your details. Please try again, or email us directly.
                                            </p>
                                        )}

                                        <motion.button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="bg-brand-gradient mt-1 inline-flex w-full items-center justify-center gap-2 py-3.5 font-body text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(77,55,96,0.7)] disabled:cursor-wait disabled:opacity-80 2xl:text-[17px]"
                                            whileHover={{ scale: status === "sending" ? 1 : 1.015 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {status === "sending" && (
                                                <motion.span
                                                    className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                />
                                            )}
                                            {status === "sending" ? "Sending..." : plan ? `Get Started with ${plan.name}` : "Get Started"}
                                        </motion.button>

                                        <p className="text-center font-body text-[12px] text-neutral-500">
                                            Your information is kept private and only used to contact you about your book.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}