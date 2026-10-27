import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { EASE } from "../motion";
import { CONTACT } from "../Footer";

/* ---------- Form ---------- */
type Fields = { name: string; email: string; phone: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const EMPTY: Fields = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(f: Fields): Errors {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email.";
    if (f.phone && !/^[+\d\s()-]{7,}$/.test(f.phone)) e.phone = "Please enter a valid phone number.";
    if (!f.message.trim()) e.message = "Please write a short message.";
    return e;
}

const inputBase =
    "w-full bg-white px-4 py-3.5 font-body text-[14px] text-ink shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18)] outline-none transition-[box-shadow] duration-300 placeholder:text-neutral-500 focus:shadow-[0_0_0_2px_var(--color-brand-light),0_10px_24px_-10px_rgba(77,55,96,0.45)] 2xl:py-4 2xl:text-[16px]";

const formVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Field({
    name,
    label,
    type = "text",
    value,
    error,
    onChange,
    textarea,
    className = "",
}: {
    name: keyof Fields;
    label: string;
    type?: string;
    value: string;
    error?: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textarea?: boolean;
    className?: string;
}) {
    const id = `contact-${name}`;
    const errorId = `${id}-error`;
    const shared = {
        id,
        name,
        value,
        onChange,
        placeholder: label,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : undefined,
    };

    return (
        <motion.div variants={fieldVariants} className={className}>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            {textarea ? (
                <textarea {...shared} rows={5} className={`${inputBase} resize-none`} />
            ) : (
                <input {...shared} type={type} className={inputBase} />
            )}
            <AnimatePresence>
                {error && (
                    <motion.p
                        id={errorId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1.5 font-body text-[12px] text-red-600"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ---------- Info icons ---------- */
function InfoIcon({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-light text-brand-dark transition-colors duration-300 group-hover:bg-brand-gradient group-hover:border-transparent group-hover:text-white 2xl:h-14 2xl:w-14">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {children}
            </svg>
        </div>
    );
}

const INFO = [
    {
        title: "Phone",
        value: CONTACT.phone,
        href: `tel:${CONTACT.phoneTel}`,
        icon: (
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2z" />
        ),
    },
    {
        title: "Email",
        value: CONTACT.email,
        href: `mailto:${CONTACT.email}`,
        icon: <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.4V8l8 4.8L20 8v-.6l-8 4.8z" />,
    },
    {
        title: "Location",
        value: CONTACT.address,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`,
        icon: <path d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z" />,
    },
];

/* ---------- Section ---------- */
export default function ContactSection() {
    const [fields, setFields] = useState<Fields>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFields((f) => ({ ...f, [name]: value }));
        if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
        if (status === "sent") setStatus("idle");
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const found = validate(fields);
        setErrors(found);
        if (Object.keys(found).length) return;

        setStatus("sending");
        // TODO: send `fields` to your backend / Formspree / EmailJS here, e.g.
        // await fetch("https://formspree.io/f/your-id", { method: "POST", body: JSON.stringify(fields), headers: { "Content-Type": "application/json" } });
        await new Promise((r) => setTimeout(r, 900));
        setStatus("sent");
        setFields(EMPTY);
    };

    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&z=14&output=embed`;

    return (
        <section id="contact-form" className="bg-white py-20 lg:py-28">
            <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                {/* ---------- Form + map ---------- */}
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 2xl:gap-24">
                    <div>
                        <motion.h2
                            className="max-w-[560px] font-heading text-[34px] leading-[1.15] text-[#3a3a3a] sm:text-[42px] xl:text-[48px] 2xl:text-[56px]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.8, ease: EASE }}
                        >
                            Contact Us For Further Information &amp; Publishing Support
                        </motion.h2>
                        <motion.p
                            className="mt-4 max-w-[560px] font-body text-[15px] leading-relaxed text-neutral-600 2xl:text-[17px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                        >
                            Ready to take the next step with your manuscript? Fill out the form below or drop by our office. Our
                            dedicated publishing specialists are ready to answer your questions and help you bring your book to
                            readers worldwide.
                        </motion.p>

                        <motion.form
                            onSubmit={onSubmit}
                            noValidate
                            className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-x-5"
                            variants={formVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <Field name="name" label="Your Full Name" value={fields.name} error={errors.name} onChange={onChange} />
                            <Field name="email" label="Email Address" type="email" value={fields.email} error={errors.email} onChange={onChange} />
                            <Field name="phone" label="Phone Number" type="tel" value={fields.phone} error={errors.phone} onChange={onChange} />
                            <Field name="subject" label="Subject / Book Title" value={fields.subject} onChange={onChange} />
                            <Field
                                name="message"
                                label="Tell us about your manuscript or inquiry..."
                                textarea
                                value={fields.message}
                                error={errors.message}
                                onChange={onChange}
                                className="sm:col-span-2"
                            />

                            <motion.div variants={fieldVariants} className="sm:col-span-2">
                                <motion.button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="bg-brand-gradient relative w-full overflow-hidden py-3.5 font-body text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(77,55,96,0.7)] disabled:cursor-wait 2xl:py-4 2xl:text-[17px]"
                                    whileHover={{ scale: status === "sending" ? 1 : 1.015 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={status}
                                            className="inline-flex items-center gap-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {status === "sending" && (
                                                <motion.span
                                                    className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                />
                                            )}
                                            {status === "idle" && "Send Message"}
                                            {status === "sending" && "Sending..."}
                                            {status === "sent" && "Message Sent ✓"}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>

                                <AnimatePresence>
                                    {status === "sent" && (
                                        <motion.p
                                            role="status"
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mt-3 font-body text-[14px] text-brand-dark"
                                        >
                                            Thanks for reaching out! We'll get back to you soon.
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.form>
                    </div>

                    {/* Map with offset purple block */}
                    <motion.div
                        className="relative mr-4 mb-4 lg:mr-6 lg:mb-6"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: EASE }}
                    >
                        <motion.div
                            aria-hidden="true"
                            className="absolute -bottom-4 -right-4 h-[72%] w-[56%] lg:-bottom-6 lg:-right-6"
                            style={{ backgroundImage: "linear-gradient(90deg, var(--color-brand-dark), var(--color-brand-light))" }}
                            initial={{ scale: 0.6, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
                        />
                        <div className="relative z-10 overflow-hidden rounded-2xl bg-[#e9e6ee] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)]">
                            <iframe
                                title={`Map showing ${CONTACT.address}`}
                                src={mapSrc}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="block aspect-[376/360] w-full border-0 grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0 lg:aspect-[376/362]"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* ---------- Contact info ---------- */}
                <motion.h2
                    className="mt-24 text-center font-heading text-[30px] leading-tight text-[#3a3a3a] sm:text-[36px] xl:text-[42px] 2xl:mt-32 2xl:text-[50px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    Get in Touch with Spine Publishing Services Direct
                </motion.h2>

                <motion.div
                    className="mx-auto mt-10 grid max-w-[1200px] gap-10 sm:grid-cols-3"
                    variants={formVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    {INFO.map((item) => (
                        <motion.a
                            key={item.title}
                            href={item.href}
                            target={item.title === "Location" ? "_blank" : undefined}
                            rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                            variants={fieldVariants}
                            whileHover={{ y: -4 }}
                            className="group flex flex-col items-center text-center"
                        >
                            <InfoIcon>{item.icon}</InfoIcon>
                            <h3 className="mt-3 font-heading text-[18px] text-black 2xl:text-[21px]">{item.title}</h3>
                            <p className="mt-2 max-w-[280px] break-words font-body text-[15px] font-semibold text-neutral-600 transition-colors group-hover:text-brand-dark 2xl:text-[17px]">
                                {item.value}
                            </p>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}