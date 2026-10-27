import { useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "../motion";
import GlowBackdrop from "../GlowBackdrop";


const svgProps = {
    width: 56,
    height: 56,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

const ICONS: Record<string, ReactNode> = {
    editing: (
        <svg {...svgProps}>
            <path d="M6 14v24c6-2 12-2 18 2 6-4 12-4 18-2V14" />
            <path d="M24 16v24" />
            <path d="M9 11v24c5-1.5 10-1 15 2" />
            <path d="M24 37c3-2.2 6.5-3 10-2.8" />
            <path d="M37 6l5 5-12 12-6 1 1-6L37 6z" />
        </svg>
    ),
    formatting: (
        <svg {...svgProps}>
            <path d="M10 30V10h10l4 4v16" />
            <path d="M24 14V8h10l4 4v18" />
            <path d="M14 15h6M14 19h6M28 13h6M28 17h6" />
            <rect x="6" y="30" width="36" height="10" rx="1.5" />
            <path d="M11 33v4h3M17 33v4M17 35h2.5M23 33v4h2l1-2-1-2h-2M30 33v4M30 33h3v2h-3" />
        </svg>
    ),
    cover: (
        <svg {...svgProps}>
            <rect x="12" y="6" width="24" height="34" rx="2" />
            <path d="M12 36h24" />
            <path d="M17 40v4l2.5-1.5L22 44v-4" />
            <path d="M24 13a5 5 0 0 1 3 9v2h-6v-2a5 5 0 0 1 3-9z" />
            <path d="M22 27h4" />
        </svg>
    ),
    illustrations: (
        <svg {...svgProps}>
            <path d="M6 16v24c6-2 12-2 18 2 6-4 12-4 18-2V16" />
            <path d="M24 18v24" />
            <path d="M10 13v24c5-1.5 10-1 14 2" />
            <path d="M30 22l10-12c1.5-1.8 4.3.3 3 2.3L35 25" />
            <path d="M30 22c-2 0-3.5 1.5-3.5 3.5 0 1.5-1 2.5-2.5 2.5 3 2 8 1.5 8.5-2.5" />
        </svg>
    ),
    marketing: (
        <svg {...svgProps}>
            <path d="M6 16v24c6-2 12-2 18 2 6-4 12-4 18-2V16" />
            <path d="M24 18v24" />
            <path d="M28 20l12-6v18l-12-6v-6z" />
            <path d="M28 20h-3v6h3" />
            <path d="M43 18l3-2M43 23h3M43 28l3 2" />
        </svg>
    ),
    printing: (
        <svg {...svgProps}>
            <path d="M14 18V6h15l5 5v7" />
            <rect x="6" y="18" width="36" height="16" rx="2" />
            <rect x="14" y="28" width="20" height="14" rx="1" />
            <path d="M18 32h12M18 36h12M18 39h8" />
            <circle cx="36" cy="23" r="1" fill="currentColor" />
        </svg>
    ),
};

/* ---------- Content ---------- */
const SERVICES = [
    {
        icon: "editing",
        title: "Precision Editing",
        text: "Comprehensive copyediting, developmental refining, and final proofreading to elevate your narrative tone and polish every sentence to perfection.",
    },
    {
        icon: "formatting",
        title: "Flawless Formatting",
        text: "Beautiful interior page layouts optimized across print and digital formats for a smooth, high-end reading experience that meets top industry standards.",
    },
    {
        icon: "cover",
        title: "High-Impact Cover Design",
        text: "Show-stopping cover visuals created by expert designers using striking typography and colors aligned with your book's unique genre and story.",
    },
    {
        icon: "illustrations",
        title: "Custom Illustrations",
        text: "Vibrant artwork, bespoke graphics, and engaging visual layouts crafted by elite artists to bring your pages and concepts to life.",
    },
    {
        icon: "marketing",
        title: "Strategic Book Marketing",
        text: "Maximize readership with targeted promotional campaigns, media exposure, and review placements designed to boost sales and credibility.",
    },
    {
        icon: "printing",
        title: "Premium Print Production",
        text: "Elite print-on-demand and custom publishing options delivering crisp typography, luxury paper quality, and durable binding for every copy.",
    },
];

const gridVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export default function ServicesGrid() {
    const [active, setActive] = useState(0);

    return (
        <section id="services" className="relative isolate overflow-hidden bg-[#fbf9fe] py-20 lg:py-28">
            <GlowBackdrop />

            <div className="relative mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <p className="font-body text-[14px] uppercase tracking-[0.12em] text-ink 2xl:text-[16px]">Did You Know</p>
                    <h2 className="mt-1 font-heading text-[34px] leading-[1.15] text-[#3a3a3a] sm:text-[42px] xl:text-[48px] 2xl:text-[56px]">
                        Transform Your Vision Into a Bestseller with Spine Publishing Services
                    </h2>
                </motion.div>

                <motion.div
                    className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8 2xl:gap-10"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    onMouseLeave={() => setActive(0)}
                >
                    {SERVICES.map((s, i) => {
                        const isActive = active === i;
                        return (
                            <motion.article
                                key={s.title}
                                variants={cardVariants}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                tabIndex={0}
                                whileHover={{ y: -6 }}
                                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/60 bg-white/30 px-7 py-9 text-center shadow-[0_8px_32px_-12px_rgba(77,55,96,0.25)] outline-none backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-brand-light 2xl:px-10 2xl:py-12"
                            >
                                {/* glass shine */}
                                <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />

                                {/* gradient fill that slides to the hovered card */}
                                {isActive && (
                                    <motion.span
                                        layoutId="service-active-bg"
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(120deg, rgba(164,118,191,0.92) 0%, rgba(77,55,96,0.94) 100%)",
                                        }}
                                        transition={{ duration: 0.5, ease: EASE }}
                                    />
                                )}

                                <div className="relative flex flex-col items-center">
                                    <motion.div
                                        className={`flex h-20 w-20 items-center justify-center rounded-2xl border transition-colors duration-500 ${isActive ? "border-white/30 bg-white/15 text-white" : "border-white/80 bg-white/50 text-[#4a4a4a]"
                                            }`}
                                        animate={isActive ? { rotate: [0, -6, 6, 0], scale: 1.05 } : { rotate: 0, scale: 1 }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                    >
                                        {ICONS[s.icon]}
                                    </motion.div>

                                    <h3
                                        className={`mt-5 font-heading text-[22px] transition-colors duration-500 2xl:text-[26px] ${isActive ? "text-white" : "text-[#222]"
                                            }`}
                                    >
                                        {s.title}
                                    </h3>
                                    <p
                                        className={`mt-3 max-w-[340px] font-body text-[15px] leading-relaxed transition-colors duration-500 2xl:text-[17px] ${isActive ? "text-white/90" : "text-neutral-600"
                                            }`}
                                    >
                                        {s.text}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}