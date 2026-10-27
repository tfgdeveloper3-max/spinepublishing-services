import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "../motion";
import GlowBackdrop from "../GlowBackdrop";

const iconProps = {
    width: 38,
    height: 38,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "#3a3a3a",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

const ICONS: Record<string, ReactNode> = {
    starter: (
        <svg {...iconProps}>
            <path d="M14 6h20a2 2 0 0 1 2 2v34H16a4 4 0 0 1-4-4V8a2 2 0 0 1 2-2z" />
            <path d="M12 38a4 4 0 0 1 4-4h20" />
            <path d="M19 14h11M19 19h8" />
        </svg>
    ),
    professional: (
        <svg {...iconProps}>
            <rect x="6" y="10" width="9" height="30" rx="1" />
            <rect x="15" y="6" width="9" height="34" rx="1" />
            <path d="M27 12.5l8.5-2.3 7.8 29-8.5 2.3z" />
            <path d="M9 16h3M18 12h3M9 34h3M18 34h3" />
            <path d="M4 40h40" />
        </svg>
    ),
    premium: (
        <svg {...iconProps}>
            <path d="M8 18l7 6 9-12 9 12 7-6-3 18H11L8 18z" />
            <path d="M11 40h26" />
            <circle cx="24" cy="12" r="1.5" />
            <circle cx="8" cy="18" r="1.5" />
            <circle cx="40" cy="18" r="1.5" />
        </svg>
    ),
};

/* ---------- Plans ---------- */
type Plan = {
    name: string;
    tagline: string;
    icon: keyof typeof ICONS;
    price: number;
    oldPrice: number;
    badge: string;
    accent: string; // dot + scrollbar colour
    band: string; // price band tint (semi-transparent for the glass look)
    features: string[];
};

const PLANS: Plan[] = [
    {
        name: "Starter",
        tagline: "Best Value for Money Guaranteed!",
        icon: "starter",
        price: 199,
        oldPrice: 298,
        badge: "70% Off",
        accent: "#1f9e86",
        band: "rgba(214, 238, 234, 0.75)",
        features: [
            "3-Service Core Publishing Suite",
            "3 Custom Cover & Interior Design Concepts",
            "5 Professional Stock Images",
            "1 Interactive eBook Slider Banner",
            "FREE Search Engine Friendly Metadata Setup",
            "Complete Industry-Standard Formatting",
            "48 to 72 Hours Turnaround Time",
            "Author Social Media Page Setup (Facebook)",
            "Author Social Media Page Setup (X / Twitter)",
        ],
    },
    {
        name: "Professional",
        tagline: "Best Value for Money Guaranteed!",
        icon: "professional",
        price: 349,
        oldPrice: 789,
        badge: "70% Off",
        accent: "#f0a030",
        band: "rgba(253, 239, 216, 0.8)",
        features: [
            "Comprehensive 5-Stage Publishing Service",
            "Dedicated CMS / Author Dashboard Support",
            "8 High-Resolution Stock Images",
            "3 Custom Promotional Banner Designs",
            "1 Interactive eBook Slider Banner",
            "FREE Search Engine Friendly Metadata Setup",
            "Complete Industry-Standard Formatting",
            "Fully Mobile-Responsive Author Platform",
            "48 to 72 Hours Turnaround Time",
        ],
    },
    {
        name: "Enterprise Author Package",
        tagline: "Best Value for Money Guaranteed!",
        icon: "premium",
        price: 449,
        oldPrice: 1698,
        badge: "70% Off",
        accent: "#d64b3f",
        band: "rgba(250, 228, 226, 0.8)",
        features: [
            "Complete 8-to-10 Chapter & Book Suite",
            "Conceptual and Dynamic Publishing Layout",
            "Online Royalty & Payment Integration",
            "Integrated Online Book Launch & Booking Tool",
            "Advanced Content Management System",
            "Fully Mobile-Responsive Author Platform",
            "Custom Submission & Inquiry Forms",
            "Advanced Reader Lead-Capturing Funnels",
            "Striking Visual & Typography Hover Effects",
        ],
    },
];

/* ---------- Price that counts up when it scrolls into view ---------- */
function CountUp({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.8 });
    const reduceMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (reduceMotion) {
            setDisplay(value);
            return;
        }
        const controls = animate(0, value, {
            duration: 1.4,
            ease: EASE,
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value, reduceMotion]);

    return <span ref={ref}>{display}</span>;
}

function FeatureList({ plan }: { plan: Plan }) {
    const listRef = useRef<HTMLUListElement>(null);
    const [thumb, setThumb] = useState({ size: 100, top: 0 });
    const [atEnd, setAtEnd] = useState(false);

    const update = () => {
        const el = listRef.current;
        if (!el) return;
        const size = Math.min(100, (el.clientHeight / el.scrollHeight) * 100);
        const maxScroll = el.scrollHeight - el.clientHeight;
        const top = maxScroll > 0 ? (el.scrollTop / maxScroll) * (100 - size) : 0;
        setThumb({ size, top });
        setAtEnd(el.scrollTop >= maxScroll - 4);
    };

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const scrollable = thumb.size < 100;

    return (
        <div className="relative">
            <ul
                ref={listRef}
                tabIndex={0}
                aria-label={`${plan.name} plan features`}
                onScroll={update}
                style={{ scrollbarWidth: "none" }}
                className="h-[190px] space-y-2.5 overflow-y-auto overscroll-contain py-1 pl-7 pr-10 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light [&::-webkit-scrollbar]:hidden 2xl:h-[230px]"
            >
                {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-[14px] leading-snug text-neutral-800 2xl:text-[16px]">
                        <span className="mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full" style={{ backgroundColor: plan.accent }} />
                        {f}
                    </li>
                ))}
            </ul>

            {/* custom scroll track + thumb */}
            {scrollable && (
                <div
                    className="pointer-events-none absolute bottom-1 right-5 top-1 w-[4px] rounded-full"
                    style={{ backgroundColor: `${plan.accent}26` }}
                    aria-hidden="true"
                >
                    <div
                        className="absolute left-0 w-full rounded-full transition-[top] duration-100"
                        style={{ backgroundColor: plan.accent, height: `${thumb.size}%`, top: `${thumb.top}%` }}
                    />
                </div>
            )}

            {/* fade hint that more items are below; disappears at the end of the list */}
            {scrollable && (
                <motion.div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/90 to-transparent"
                    animate={{ opacity: atEnd ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </div>
    );
}

/* ---------- Card ---------- */
const gridVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

function PlanCard({ plan }: { plan: Plan }) {
    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative flex flex-col overflow-hidden rounded-xl border border-white/70 bg-white/45 shadow-[0_18px_40px_-18px_rgba(77,55,96,0.45)] backdrop-blur-xl"
        >
            <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/25 to-transparent" />

            <div
                className="relative flex min-h-[112px] items-center gap-4 px-5 py-5 pr-16 2xl:min-h-[128px] 2xl:px-7 2xl:py-6"
                style={{ backgroundImage: "linear-gradient(90deg, rgba(164,118,191,0.95) 0%, rgba(77,55,96,0.95) 100%)" }}
            >
                <motion.div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md 2xl:h-[72px] 2xl:w-[72px]"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    {ICONS[plan.icon]}
                </motion.div>
                <div>
                    <h3 className="font-body text-[19px] font-bold leading-tight text-white 2xl:text-[22px]">{plan.name}</h3>
                    <p className="mt-1 font-body text-[12px] text-white/90 2xl:text-[14px]">{plan.tagline}</p>
                </div>

                {/* corner ribbon */}
                <div className="absolute right-[-42px] top-[16px] w-[150px] rotate-45 bg-black py-1 text-center font-body text-[13px] font-bold text-white shadow-md">
                    {plan.badge}
                </div>
            </div>

            {/* Price band */}
            <div className="flex justify-center px-6 py-7 backdrop-blur-md 2xl:py-9" style={{ backgroundColor: plan.band }}>
                <div className="flex items-start gap-2">
                    <span className="mt-1.5 font-body text-[20px] font-bold text-black">$</span>
                    <span className="font-body text-[46px] font-bold leading-none text-black 2xl:text-[54px]">
                        <CountUp value={plan.price} />
                    </span>
                    <span className="flex flex-col pt-1">
                        <span className="font-body text-[16px] font-bold text-red-600 line-through decoration-2">${plan.oldPrice.toLocaleString()}</span>
                        <span className="font-body text-[11px] font-semibold text-neutral-500">Only</span>
                    </span>
                </div>
            </div>

            <div className="border-t border-white/60 pt-5">
                <FeatureList plan={plan} />
            </div>

            <div className="flex justify-center px-6 pb-7 pt-6">
                <motion.a
                    href="#get-started"
                    className="bg-brand-gradient inline-flex min-w-[140px] justify-center px-8 py-2.5 font-body text-[15px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(77,55,96,0.6)] 2xl:text-[17px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                >
                    Get Started
                </motion.a>
            </div>
        </motion.article>
    );
}

export default function PricingPlans() {
    return (
        <section id="pricing" className="relative isolate overflow-hidden bg-[#fbf9fe] py-20 lg:py-28">
            <GlowBackdrop />

            <div className="relative mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <p className="font-body text-[14px] text-ink 2xl:text-[16px]">Pricing &amp; Packages</p>
                    <h2 className="mt-1 font-heading text-[32px] leading-[1.15] text-[#3a3a3a] sm:text-[40px] xl:text-[48px] 2xl:text-[56px]">
                        Choose the Plan Built For Your Author Goals
                    </h2>
                </motion.div>

                <motion.div
                    className="mx-auto mt-12 grid max-w-[1500px] gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 2xl:gap-10"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {PLANS.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}