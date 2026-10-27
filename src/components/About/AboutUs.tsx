import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { EASE } from "../motion";

const ABOUT_IMAGE = "/images/Author.png";

const FEATURES = [
    {
        title: "Uncompromising Production Standards",
        text: "We uphold elite publishing standards, delivering pristine interior layouts and captivating book covers that command attention.",
    },
    {
        title: "Dedicated Author Partnership",
        text: "You are never just a manuscript number to us. Your dedicated manager guides you through every decision with expert care.",
    },
    {
        title: "Complete Creative Ownership",
        text: "We champion your vision. Retain total artistic control and 100% rights while relying on our end-to-end platform.",
    },
    {
        title: "Global Reach & Impact",
        text: "We ensure your story breaks boundaries. Publish seamlessly across print, digital, and audio channels worldwide.",
    },
];

export default function AboutUs() {
    const listRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.55"] });
    const handleTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const [active, setActive] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        setActive(Math.min(FEATURES.length - 1, Math.max(0, Math.floor(p * FEATURES.length))));
    });

    return (
        <section id="about" className="bg-white py-20 lg:py-28">
            <div className="mx-auto grid w-full max-w-[1760px] gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-8 xl:px-16 2xl:px-24">
                {/* Heading */}
                <motion.h2
                    className="max-w-[600px] font-heading text-[34px] leading-[1.15] text-[#3a3a3a] sm:text-[42px] xl:text-[50px] 2xl:text-[56px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    Driven by Passion, Built for Authors: Discover Spine Publishing Services
                </motion.h2>

                {/* Intro */}
                <motion.p
                    className="max-w-[600px] self-center font-body text-[15px] leading-relaxed text-neutral-600 2xl:text-[17px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                >
                    Spine Publishing Services was founded to bridge the gap between talented authors and the global literary
                    market. We combine innovative publishing technology with dedicated human expertise to remove every barrier
                    on your path to becoming a published author.
                </motion.p>

                {/* Image (reveals top to bottom) */}
                <motion.div
                    className="w-full max-w-[680px]"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div
                        variants={{
                            hidden: { clipPath: "inset(0% 0% 100% 0%)" },
                            show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE } },
                        }}
                    >
                        <img src={ABOUT_IMAGE} alt="Author holding her published book" className="aspect-[366/378] w-full object-cover" />
                    </motion.div>
                </motion.div>

                {/* Features with scroll progress line */}
                <div className="flex flex-col">
                    <div ref={listRef} className="relative space-y-10 pl-10 lg:pl-14 2xl:space-y-14">
                        {/* track */}
                        <span className="absolute left-0 top-0 h-full w-px bg-neutral-300" />
                        {/* filled part */}
                        <motion.span
                            className="absolute left-[-0.5px] top-0 h-full w-[2px] origin-top"
                            style={{
                                scaleY: scrollYProgress,
                                backgroundImage: "linear-gradient(180deg, var(--color-brand-light), var(--color-brand-dark))",
                            }}
                        />
                        {/* handle */}
                        <motion.span
                            className="absolute left-0 flex h-7 w-4 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm"
                            style={{ top: handleTop }}
                            aria-hidden="true"
                        >
                            <svg width="8" height="16" viewBox="0 0 8 16" fill="none" stroke="#777" strokeWidth="1.2" strokeLinecap="round">
                                <path d="M1.5 5.5L4 3l2.5 2.5" />
                                <path d="M1.5 10.5L4 13l2.5-2.5" />
                            </svg>
                        </motion.span>

                        {FEATURES.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 0.7, ease: EASE }}
                            >
                                <h3
                                    className={`font-heading text-[20px] transition-colors duration-500 xl:text-[22px] 2xl:text-[26px] ${active === i ? "text-brand-dark" : "text-[#333]"
                                        }`}
                                >
                                    {f.title}
                                </h3>
                                <p className="mt-2 max-w-[640px] font-body text-[15px] leading-relaxed text-neutral-600 2xl:text-[17px]">
                                    {f.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a
                        href="#get-started"
                        className="bg-brand-gradient mt-8 inline-flex self-start px-8 py-2.5 font-body text-[15px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(77,55,96,0.6)] lg:ml-14 2xl:text-[17px]"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Get Started
                    </motion.a>
                </div>
            </div>
        </section>
    );
}