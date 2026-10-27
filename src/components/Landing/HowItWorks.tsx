import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../motion";

type IconName = "upload" | "award" | "edit" | "chat" | "cover" | "layout" | "globe" | "chart";

const ICONS: Record<IconName, ReactNode> = {
    upload: (
        <>
            <path d="M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1 .5 8.97" />
            <path d="M12 12v8" />
            <path d="M9 15l3-3 3 3" />
        </>
    ),
    award: (
        <>
            <circle cx="12" cy="9" r="6" />
            <path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" />
        </>
    ),
    edit: (
        <>
            <path d="M4 20h4L19 9l-4-4L4 16v4z" />
            <path d="M13.5 6.5l4 4" />
        </>
    ),
    chat: <path d="M4 5h16v11H8l-4 4V5z" />,
    cover: (
        <>
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 8h6" />
            <path d="M9 12h4" />
        </>
    ),
    layout: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 9v11" />
        </>
    ),
    globe: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 0 18" />
            <path d="M12 3a14 14 0 0 0 0 18" />
        </>
    ),
    chart: (
        <>
            <path d="M5 20V11" />
            <path d="M11 20V5" />
            <path d="M17 20v-7" />
            <path d="M3 20h18" />
        </>
    ),
};

function Icon({ name }: { name: IconName }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0 text-brand-dark"
            aria-hidden="true"
        >
            {ICONS[name]}
        </svg>
    );
}

type Step = {
    title: string;
    heading: string;
    points: { icon: IconName; text: string }[];
    image: string;
};

const STEPS: Step[] = [
    {
        title: "Upload Your Manuscript",
        heading: "Feed Your Story to the World with a Single Click",
        points: [
            {
                icon: "upload",
                text: "Effortlessly drag and drop your draft into SpinePublishing's intuitive workspace while adding key details like your title, genre, and author name.",
            },
            { icon: "award", text: "Secure instant copyright protection for your intellectual property right from the start." },
        ],
        image: "/images/Tab1.jpg",
    },
    {
        title: "Edit & Perfect Your Book",
        heading: "Smart, AI-Driven Scans to Elevate Your Prose",
        points: [
            { icon: "edit", text: "SpinePublishing uses state-of-the-art technology to analyze your tone, target audience, and genre style, instantly catching grammar flaws and sharpening your narrative flow." },
            { icon: "chat", text: "Access elite professional human editors on demand whenever your manuscript calls for an extra tier of polish." },
        ],
        image: "/images/Tab2.jpg",
    },
    {
        title: "Design Your Cover & Layout",
        heading: "Breathtaking Visuals Crafted for Your Unique Style",
        points: [
            { icon: "cover", text: "Select from custom-built cover templates tailored to match your book's exact vibe, or upload your own vision using our seamless cover enhancement toolkit." },
            { icon: "layout", text: "Fine-tune your interior page layout in real time to match industry standards and genre expectations." },
        ],
        image: "/images/Tab3.jpg",
    },
    {
        title: "Publish & Distribute",
        heading: "Conquer Global Markets and Build Your Author Empire",
        points: [
            { icon: "globe", text: "Hit launch and let SpinePublishing syndicate your book across major worldwide retailers and libraries in multiple formats." },
            { icon: "chart", text: "Run automated multi-channel ad campaigns across social media platforms while tracking your sales and royalties from your personal author dashboard." },
        ],
        image: "/images/Tab4.jpg",
    },
];

const FALLBACK_IMAGE = STEPS[0].image;

const DRAG_CYCLE = 4.8;
const DRAG_TIMES = [0, 0.12, 0.5, 0.6, 0.78, 0.9, 1];

function DraggedPaper() {
    return (
        <>
            <motion.div
                className="pointer-events-none absolute left-[2%] top-[38%] h-[59%] w-[67%] rounded-lg bg-brand-light/15 ring-2 ring-brand-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
                transition={{ duration: DRAG_CYCLE, times: DRAG_TIMES, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="pointer-events-none absolute left-[35.5%] top-[84%] flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-dark px-3 py-1 font-body text-[11px] text-white shadow-lg sm:text-[13px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0, 0, 1, 1, 0, 0], scale: [0.8, 0.8, 0.8, 1, 1, 0.9, 0.8] }}
                transition={{ duration: DRAG_CYCLE, times: DRAG_TIMES, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                </svg>
                Manuscript uploaded
            </motion.div>

            <motion.img
                src="/images/file.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute left-[-7%] top-[38%] z-10 w-[30%] select-none drop-shadow-[0_18px_22px_rgba(30,20,50,0.18)]"
                initial={{ x: "-80%", y: "-40%", rotate: -14, opacity: 0, scale: 1.05 }}
                animate={{
                    x: ["-80%", "-55%", "0%", "0%", "0%", "0%", "-80%"],
                    y: ["-40%", "-30%", "0%", "0%", "0%", "0%", "-40%"],
                    rotate: [-14, -12, -4, 0, 0, 0, -14],
                    scale: [1.05, 1.05, 1.05, 0.94, 0.94, 0.85, 1.05],
                    opacity: [0, 1, 1, 1, 1, 0, 0],
                }}
                transition={{ duration: DRAG_CYCLE, times: DRAG_TIMES, repeat: Infinity, ease: "easeInOut" }}
            />
        </>
    );
}

export default function HowItWorks() {
    const [active, setActive] = useState(0);
    const step = STEPS[active];

    return (
        <section id="how-it-works" className="bg-[#f7f6f9] py-20 lg:py-28">
            <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <p className="font-body text-[14px] text-neutral-600 2xl:text-[16px]">How It Works</p>
                    <h2 className="mt-2 font-heading text-[32px] leading-[1.15] text-[#3a3a3a] sm:text-[40px] xl:text-[48px] 2xl:text-[54px]">
                        Launch Your Bestseller with SpinePublishing
                        <br />
                        in Four Seamless Steps
                    </h2>
                    <p className="mx-auto mt-4 max-w-[760px] font-body text-[15px] leading-relaxed text-neutral-600 2xl:text-[17px]">
                        From raw manuscript to global bookshelves, SpinePublishing streamlines editing, design, formatting,
                        and distribution in just a few short weeks.
                    </p>
                </motion.div>

                <motion.div
                    className="mt-8 bg-white px-5 py-6 shadow-[0_10px_40px_-20px_rgba(77,55,96,0.25)] sm:px-8 lg:mt-10 lg:px-10 lg:py-8 2xl:px-14 2xl:py-12"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, ease: EASE }}
                >
                    {/* Tabs */}
                    <div role="tablist" aria-label="Publishing steps" className="flex gap-6 overflow-x-auto pb-1 lg:justify-between lg:gap-4">
                        {STEPS.map((s, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={s.title}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActive(i)}
                                    className="relative shrink-0 pb-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light"
                                >
                                    <span className="block font-heading text-[15px] text-brand-light xl:text-[17px]">Step {i + 1}</span>
                                    <span
                                        className={`block font-heading text-[16px] transition-colors duration-300 xl:text-[18px] 2xl:text-[20px] ${isActive ? "text-[#2c2c2c]" : "text-neutral-500 hover:text-neutral-700"
                                            }`}
                                    >
                                        {s.title}
                                    </span>
                                    {isActive && (
                                        <motion.span
                                            layoutId="step-underline"
                                            className="bg-brand-gradient absolute bottom-0 left-0 h-[2px] w-full"
                                            transition={{ duration: 0.45, ease: EASE }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Panel */}
                    <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`text-${active}`}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.45, ease: EASE }}
                            >
                                <h3 className="max-w-[480px] font-heading text-[26px] leading-[1.25] text-[#333] sm:text-[30px] xl:text-[34px] 2xl:text-[40px]">
                                    {step.heading}
                                </h3>

                                <ul className="mt-5 space-y-5 border border-brand-light/70 px-4 py-4 2xl:px-6 2xl:py-6">
                                    {step.points.map((pt) => (
                                        <li key={pt.text} className="flex gap-3">
                                            <Icon name={pt.icon} />
                                            <span className="font-body text-[14px] leading-relaxed text-neutral-700 xl:text-[15px] 2xl:text-[17px]">
                                                {pt.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.a
                                    href="#get-started"
                                    className="bg-brand-gradient mt-8 inline-flex items-center gap-2 px-8 py-2.5 font-body text-[15px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(77,55,96,0.6)] 2xl:text-[17px]"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Get Started
                                    <span aria-hidden="true">&rsaquo;</span>
                                </motion.a>
                            </motion.div>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`img-${active}`}
                                className="relative lg:ml-[6%]"
                                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.5, ease: EASE }}
                            >
                                <img
                                    src={step.image}
                                    alt={`${step.title} screen in the SpinePublishing dashboard`}
                                    className="w-full rounded-xl border border-brand-light/30 shadow-[0_20px_40px_-20px_rgba(77,55,96,0.35)]"
                                    onError={(e) => {
                                        if (!e.currentTarget.src.endsWith(FALLBACK_IMAGE)) e.currentTarget.src = FALLBACK_IMAGE;
                                    }}
                                />
                                {active === 0 && <DraggedPaper />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}