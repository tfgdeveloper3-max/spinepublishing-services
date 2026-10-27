import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "../motion";
import GlowBackdrop from "../GlowBackdrop";

type Category = "Editing" | "Cover Design" | "Publishing" | "Marketing";

export type Review = {
    name: string;
    role: string; 
    image: string; 
    rating: 1 | 2 | 3 | 4 | 5;
    title: string;
    text: string;
    category: Category;
    date: string; 
};

export const REVIEWS: Review[] = [
    {
        name: "Perin Rames",
        role: "Author of The Quiet Harbor",
        image: "/images/reviews/review1.png",
        rating: 5,
        title: "Turned my draft into a real book",
        text: "I came in with a rough manuscript and a lot of doubts. The editing team was thorough, kind, and fast. My book reads so much better now, and I still recognize my own voice in every chapter.",
        category: "Editing",
        date: "September 2026",
    },
    {
        name: "Daniel Brooks",
        role: "Fantasy Author",
        image: "/images/reviews/review2.png",
        rating: 5,
        title: "The cover is everything I imagined",
        text: "The designers understood my world better than I expected. Three concepts, quick revisions, and a final cover readers keep complimenting.",
        category: "Cover Design",
        date: "August 2026",
    },
    {
        name: "Sara Whitfield",
        role: "Children's Book Author",
        image: "/images/reviews/review3.png",
        rating: 5,
        title: "Guided through every single step",
        text: "Publishing felt overwhelming until I was assigned a project manager. She explained everything in plain language and kept the whole process on schedule.",
        category: "Publishing",
        date: "August 2026",
    },
    {
        name: "Michael Chen",
        role: "Business Coach & Author",
        image: "/images/reviews/review4.png",
        rating: 4,
        title: "Professional and well organized",
        text: "The dashboard made it easy to review edits and approve the layout. One round of formatting took a little longer than planned, but the team communicated clearly the whole time.",
        category: "Publishing",
        date: "July 2026",
    },
    {
        name: "Amelia Grant",
        role: "Memoir Writer",
        image: "/images/reviews/review5.png",
        rating: 5,
        title: "They treated my story with care",
        text: "Writing a memoir is personal. The editors polished my writing without changing what it meant, and they were sensitive about the hardest chapters.",
        category: "Editing",
        date: "July 2026",
    },
    {
        name: "Jorge Rivera",
        role: "Leadership Author",
        image: "/images/reviews/review6.png",
        rating: 5,
        title: "My book is now available worldwide",
        text: "From formatting to distribution, everything was handled for me. Seeing my book listed on multiple stores was an amazing moment.",
        category: "Publishing",
        date: "June 2026",
    },
    {
        name: "Hannah Lee",
        role: "Poet",
        image: "/images/reviews/review7.png",
        rating: 5,
        title: "Beautiful interior layout",
        text: "Poetry formatting is tricky, and they got every line break right. The print copy looks elegant.",
        category: "Cover Design",
        date: "June 2026",
    },
    {
        name: "Omar Siddiqui",
        role: "Thriller Author",
        image: "/images/reviews/review8.png",
        rating: 4,
        title: "Great launch support",
        text: "The social media launch kit and press release helped me reach readers I couldn't have reached alone. I'd love even more options for paid ads, but overall a strong campaign.",
        category: "Marketing",
        date: "May 2026",
    },
    {
        name: "Grace Thompson",
        role: "Romance Author",
        image: "/images/reviews/review9.png",
        rating: 5,
        title: "Second book with them, won't be the last",
        text: "I published my first novel here and came straight back for the second. Same great team, same smooth process, and an even better cover.",
        category: "Cover Design",
        date: "May 2026",
    },
    {
        name: "Liam O'Connor",
        role: "History Author",
        image: "/images/reviews/review10.png",
        rating: 5,
        title: "Meticulous fact-checking and editing",
        text: "My book has hundreds of dates and names. The copyeditor caught inconsistencies I had missed after years of research.",
        category: "Editing",
        date: "April 2026",
    },
    {
        name: "Priya Nair",
        role: "Self-Help Author",
        image: "/images/reviews/review11.png",
        rating: 5,
        title: "Marketing that actually felt personal",
        text: "They took the time to understand my audience before planning anything. The book trailer and author page made my launch feel professional.",
        category: "Marketing",
        date: "April 2026",
    },
    {
        name: "Ethan Walker",
        role: "Sci-Fi Author",
        image: "/images/reviews/review12.png",
        rating: 5,
        title: "Smooth from start to finish",
        text: "Clear pricing, quick replies, and a finished book I'm proud of. I recommend them to every writer friend I have.",
        category: "Publishing",
        date: "March 2026",
    },
];

const FILTERS: ("All" | Category)[] = ["All", "Editing", "Cover Design", "Publishing", "Marketing"];
const PAGE_SIZE = 6;

/* ---------- Stars ---------- */
function Stars({ value, size = 16 }: { value: number; size?: number }) {
    return (
        <div className="flex gap-0.5" role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
            {[0, 1, 2, 3, 4].map((i) => {
                const fill = Math.max(0, Math.min(1, value - i)) * 100;
                return (
                    <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
                        <svg viewBox="0 0 24 24" width={size} height={size} className="absolute inset-0 text-neutral-300" fill="currentColor" aria-hidden="true">
                            <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3l-6.1 3.4 1.5-6.7L2.3 9.4l6.8-.7L12 2.5z" />
                        </svg>
                        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
                            <svg viewBox="0 0 24 24" width={size} height={size} fill="url(#star-gradient)" aria-hidden="true">
                                <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3l-6.1 3.4 1.5-6.7L2.3 9.4l6.8-.7L12 2.5z" />
                            </svg>
                        </span>
                    </span>
                );
            })}
        </div>
    );
}

/* ---------- Count-up number ---------- */
function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
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
        const c = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: setDisplay });
        return () => c.stop();
    }, [inView, value, reduceMotion]);

    return <span ref={ref}>{display.toFixed(decimals)}</span>;
}

/* ---------- Summary card ---------- */
function Summary() {
    const { average, counts } = useMemo(() => {
        const counts = [5, 4, 3, 2, 1].map((star) => REVIEWS.filter((r) => r.rating === star).length);
        const average = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;
        return { average, counts };
    }, []);

    return (
        <motion.div
            className="relative grid gap-10 overflow-hidden rounded-2xl border border-white/70 bg-white/45 p-8 shadow-[0_18px_40px_-18px_rgba(77,55,96,0.45)] backdrop-blur-xl md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 lg:p-10 2xl:p-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
        >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />

            {/* Average */}
            <div className="relative text-center md:pr-12 md:text-left lg:border-r lg:border-brand-light/30">
                <p className="font-body text-[14px] text-neutral-600 2xl:text-[16px]">Average rating</p>
                <p className="text-brand-gradient mt-1 font-heading text-[72px] leading-none 2xl:text-[92px]">
                    <CountUp value={average} decimals={1} />
                </p>
                <div className="mt-3 flex justify-center md:justify-start">
                    <Stars value={average} size={22} />
                </div>
                <p className="mt-2 font-body text-[14px] text-neutral-600 2xl:text-[16px]">
                    Based on {REVIEWS.length} author reviews
                </p>
            </div>

            {/* Breakdown bars */}
            <ul className="relative space-y-2.5">
                {counts.map((count, i) => {
                    const star = 5 - i;
                    const pct = REVIEWS.length ? (count / REVIEWS.length) * 100 : 0;
                    return (
                        <li key={star} className="flex items-center gap-3 font-body text-[14px] text-neutral-700 2xl:text-[16px]">
                            <span className="w-10 shrink-0">{star} ★</span>
                            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/70 shadow-inner">
                                <motion.div
                                    className="bg-brand-gradient h-full rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${pct}%` }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: EASE }}
                                />
                            </div>
                            <span className="w-8 shrink-0 text-right">{count}</span>
                        </li>
                    );
                })}
            </ul>

            {/* Badges */}
            <div className="relative flex flex-row items-center justify-center gap-5 md:flex-col md:pl-4">
                <img src="/images/badges/trustpilot.png" alt="Trustpilot" className="h-[44px] w-auto object-contain 2xl:h-[52px]" />
                <img src="/images/badges/clutch.png" alt="Clutch" className="h-[48px] w-auto object-contain 2xl:h-[56px]" />
            </div>
        </motion.div>
    );
}

/* ---------- Review card ---------- */
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, delay: (i % PAGE_SIZE) * 0.07, ease: EASE },
    }),
};

function ReviewCard({ review, index }: { review: Review; index: number }) {
    return (
        <motion.article
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{ y: -6 }}
            className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/70 bg-white/45 p-6 shadow-[0_12px_32px_-16px_rgba(77,55,96,0.4)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(77,55,96,0.55)] lg:mb-8 2xl:p-8"
        >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
            {/* top accent line grows on hover */}
            <span className="bg-brand-gradient absolute left-0 top-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full" />

            <div className="relative">
                <div className="flex items-center justify-between gap-3">
                    <Stars value={review.rating} />
                    <span className="rounded-full border border-brand-light/40 bg-white/60 px-3 py-0.5 font-body text-[11px] text-brand-dark 2xl:text-[13px]">
                        {review.category}
                    </span>
                </div>

                <h3 className="mt-4 font-heading text-[20px] leading-snug text-[#2c2c2c] 2xl:text-[24px]">{review.title}</h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-neutral-600 2xl:text-[17px]">{review.text}</p>

                <div className="mt-6 flex items-center gap-3 border-t border-brand-light/20 pt-5">
                    <img src={review.image} alt="" className="h-11 w-11 shrink-0 rounded-full bg-neutral-200 object-cover 2xl:h-12 2xl:w-12" />
                    <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 font-body text-[15px] font-semibold text-black 2xl:text-[17px]">
                            {review.name}
                            <svg width="15" height="15" viewBox="0 0 24 24" className="shrink-0 text-brand-light" fill="currentColor" aria-label="Verified client">
                                <path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2L12 2zm-1.2 13.4l5.7-5.7-1.4-1.4-4.3 4.3-2.1-2.1-1.4 1.4 3.5 3.5z" />
                            </svg>
                        </p>
                        <p className="truncate font-body text-[13px] text-neutral-500 2xl:text-[15px]">{review.role}</p>
                    </div>
                    <span className="shrink-0 font-body text-[12px] text-neutral-400 2xl:text-[14px]">{review.date}</span>
                </div>
            </div>
        </motion.article>
    );
}

/* ---------- Section ---------- */
export default function ReviewsSection() {
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
    const [visible, setVisible] = useState(PAGE_SIZE);

    const filtered = useMemo(
        () => (filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.category === filter)),
        [filter]
    );
    const shown = filtered.slice(0, visible);

    const changeFilter = (f: (typeof FILTERS)[number]) => {
        setFilter(f);
        setVisible(PAGE_SIZE);
    };

    return (
        <section id="reviews" className="relative isolate overflow-hidden bg-[#fbf9fe] py-20 lg:py-28">
            {/* gradient used by the stars */}
            <svg width="0" height="0" className="absolute" aria-hidden="true">
                <defs>
                    <linearGradient id="star-gradient" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#c79be0" />
                        <stop offset="100%" stopColor="#7a4f99" />
                    </linearGradient>
                </defs>
            </svg>

            <GlowBackdrop />

            <div className="relative mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                <Summary />

                {/* Heading + filters */}
                <motion.div
                    className="mt-20 text-center lg:mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <p className="font-body text-[14px] text-ink 2xl:text-[16px]">Author Stories</p>
                    <h2 className="mt-1 font-heading text-[32px] leading-[1.15] text-[#3a3a3a] sm:text-[40px] xl:text-[48px] 2xl:text-[56px]">
                        Hear It From Our Authors
                    </h2>
                </motion.div>

                <div role="tablist" aria-label="Filter reviews by service" className="mt-8 flex flex-wrap justify-center gap-3">
                    {FILTERS.map((f) => {
                        const active = f === filter;
                        return (
                            <button
                                key={f}
                                role="tab"
                                aria-selected={active}
                                onClick={() => changeFilter(f)}
                                className={`relative rounded-full px-5 py-2 font-body text-[14px] transition-colors duration-300 2xl:px-6 2xl:text-[16px] ${active ? "text-white" : "border border-white/80 bg-white/50 text-ink backdrop-blur-md hover:bg-white/80"
                                    }`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="review-filter-pill"
                                        className="bg-brand-gradient absolute inset-0 rounded-full shadow-[0_6px_16px_-6px_rgba(77,55,96,0.7)]"
                                        transition={{ duration: 0.4, ease: EASE }}
                                    />
                                )}
                                <span className="relative">{f}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Masonry grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        className="mt-12 columns-1 gap-6 md:columns-2 lg:gap-8 xl:columns-3"
                        exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
                    >
                        {shown.map((r, i) => (
                            <ReviewCard key={r.name} review={r} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {visible < filtered.length && (
                    <div className="mt-4 flex justify-center">
                        <motion.button
                            type="button"
                            onClick={() => setVisible((v) => v + PAGE_SIZE)}
                            className="border border-brand-light bg-white/60 px-8 py-2.5 font-body text-[15px] font-semibold text-ink backdrop-blur-md transition-colors hover:bg-white 2xl:text-[17px]"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Load More Reviews
                        </motion.button>
                    </div>
                )}

                {/* CTA */}
                <motion.div
                    className="bg-brand-gradient relative mt-20 overflow-hidden rounded-2xl px-8 py-12 text-center shadow-[0_24px_50px_-24px_rgba(77,55,96,0.8)] lg:mt-24 lg:py-16"
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <motion.span
                        aria-hidden="true"
                        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <h2 className="relative font-heading text-[30px] leading-tight text-white sm:text-[38px] 2xl:text-[48px]">
                        Ready To Write Your Own Success Story?
                    </h2>
                    <p className="relative mx-auto mt-3 max-w-[560px] font-body text-[15px] text-white/85 2xl:text-[17px]">
                        Join the authors who trusted Spine Publishing to bring their books to readers around the world.
                    </p>
                    <div className="relative mt-7 flex flex-wrap justify-center gap-4">
                        <motion.a
                            href="#get-started"
                            className="bg-white px-8 py-2.5 font-body text-[15px] font-semibold text-brand-dark shadow-lg 2xl:text-[17px]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Get Started
                        </motion.a>
                        <motion.a
                            href="#quote"
                            className="border border-white/70 px-8 py-2.5 font-body text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 2xl:text-[17px]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Get a Free Quote
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}