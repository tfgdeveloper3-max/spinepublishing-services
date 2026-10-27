import { motion } from "framer-motion";
import { EASE } from "./motion";

const AVATARS = [
    { src: "/images/authors/author1.png", left: "8%", top: "18%", size: 76 },
    { src: "/images/authors/author2.png", left: "14%", top: "40%", size: 66 },
    { src: "/images/authors/author3.png", left: "6.5%", top: "60%", size: 66 },
    { src: "/images/authors/author4.png", left: "13%", top: "80%", size: 66 },
    { src: "/images/authors/author5.png", left: "90%", top: "22%", size: 60 },
    { src: "/images/authors/author6.png", left: "82.5%", top: "41%", size: 66 },
    { src: "/images/authors/author7.png", left: "88.5%", top: "61%", size: 66 },
    { src: "/images/authors/author8.png", left: "85%", top: "80%", size: 52 },
];

const QUOTE_AUTHOR_IMAGE = "/images/authors/maya-angelou.png";

export default function DidYouKnow() {
    return (
        <section className="relative overflow-hidden bg-white py-24 lg:py-32 2xl:py-40">
            <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
                {AVATARS.map((a, i) => (
                    <motion.div
                        key={a.src}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: a.left, top: a.top }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: EASE }}
                    >
                        <motion.img
                            src={a.src}
                            alt=""
                            className="rounded-full object-cover shadow-[0_10px_25px_-10px_rgba(77,55,96,0.45)] ring-4 ring-white 2xl:scale-125"
                            style={{ width: a.size, height: a.size }}
                            animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
                            transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Card */}
            <motion.div
                className="relative z-10 mx-6 max-w-[640px] rounded-[22px] border border-neutral-200 bg-white px-6 py-12 text-center shadow-[0_24px_60px_-28px_rgba(77,55,96,0.35)] sm:mx-auto sm:px-12 2xl:max-w-[760px] 2xl:py-16"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE }}
            >
                <p className="font-body text-[15px] uppercase tracking-[0.12em] text-ink 2xl:text-[17px]">Did You Know</p>
                <h2 className="mt-1 font-heading text-[28px] leading-[1.2] text-[#333] sm:text-[32px] 2xl:text-[40px]">
                    9 Out of 10 Fully Written Books
                    <br className="hidden sm:block" /> Never See the Light of Day
                </h2>

                <p className="mx-auto mt-4 max-w-[480px] font-body text-[14px] leading-relaxed text-neutral-600 2xl:max-w-[560px] 2xl:text-[16px]">
                    Traditional publishing is bogged down by gatekeepers, endless delays, and complex barriers. That leaves
                    countless brilliant stories trapped in the dark.
                </p>

                <p className="mx-auto mt-4 max-w-[480px] font-body text-[15px] leading-relaxed text-[#4b5675] 2xl:max-w-[560px] 2xl:text-[17px]">
                    Built by writers for writers, Spine Publishing Services shatters those walls to{" "}
                    <strong className="font-bold text-ink">democratize publishing</strong> and give every author a voice.
                </p>

                <blockquote className="mx-auto mt-6 max-w-[420px] font-body text-[18px] leading-snug text-[#8a5aa8] 2xl:max-w-[500px] 2xl:text-[21px]">
                    "There is no greater agony than bearing an untold story inside you."
                </blockquote>

                <div className="mt-4 flex items-center justify-center gap-3">
                    <img src={QUOTE_AUTHOR_IMAGE} alt="" className="h-9 w-9 rounded-full object-cover grayscale" />
                    <span className="font-body text-[15px] text-ink 2xl:text-[17px]">Maya Angelou</span>
                </div>
            </motion.div>
        </section>
    );
}