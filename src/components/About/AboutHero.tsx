import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "../motion";
import { useLeadModal } from "../LeadModal";
import { openLiveChat } from "@/lib/Livechat";

type PageHeroProps = {
    title: string;
    description: string;
    showButtons?: boolean;
    showBadges?: boolean;
};

const RATING_BADGES = [
    { src: "/images/badges/trustpilot.png", alt: "Rated 4.9 out of 5 on Trustpilot", className: "h-[44px] 2xl:h-[52px]" },
    { src: "/images/badges/clutch.png", alt: "Rated 4.9 out of 5 on Clutch", className: "h-[48px] 2xl:h-[56px]" },
];

const letterVariants: Variants = {
    hidden: { opacity: 0, y: "60%", rotateX: -70 },
    show: { opacity: 1, y: "0%", rotateX: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function AboutHero({ title, description, showButtons = true, showBadges = true }: PageHeroProps) {
    // long titles: letters appear faster so the whole title finishes in about 1.2s
    const letterCount = title.replace(/\s/g, "").length;
    const titleVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: Math.min(0.04, 1.2 / letterCount), delayChildren: 0.2 } },
    };

    const { openLeadModal } = useLeadModal();
    // long titles get a smaller font size so they fit in 2-3 lines
    const isLong = title.length > 30;
    const titleSize = isLong
        ? "text-[30px] sm:text-[40px] lg:text-[52px] 2xl:text-[64px]"
        : "text-[48px] sm:text-[60px] lg:text-[72px] 2xl:text-[88px]";

    return (
        <section className="relative overflow-hidden">
            {/* slow drifting color blobs for depth */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#cfe9f7]/50 blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-brand-light/30 blur-3xl"
                animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative mx-auto flex w-full max-w-[1760px] flex-col items-center px-6 pb-20 pt-10 text-center md:px-10 lg:pb-24 lg:pt-16 xl:px-16 2xl:px-24 2xl:pb-32 2xl:pt-24">
                {/* Title: letters rise in one by one */}
                <motion.h1
                    className={`w-full max-w-[1500px] font-heading leading-[1.12] text-black [perspective:600px] ${titleSize}`}
                    variants={titleVariants}
                    initial="hidden"
                    animate="show"
                    aria-label={title}
                >
                    {title.split(" ").map((word, w, words) => (
                        <Fragment key={`${word}-${w}`}>
                            <span
                                className="inline-block whitespace-nowrap"
                                aria-hidden="true"
                            >
                                {word.split("").map((char, i) => (
                                    <motion.span
                                        key={`${char}-${i}`}
                                        variants={letterVariants}
                                        className="inline-block origin-bottom"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                            {w < words.length - 1 && " "}
                        </Fragment>
                    ))}
                </motion.h1>

                <p
                    className="animate__animated animate__fadeInUp mt-5 max-w-[760px] font-body text-[15px] leading-relaxed text-neutral-700 sm:text-[16px] 2xl:max-w-[900px] 2xl:text-[19px]"
                    style={{ animationDelay: "0.6s" }}
                >
                    {description}
                </p>

                {showButtons && (
                    <div
                        className="animate__animated animate__fadeInUp mt-6 flex flex-wrap items-center justify-center gap-4"
                        style={{ animationDelay: "0.8s" }}
                    >
                        <motion.button
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
                )}

                {showBadges && (
                    <div
                        className="animate__animated animate__fadeInUp mt-6 flex items-center justify-center gap-4"
                        style={{ animationDelay: "1s" }}
                    >
                        {RATING_BADGES.map((badge) => (
                            <img key={badge.src} src={badge.src} alt={badge.alt} className={`${badge.className} w-auto object-contain`} />
                        ))}
                    </div>
                )}
            </div>
        </section >
    );
}