import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { EASE } from "./motion";
import { useLeadModal } from "./LeadModal";

type NavItem = { label: string; to: string; isHash?: boolean };

const NAV_LINKS: NavItem[] = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Pricing", to: "/pricing" },
    { label: "Reviews", to: "/reviews" },
    { label: "Contact", to: "/contact" },
];

const desktopLinkCls = (active: boolean) =>
    `group relative font-body text-[16px] transition-colors duration-300 hover:text-brand-dark lg:text-[17px] 2xl:text-[19px] ${active ? "text-brand-dark" : "text-ink"
    }`;

function Underline({ active }: { active: boolean }) {
    return (
        <span
            className={`bg-brand-gradient absolute -bottom-1 left-0 h-[2px] transition-all duration-300 group-hover:w-full ${active ? "w-full" : "w-0"
                }`}
        />
    );
}

const listVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: -12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const LOGO_SRC = "/images/logo.png";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const [spacer, setSpacer] = useState(96);
    const { openLeadModal } = useLeadModal();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            if (!window.scrollY) setSpacer(el.offsetHeight);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const glass = scrolled || open;

    return (
        <>
            <div aria-hidden="true" style={{ height: spacer }} />
            <header
                ref={headerRef}
                id="site-header"
                className={`animate__animated animate__fadeInDown fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${glass
                    ? "border-b border-white/50 bg-white/55 shadow-[0_8px_30px_-12px_rgba(77,55,96,0.35)] backdrop-blur-xl backdrop-saturate-150"
                    : "border-b border-transparent bg-transparent"
                    }`}
            >
                <nav
                    className={`mx-auto flex w-full max-w-[1760px] items-center justify-between px-6 transition-[padding] duration-500 md:px-10 xl:px-16 2xl:px-24 ${scrolled ? "py-3 lg:py-3.5" : "py-5 lg:py-6"
                        }`}
                >
                    <Link to="/" aria-label="Spine Publishing home" className="shrink-0">
                        <img
                            src={LOGO_SRC}
                            alt="Spine Publishing Services"
                            className={`w-auto max-w-[220px] object-contain transition-[height] duration-500 sm:max-w-none ${scrolled ? "h-14 lg:h-16 2xl:h-[68px]" : "h-16 lg:h-[76px] 2xl:h-[84px]"
                                }`}
                        />
                    </Link>

                    <motion.ul
                        className="hidden items-center gap-8 md:flex lg:gap-10 xl:gap-14"
                        variants={listVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {NAV_LINKS.map((link) => (
                            <motion.li key={link.label} variants={itemVariants}>
                                {link.isHash ? (
                                    <Link to={link.to} className={desktopLinkCls(false)}>
                                        {link.label}
                                        <Underline active={false} />
                                    </Link>
                                ) : (
                                    <NavLink to={link.to} end className={({ isActive }) => desktopLinkCls(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                {link.label}
                                                <Underline active={isActive} />
                                            </>
                                        )}
                                    </NavLink>
                                )}
                            </motion.li>
                        ))}
                    </motion.ul>

                    <button
                        type="button"
                        onClick={openLeadModal}
                        className={`btn-glass relative overflow-hidden max-md:hidden ${scrolled ? "!text-white" : ""}`}
                        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease, color 0.5s ease" }}
                    >
                        <span
                            aria-hidden="true"
                            className={`absolute inset-0 rounded-[inherit] transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
                            style={{ background: "linear-gradient(180deg, #ad89e4 0%, #9a72da 100%)" }}
                        />
                        <span className="relative">Get Started</span>
                    </button>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="flex h-10 w-10 items-center justify-center text-brand-dark md:hidden"
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            {open ? (
                                <>
                                    <path d="M6 6l12 12" />
                                    <path d="M18 6L6 18" />
                                </>
                            ) : (
                                <>
                                    <path d="M4 7h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 17h16" />
                                </>
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden border-t border-brand-light/20 bg-white/80 backdrop-blur md:hidden"
                        >
                            <ul className="flex flex-col gap-1 px-6 md:px-10 xl:px-16 2xl:px-24 py-4">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.label}>
                                        {link.isHash ? (
                                            <Link
                                                to={link.to}
                                                onClick={() => setOpen(false)}
                                                className="block py-2 font-body text-[17px] text-ink hover:text-brand-dark"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <NavLink
                                                to={link.to}
                                                end
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) =>
                                                    `block py-2 font-body text-[17px] hover:text-brand-dark ${isActive ? "text-brand-dark" : "text-ink"}`
                                                }
                                            >
                                                {link.label}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                                <li className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpen(false);
                                            openLeadModal();
                                        }}
                                        className="btn-primary"
                                    >
                                        Get Started
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}