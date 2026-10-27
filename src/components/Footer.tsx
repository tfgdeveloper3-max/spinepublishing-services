import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { EASE } from "./motion";
import { LOGO_SRC } from "./Navbar";

const USEFUL_LINKS = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Publishing Services", to: "/services" },
    { label: "Author Success Stories", to: "/#testimonials" },
    { label: "Contact Us", to: "/contact" },
];

const SOCIALS = [
    { label: "Facebook", href: "https://facebook.com", icon: "/icons/social/facebook.svg" },
    { label: "X (Twitter)", href: "https://x.com", icon: "/icons/social/x.svg" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "/icons/social/linkedin.svg" },
];

export const CONTACT = {
    phone: "+1 (800) 555-SPINE / +1 800 555 7746",
    phoneTel: "+18005557746",
    email: "support@spinepublishing.com",
    address: "100 Literary Way, Suite 500, New York, NY 10001",
};

function IconWrap({ children }: { children: ReactNode }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mt-1 shrink-0 text-brand-light" aria-hidden="true">
            {children}
        </svg>
    );
}
const PhoneIcon = () => (
    <IconWrap>
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2z" />
    </IconWrap>
);
const MailIcon = () => (
    <IconWrap>
        <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.4V8l8 4.8L20 8v-.6l-8 4.8z" />
    </IconWrap>
);
const PinIcon = () => (
    <IconWrap>
        <path d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z" />
    </IconWrap>
);

const colsVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const colVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const headingCls = "font-body text-[18px] font-semibold text-black 2xl:text-[21px]";
const textCls = "font-body text-[14px] leading-[1.9] text-neutral-700 2xl:text-[16px]";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(true);
    const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!valid || !agreed) {
            setStatus("error");
            return;
        }
        setStatus("done");
        setEmail("");
    };

    return (
        <footer
            id="contact"
            className="relative"
            style={{
                background:
                    "radial-gradient(ellipse 55% 70% at 100% 100%, rgba(196,160,240,0.75) 0%, rgba(196,160,240,0) 70%), radial-gradient(ellipse 45% 60% at 20% 40%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg, #efe4fb 0%, #e6d6fa 100%)",
            }}
        >
            <motion.div
                className="mx-auto grid w-full max-w-[1760px] gap-12 px-6 pb-12 pt-16 sm:grid-cols-2 md:px-10 lg:grid-cols-[1.3fr_0.8fr_1fr_1.3fr] lg:gap-10 lg:pt-20 xl:px-16 2xl:px-24"
                variants={colsVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Brand */}
                <motion.div variants={colVariants}>
                    <Link to="/" aria-label="Spine Publishing Services home" className="inline-block">
                        <img src={LOGO_SRC} alt="Spine Publishing Services" className="h-12 w-auto object-contain 2xl:h-14" />
                    </Link>
                    <p className={`mt-5 max-w-[320px] ${textCls}`}>
                        Transforming manuscripts into global bestsellers with end-to-end publishing, design, and marketing support
                        tailored for authors.
                    </p>
                    <div className="mt-6 flex gap-3">
                        {SOCIALS.map((s) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="bg-brand-gradient flex h-9 w-9 items-center justify-center shadow-[0_6px_14px_-6px_rgba(77,55,96,0.7)] 2xl:h-11 2xl:w-11"
                                whileHover={{ y: -4, scale: 1.05 }}
                                whileTap={{ scale: 0.94 }}
                            >
                                <img src={s.icon} alt="" className="h-4 w-4 object-contain 2xl:h-5 2xl:w-5" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Useful links */}
                <motion.div variants={colVariants}>
                    <h3 className={headingCls}>Useful Links</h3>
                    <ul className="mt-5 space-y-1">
                        {USEFUL_LINKS.map((l) => (
                            <li key={l.label}>
                                <Link to={l.to} className={`group flex items-center gap-3 ${textCls} transition-colors hover:text-brand-dark`}>
                                    <span className="h-1.5 w-1.5 rotate-45 bg-brand-light transition-transform duration-300 group-hover:scale-150" />
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">{l.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Contact */}
                <motion.div variants={colVariants}>
                    <h3 className={headingCls}>Contact Us</h3>
                    <ul className="mt-5 space-y-3">
                        <li className="flex gap-3">
                            <PhoneIcon />
                            <a href={`tel:${CONTACT.phoneTel}`} className={`${textCls} hover:text-brand-dark`}>
                                {CONTACT.phone}
                            </a>
                        </li>
                        <li className="flex gap-3">
                            <MailIcon />
                            <a href={`mailto:${CONTACT.email}`} className={`${textCls} break-all hover:text-brand-dark`}>
                                {CONTACT.email}
                            </a>
                        </li>
                        <li className="flex gap-3">
                            <PinIcon />
                            <span className={`max-w-[220px] ${textCls}`}>{CONTACT.address}</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div variants={colVariants}>
                    <h3 className={headingCls}>Stay Inspired</h3>
                    <form onSubmit={onSubmit} noValidate className="mt-5">
                        <div className="flex shadow-[0_8px_20px_-10px_rgba(77,55,96,0.5)]">
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (status !== "idle") setStatus("idle");
                                }}
                                placeholder="Enter your email address..."
                                className="min-w-0 flex-1 bg-white px-5 py-3 font-body text-[14px] text-ink outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-light 2xl:text-[16px]"
                            />
                            <motion.button
                                type="submit"
                                aria-label="Subscribe"
                                className="bg-brand-gradient flex w-12 items-center justify-center text-white 2xl:w-14"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.94 }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M21.7 2.3a1 1 0 0 0-1.05-.23l-18 7a1 1 0 0 0 .02 1.87l7.3 2.6 2.6 7.3a1 1 0 0 0 1.87.02l7-18a1 1 0 0 0-.24-1.06z" />
                                </svg>
                            </motion.button>
                        </div>

                        <label className="mt-4 flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="peer sr-only"
                            />
                            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border border-brand-light bg-white transition-colors peer-checked:border-transparent peer-checked:bg-brand-dark peer-focus-visible:ring-2 peer-focus-visible:ring-brand-light">
                                {agreed && (
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                )}
                            </span>
                            <span className="font-body text-[13px] leading-snug text-neutral-700 2xl:text-[15px]">
                                Subscribe to receive exclusive publishing insights, industry trends, and author guides.
                            </span>
                        </label>

                        <AnimatePresence mode="wait">
                            {status !== "idle" && (
                                <motion.p
                                    key={status}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`mt-3 font-body text-[13px] ${status === "done" ? "text-brand-dark" : "text-red-600"}`}
                                    role="status"
                                >
                                    {status === "done"
                                        ? "Thanks for subscribing! Check your inbox for a confirmation."
                                        : !agreed
                                            ? "Please tick the box to subscribe."
                                            : "Please enter a valid email address."}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
                className="mx-auto w-full max-w-[1760px] px-6 pb-8 md:px-10 xl:px-16 2xl:px-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE }}
            >
                <div className="border-l-2 border-brand-light bg-white/50 px-5 py-4 backdrop-blur-sm">
                    <p className="font-body text-[13px] font-semibold text-black 2xl:text-[15px]">Disclaimer</p>
                    <p className="mt-1 font-body text-[12px] leading-relaxed text-neutral-600 2xl:text-[14px]">
                        Spine Publishing Services is an independent book publishing services company. We are not affiliated with,
                        endorsed by, or sponsored by Amazon, Barnes &amp; Noble, IngramSpark, Kobo, Apple Books, Trustpilot, Clutch, or
                        any other retailer or platform mentioned on this website. All trademarks, logos, and brand names belong to their
                        respective owners and are used for identification purposes only. Book covers shown are examples of client
                        projects. Results such as sales, rankings, and reviews vary by author and are not guaranteed.
                    </p>
                </div>
            </motion.div>

            {/* Copyright */}
            <div className="border-t border-neutral-700/60">
                <p className="px-6 py-4 text-center font-body text-[14px] text-black 2xl:text-[16px]">
                    Copyright © {new Date().getFullYear()} Spine Publishing Services. All rights reserved.
                </p>
            </div>
        </footer>
    );
}