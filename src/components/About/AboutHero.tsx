import { motion, type Variants } from "framer-motion";
import { EASE } from "../motion";

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

const titleVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};

const letterVariants: Variants = {
    hidden: { opacity: 0, y: "60%", rotateX: -70 },
    show: { opacity: 1, y: "0%", rotateX: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function PageHero({ title, description, showButtons = true, showBadges = true }: PageHeroProps) {
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
                    className="font-heading text-[52px] leading-[1.05] text-black [perspective:600px] sm:text-[44px] lg:text-[56px] 2xl:text-[76px]"
                    variants={titleVariants}
                    initial="hidden"
                    animate="show"
                    aria-label={title}
                >
                    {title.split("").map((char, i) => (
                        <motion.span
                            key={`${char}-${i}`}
                            variants={letterVariants}
                            className="inline-block origin-bottom"
                            aria-hidden="true"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
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
                        <motion.a
                            href="#get-started"
                            className="bg-brand-gradient inline-flex min-w-[127px] justify-center px-8 py-2.5 font-body text-[15px] text-white shadow-[0_6px_18px_-6px_rgba(77,55,96,0.6)] sm:text-[16px] 2xl:text-[18px]"
                            whileHover={{ scale: 1.04, boxShadow: "0 10px 24px -6px rgba(77,55,96,0.7)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get Started
                        </motion.a>
                        <motion.a
                            href="#quote"
                            className="inline-flex justify-center border border-brand-light bg-white px-4 py-2.5 font-body text-[15px] font-semibold text-ink transition-colors duration-300 hover:bg-brand-light/10 sm:text-[16px] 2xl:text-[18px]"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get a Free Quote
                        </motion.a>
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
        </section>
    );
}