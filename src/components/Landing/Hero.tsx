import { motion } from "framer-motion";
import { EASE } from "../motion";
import bookImg from "/images/Book-Hero.png";
import laptopImg from "/images/Hero-Laptop.png";
import { useLeadModal } from "../LeadModal";

const RATING_BADGES = [
    { src: "/images/badges/trustpilot.png", alt: "Rated 4.9 out of 5 on Trustpilot", className: "h-[44px]" },
    { src: "/images/badges/clutch.png", alt: "Rated 4.9 out of 5 on Clutch", className: "h-[48px]" },
];

const LAPTOP_DELAY = 0.4;
const LAPTOP_DURATION = 0.9;
const BOOK_DELAY = LAPTOP_DELAY + LAPTOP_DURATION - 0.1;
const BOOK_DURATION = 1.3;

export default function Hero() {
    const { openLeadModal } = useLeadModal();
    return (
        <section id="home" className="relative">
            <div className="mx-auto grid w-full max-w-[1760px] items-center gap-12 px-6 md:px-10 xl:px-16 2xl:px-24 pb-20 pt-8 lg:grid-cols-2 lg:gap-10 lg:pb-24 lg:pt-14 2xl:pt-20">
                <div>
                    <span
                        className="animate__animated animate__fadeInLeft inline-block border border-brand-light/70 bg-white/40 px-3 py-1 font-body text-[15px] font-light text-neutral-800 sm:text-[18px] 2xl:text-[20px]"
                        style={{ animationDelay: "0.3s" }}
                    >
                        Professional Book Publishing Services Made Simple
                    </span>

                    <h1
                        className="animate__animated animate__fadeInUp mt-3 max-w-[560px] font-heading text-[30px] leading-[1.2] text-black sm:text-[38px] lg:text-[40px] xl:max-w-[680px] xl:text-[48px] 2xl:max-w-[760px] 2xl:text-[54px]"
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
                            className="bg-brand-gradient inline-flex min-w-[127px] justify-center px-7 py-2 font-body text-[15px] text-white shadow-[0_6px_18px_-6px_rgba(77,55,96,0.6)] sm:text-[16px]"
                            whileHover={{ scale: 1.04, boxShadow: "0 10px 24px -6px rgba(77,55,96,0.7)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get Started
                        </motion.button>

                        <motion.a
                            href="#quote"
                            className="inline-flex justify-center border border-brand-light bg-white px-4 py-2 font-body text-[15px] font-semibold text-ink transition-colors duration-300 hover:bg-brand-light/10 sm:text-[16px]"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get a Free Quote
                        </motion.a>
                    </div>

                    <div
                        className="animate__animated animate__fadeInUp mt-6"
                        style={{ animationDelay: "0.9s" }}
                    >
                        <div className="flex items-center gap-4">
                            {RATING_BADGES.map((badge) => (
                                <img
                                    key={badge.src}
                                    src={badge.src}
                                    alt={badge.alt}
                                    className={`${badge.className} w-auto object-contain`}
                                />
                            ))}
                        </div>
                        <p className="mt-3 max-w-[420px] font-body text-[14px] font-light text-neutral-700 sm:text-[15px] 2xl:text-[17px]">
                            Rated 4.9/5 stars on Trustpilot &amp; Clutch by published authors worldwide
                        </p>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-[640px] lg:mr-0 lg:max-w-none xl:max-w-[880px]">
                    <div className="pointer-events-none absolute inset-x-[-8%] bottom-[-6%] h-1/2 rounded-full bg-white/70 blur-3xl" />

                    <div className="relative aspect-[547/355] w-full">
                        <motion.img
                            src={laptopImg}
                            alt="Author dashboard shown on a laptop"
                            className="absolute bottom-[8%] left-0 z-10 w-[70%] drop-shadow-[0_25px_30px_rgba(77,55,96,0.25)]"
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: LAPTOP_DURATION, delay: LAPTOP_DELAY, ease: EASE }}
                        />
                        <motion.div
                            className="absolute right-0 top-0 z-0 w-[38%]"
                            initial={{ x: "-95%", y: "25%", scale: 0.7, rotate: -10, opacity: 0 }}
                            animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                            transition={{
                                delay: BOOK_DELAY,
                                duration: BOOK_DURATION,
                                ease: EASE,
                                opacity: { delay: BOOK_DELAY, duration: 0.3 },
                            }}
                        >
                            <motion.img
                                src={bookImg}
                                alt="Published book cover"
                                className="w-full drop-shadow-[0_20px_25px_rgba(30,20,50,0.35)]"
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    delay: BOOK_DELAY + BOOK_DURATION,
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}