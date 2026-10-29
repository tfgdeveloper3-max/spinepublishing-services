import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "../motion";
import { useLeadModal } from "../LeadModal";

const ABOUT_IMAGE = "/images/Author.jpg";

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
// left column: features 1 and 3, right column: features 2 and 4 (same as the design)
const LEFT = [FEATURES[0], FEATURES[2]];
const RIGHT = [FEATURES[1], FEATURES[3]];

const displayFont: CSSProperties = { fontFamily: '"Lexend", var(--font-body)' };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const column: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.35 } },
};
const fromSide = (dir: 1 | -1): Variants => ({
    hidden: { opacity: 0, x: 40 * dir },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
});

function Feature({ title, text, dir }: { title: string; text: string; dir: 1 | -1 }) {
    return (
        <motion.div variants={fromSide(dir)} className="max-w-[300px] 2xl:max-w-[360px]">
            <h3 style={displayFont} className="text-[17px] font-medium leading-snug text-[#17122b] sm:text-[18px] 2xl:text-[22px]">
                {title}
            </h3>
            <p className="mt-3 font-body text-[13px] leading-[1.75] text-neutral-500 sm:text-[14px] 2xl:text-[16px]">{text}</p>
        </motion.div>
    );
}

export default function AboutUs() {
    const { openLeadModal } = useLeadModal();

    return (
        <section id="about" className="overflow-hidden bg-white py-20 lg:py-28">
            {/* arch shape used to clip the image (top dome + gently curved bottom) */}
            <svg width="0" height="0" className="absolute" aria-hidden="true">
                <defs>
                    <clipPath id="aboutus-arch" clipPathUnits="objectBoundingBox">
                        <path d="M0,0.2 Q0.5,-0.2 1,0.2 L1,1 Q0.5,0.84 0,1 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                {/* ---------- Heading + intro ---------- */}
                <motion.div
                    className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.12 }}
                >
                    <motion.h2
                        variants={fadeUp}
                        style={displayFont}
                        className="max-w-[560px] text-[28px] font-normal leading-[1.3] text-[#17122b] sm:text-[34px] xl:text-[38px] 2xl:max-w-[680px] 2xl:text-[48px]"
                    >
                        <strong className="font-semibold">Driven by Passion,</strong> Built for Authors: Discover{" "}
                        <strong className="font-semibold">Spine Publishing Services</strong>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="max-w-[560px] font-body text-[15px] leading-[1.75] text-neutral-600 lg:justify-self-end lg:pt-2 2xl:max-w-[640px] 2xl:text-[18px]"
                    >
                        Spine Publishing Services was founded to bridge the gap between talented authors and the global literary
                        market. We combine innovative publishing technology with dedicated human expertise to remove every barrier
                        on your path to becoming a published author.
                    </motion.p>
                </motion.div>

                {/* ---------- Arc + image + features ---------- */}
                <div className="relative mt-14 lg:mt-16">
                    {/* dashed arc (draws once when it scrolls into view) */}
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[120px] w-full lg:block 2xl:h-[150px]"
                        viewBox="0 0 1000 120"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <motion.path
                            d="M0 100 Q500 -40 1000 100"
                            stroke="#9a9a9a"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            vectorEffect="non-scaling-stroke"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </svg>

                    <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-10 lg:pt-16 xl:gap-16 2xl:pt-20">
                        {/* left features */}
                        <motion.div
                            className="order-2 flex flex-col gap-10 sm:items-start lg:order-1 lg:gap-16"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={column}
                        >
                            {LEFT.map((f) => (
                                <Feature key={f.title} title={f.title} text={f.text} dir={-1} />
                            ))}
                        </motion.div>

                        {/* center: arched image + button */}
                        <div className="relative order-1 mx-auto w-full max-w-[360px] lg:order-2 lg:w-[30vw] lg:max-w-[440px] 2xl:max-w-[520px]">
                            <motion.div
                                className="aspect-[345/435] w-full"
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.9, ease: EASE }}
                            >
                                <img
                                    src={ABOUT_IMAGE}
                                    alt="Author holding her published book"
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                    style={{ clipPath: "url(#aboutus-arch)" }}
                                />
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                            >
                                <button type="button" onClick={openLeadModal} className="btn-primary">
                                    Get Started
                                </button>
                            </motion.div>
                        </div>

                        {/* right features */}
                        <motion.div
                            className="order-3 flex flex-col gap-10 lg:gap-16"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={column}
                        >
                            {RIGHT.map((f) => (
                                <Feature key={f.title} title={f.title} text={f.text} dir={1} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}