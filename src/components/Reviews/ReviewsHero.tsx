import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { EASE } from "../motion";
import { REVIEWS } from "./ReviewsSection";
import { useLeadModal } from "../LeadModal";
import { openLiveChat } from "@/lib/Livechat";

const RATING_BADGES = [
    { src: "/images/badges/trustpilot.png", alt: "Rated 4.9 out of 5 on Trustpilot", className: "h-[44px] 2xl:h-[52px]" },
    { src: "/images/badges/clutch.png", alt: "Rated 4.9 out of 5 on Clutch", className: "h-[48px] 2xl:h-[56px]" },
];

const RATING = 4.9;

const HERO_REVIEWS = REVIEWS.slice(0, 3);

const CARD_LAYOUT = [
    { className: "left-0 top-[4%] w-[78%] z-20", from: { x: 120, y: -40, rotate: 6 }, rest: -2, float: -10 },
    { className: "left-[14%] top-[38%] w-[74%] z-30", from: { x: -140, y: 40, rotate: -6 }, rest: 1, float: 12 },
    { className: "left-[6%] bottom-[2%] w-[70%] z-10", from: { x: 100, y: 120, rotate: 4 }, rest: -1, float: -8 },
];

function MiniStars({ size = 14 }: { size?: number }) {
    return (
        <div className="flex gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill="#a476bf">
                    <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3l-6.1 3.4 1.5-6.7L2.3 9.4l6.8-.7L12 2.5z" />
                </svg>
            ))}
        </div>
    );
}

function RatingNumber() {
    const reduceMotion = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (reduceMotion) {
            setValue(RATING);
            return;
        }
        const c = animate(0, RATING, { duration: 1.8, delay: 1.2, ease: EASE, onUpdate: setValue });
        return () => c.stop();
    }, [reduceMotion]);

    return <>{value.toFixed(1)}</>;
}

export default function ReviewsHero() {
    const { openLeadModal } = useLeadModal();
    return (
        <section className="relative">
            <div className="mx-auto grid w-full max-w-[1760px] items-center gap-14 px-6 pb-20 pt-8 md:px-10 lg:grid-cols-2 lg:gap-10 lg:pb-24 lg:pt-14 xl:px-16 2xl:px-24 2xl:pt-20">
                <div>
                    <span
                        className="animate__animated animate__fadeInLeft inline-block border border-brand-light/70 bg-white/40 px-3 py-1 font-body text-[15px] font-light text-neutral-800 sm:text-[18px] 2xl:text-[20px]"
                        style={{ animationDelay: "0.3s" }}
                    >
                        Professional Book Publishing Services Made Simple
                    </span>

                    <h1
                        className="animate__animated animate__fadeInUp mt-3 max-w-[560px] font-heading text-[30px] leading-[1.2] text-black sm:text-[38px] lg:text-[40px] xl:max-w-[700px] xl:text-[48px] 2xl:max-w-[780px] 2xl:text-[54px]"
                        style={{ animationDelay: "0.5s" }}
                    >
                        Transform Your Manuscript into an Industry-Leading Masterpiece with Spine Publishing Services
                    </h1>

                    <div
                        className="animate__animated animate__fadeInUp mt-6 flex flex-wrap items-center gap-4"
                        style={{ animationDelay: "0.7s" }}
                    >
                        <motion.button
                            type="button"
                            onClick={openLeadModal}
                            className="btn-primary"
                            whileHover={{ scale: 1.04, boxShadow: "0 10px 24px -6px rgba(77,55,96,0.7)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get Started
                        </motion.button>
                        <motion.button
                            onClick={() => openLiveChat(openLeadModal)}
                            className="btn-glass max-md:hidden"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get a Free Quote
                        </motion.button>
                    </div>

                    <div className="animate__animated animate__fadeInUp mt-6" style={{ animationDelay: "0.9s" }}>
                        <div className="flex items-center gap-4">
                            {RATING_BADGES.map((badge) => (
                                <img key={badge.src} src={badge.src} alt={badge.alt} className={`${badge.className} w-auto object-contain`} />
                            ))}
                        </div>
                        <p className="mt-3 max-w-[420px] font-body text-[14px] font-light text-neutral-700 sm:text-[15px] 2xl:text-[17px]">
                            Rated 4.9/5 stars on Trustpilot &amp; Clutch by published authors worldwide
                        </p>
                    </div>
                </div>

                {/* ---------- Right: floating glass review cards ---------- */}
                <div className="relative mx-auto aspect-[5/5.4] w-full max-w-[600px] sm:aspect-[5/4.4] lg:mr-0 xl:max-w-[720px]">
                    {/* soft glow */}
                    <div className="pointer-events-none absolute inset-[8%] rounded-full bg-brand-light/30 blur-3xl" aria-hidden="true" />

                    {HERO_REVIEWS.map((review, i) => {
                        const layout = CARD_LAYOUT[i];
                        return (
                            <motion.div
                                key={review.name}
                                className={`absolute ${layout.className}`}
                                initial={{ opacity: 0, ...layout.from }}
                                animate={{ opacity: 1, x: 0, y: 0, rotate: layout.rest }}
                                transition={{ duration: 1.1, delay: 0.5 + i * 0.25, ease: EASE }}
                            >
                                <motion.figure
                                    className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/50 p-5 shadow-[0_20px_45px_-20px_rgba(77,55,96,0.5)] backdrop-blur-xl 2xl:p-6"
                                    animate={{ y: [0, layout.float, 0] }}
                                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: 1.8 + i * 0.3 }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                                    <div className="relative flex items-center gap-3">
                                        <img src={review.image} alt="" className="h-10 w-10 shrink-0 rounded-full bg-neutral-200 object-cover 2xl:h-12 2xl:w-12" />
                                        <div className="min-w-0 flex-1">
                                            <figcaption className="truncate font-body text-[14px] font-semibold text-black 2xl:text-[16px]">
                                                {review.name}
                                            </figcaption>
                                            <p className="truncate font-body text-[12px] text-neutral-500 2xl:text-[14px]">{review.role}</p>
                                        </div>
                                        <MiniStars />
                                    </div>
                                    <blockquote className="relative mt-3 line-clamp-3 font-body text-[13px] leading-relaxed text-neutral-700 sm:text-[14px] 2xl:text-[16px]">
                                        "{review.text}"
                                    </blockquote>
                                </motion.figure>
                            </motion.div>
                        );
                    })}

                    {/* rating bubble */}
                    <motion.div
                        className="bg-brand-gradient absolute right-[4%] top-[-2%] z-40 flex h-28 w-28 flex-col items-center justify-center rounded-full text-white shadow-[0_18px_40px_-14px_rgba(77,55,96,0.8)] ring-4 ring-white/60 sm:h-32 sm:w-32 2xl:h-36 2xl:w-36"
                        initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 1.2 }}
                        aria-label="Average rating 4.9 out of 5"
                    >
                        <span className="font-heading text-[34px] leading-none sm:text-[40px] 2xl:text-[46px]">
                            <RatingNumber />
                        </span>
                        <span className="mt-1 font-body text-[11px] tracking-wide text-white/90 2xl:text-[13px]">out of 5</span>
                        <div className="mt-1">
                            <svg viewBox="0 0 120 24" width="64" height="13" fill="white" aria-hidden="true">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <path key={i} transform={`translate(${i * 24} 0)`} d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3l-6.1 3.4 1.5-6.7L2.3 9.4l6.8-.7L12 2.5z" />
                                ))}
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}