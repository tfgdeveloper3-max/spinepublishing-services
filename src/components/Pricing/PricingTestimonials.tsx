import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion";
import { EASE } from "../motion";

type Testimonial = { name: string; role: string; image: string; text: string };

const TESTIMONIALS: Testimonial[] = [
    {
        name: "Gabriel Vance",
        role: "Starter Package",
        image: "/images/testimonials/Gabriel-Vance.png",
        text: "At just $199, the Starter package gave me everything I needed to get my book off the ground. SpinePublishing delivered incredible value with zero hidden fees.",
    },
    {
        name: "Chloe Davenport",
        role: "Starter Package",
        image: "/images/testimonials/Chloe-Davenport.png",
        text: "I was working on a tight budget for my debut novella. SpinePublishing's Starter tier was affordable, transparent, and packed with essential features like formatting and cover concepts.",
    },
    {
        name: "Nathan Brooks",
        role: "Starter Package",
        image: "/images/testimonials/Nathan-Brooks.png",
        text: "The 70% off discount on the Starter package made professional publishing accessible for me as a student writer. Absolutely worth every penny!",
    },
    {
        name: "Fiona Gallagher",
        role: "Starter Package",
        image: "/images/testimonials/Fiona-Gallagher.png",
        text: "Getting social media setups, custom design concepts, and file formatting for under $200 blew my mind. SpinePublishing's pricing is unbeatable.",
    },
    {
        name: "Lucas Moretti",
        role: "Professional Package",
        image: "/images/testimonials/Lucas-Moretti.png",
        text: "Choosing the Professional package was the best decision for my non-book project. The CMS support and multiple banner designs offered unmatched return on investment.",
    },
    {
        name: "Valerie Scott",
        role: "Professional Package",
        image: "/images/testimonials/Valerie-Scott.png",
        text: "I needed robust features without paying thousands to traditional gatekeepers. SpinePublishing's Professional tier hit the sweet spot of high quality and fair pricing.",
    }
];

const AUTOPLAY_MS = 6000;
const total = TESTIMONIALS.length;
const at = (i: number) => TESTIMONIALS[((i % total) + total) % total];

const slideVariants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -80, transition: { duration: 0.35, ease: EASE } }),
};

function QuoteMark() {
    return (
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" stroke="var(--color-brand-light)" strokeWidth="1.8" aria-hidden="true">
            <path d="M17 4C9 6 4 12 4 19.5A6.5 6.5 0 1 0 12 13.2c.6-3.4 2.8-6 5.6-7.4L17 4z" />
            <path d="M36 4c-8 2-13 8-13 15.5a6.5 6.5 0 1 0 8-6.3c.6-3.4 2.8-6 5.6-7.4L36 4z" />
        </svg>
    );
}

function Avatar({ src, size }: { src: string; size: string }) {
    return <img src={src} alt="" className={`${size} shrink-0 rounded-full bg-neutral-200 object-cover`} />;
}

function Card({ t }: { t: Testimonial }) {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.28)] sm:p-7 2xl:p-9">
            <div className="flex items-start gap-4">
                <Avatar src={t.image} size="h-12 w-12 2xl:h-14 2xl:w-14" />
                <div className="min-w-0 flex-1 pt-1">
                    <p className="font-body text-[15px] font-semibold text-black 2xl:text-[17px]">{t.name}</p>
                    <p className="font-body text-[11px] text-neutral-500 2xl:text-[13px]">{t.role}</p>
                </div>
                <QuoteMark />
            </div>
            <p className="mt-6 font-body text-[15px] leading-relaxed text-neutral-600 2xl:text-[17px]">{t.text}</p>
        </div>
    );
}

export default function PricingTestimonials() {
    const [[index, dir], setState] = useState<[number, number]>([0, 1]);
    const paused = useRef(false);

    const paginate = useCallback((step: number) => {
        setState(([i]) => [(i + step + total) % total, step]);
    }, []);

    useEffect(() => {
        const id = window.setInterval(() => {
            if (!paused.current) paginate(1);
        }, AUTOPLAY_MS);
        return () => window.clearInterval(id);
    }, [paginate]);

    const onDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -60) paginate(1);
        else if (info.offset.x > 60) paginate(-1);
    };

    const active = at(index);

    return (
        <section id="pricing-testimonials" className="bg-white py-20 lg:py-28">
            <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                {/* Header */}
                <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                    <motion.h2
                        className="font-heading text-[34px] leading-[1.15] text-[#3a3a3a] sm:text-[42px] xl:text-[48px] 2xl:text-[56px]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        Why Authors Trust SpinePublishing's
                        <br />
                        Value and Transparent Pricing
                    </motion.h2>
                    <motion.p
                        className="max-w-[560px] font-body text-[15px] leading-relaxed text-neutral-600 lg:justify-self-end lg:pt-2 2xl:text-[17px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    >
                        Read how our affordable, upfront pricing plans and value-packed publishing tiers helped authors realize their
                        dreams without breaking the bank.
                    </motion.p>
                </div>

                {/* Slider */}
                <div
                    className="mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-[minmax(220px,0.3fr)_1fr] lg:gap-10"
                    onMouseEnter={() => (paused.current = true)}
                    onMouseLeave={() => (paused.current = false)}
                >
                    {/* Left: active person + arrows */}
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`person-${index}`}
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.35, ease: EASE }}
                            >
                                <Avatar src={active.image} size="h-16 w-16 2xl:h-20 2xl:w-20" />
                                <div>
                                    <p className="font-body text-[15px] font-semibold text-black 2xl:text-[17px]">{active.name}</p>
                                    <p className="max-w-[140px] font-body text-[13px] leading-snug text-neutral-500 2xl:text-[15px]">
                                        {active.role}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-5 flex gap-5">
                            <motion.button
                                type="button"
                                aria-label="Previous testimonial"
                                onClick={() => paginate(-1)}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-light shadow-[0_6px_14px_-4px_rgba(0,0,0,0.3)] 2xl:h-12 2xl:w-12"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M19 12H5" />
                                    <path d="M11 6l-6 6 6 6" />
                                </svg>
                            </motion.button>
                            <motion.button
                                type="button"
                                aria-label="Next testimonial"
                                onClick={() => paginate(1)}
                                className="bg-brand-gradient flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_6px_14px_-4px_rgba(77,55,96,0.6)] 2xl:h-12 2xl:w-12"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14" />
                                    <path d="M13 6l6 6-6 6" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>

                    {/* Right: two cards (one on mobile), swipeable */}
                    <div className="-mx-2 overflow-hidden px-2 pb-10 pt-4">
                        <AnimatePresence mode="wait" custom={dir} initial={false}>
                            <motion.div
                                key={index}
                                custom={dir}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.25}
                                onDragEnd={onDragEnd}
                                className="grid cursor-grab gap-6 active:cursor-grabbing md:grid-cols-2 lg:gap-8"
                            >
                                <Card t={at(index)} />
                                <div className="hidden md:block">
                                    <Card t={at(index + 1)} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Dots */}
                <div className="mt-0 flex flex-wrap justify-center gap-2">
                    {TESTIMONIALS.map((t, i) => (
                        <button
                            key={t.name}
                            type="button"
                            aria-label={`Show testimonial ${i + 1}`}
                            onClick={() => setState(([cur]) => [i, i >= cur ? 1 : -1])}
                            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "bg-brand-gradient w-6" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}