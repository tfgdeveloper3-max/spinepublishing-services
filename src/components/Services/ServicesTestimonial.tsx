import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion";
import { EASE } from "../motion";

type Testimonial = { name: string; role: string; image: string; text: string };

const TESTIMONIALS: Testimonial[] = [
    {
        name: "Jonathan Vance",
        role: "Precision Editing",
        image: "/images/testimonials/client1.png",
        text: "The editing team at SpinePublishing transformed my rough manuscript into a crisp, captivating story. Their line-by-line feedback eliminated errors while keeping my authentic author voice completely intact.",
    },
    {
        name: "Clara Sterling",
        role: "Precision Editing",
        image: "/images/testimonials/client2.png",
        text: "I was amazed by the depth of the developmental editing. SpinePublishing pinpointed plot holes I had overlooked for months and gave my narrative the exact flow it needed.",
    },
    {
        name: "Marcus Thorne",
        role: "Flawless Formatting",
        image: "/images/testimonials/client3.png",
        text: "Interior layout used to be my biggest headache, but SpinePublishing handled it effortlessly. Both my eBook and paperback look stunning with clean typography and flawless page breaks.",
    },
    {
        name: "Evelyn Reed",
        role: "Flawless Formatting",
        image: "/images/testimonials/client4.png",
        text: "The real-time formatting preview was incredible. SpinePublishing delivered an interior design that looks like it came straight out of a traditional publishing house.",
    },
    {
        name: "Julian Hayes",
        role: "High-Impact Cover Design",
        image: "/images/testimonials/client5.png",
        text: "My book cover stops scrollers in their tracks! SpinePublishing captured the exact mood and theme of my novel in a visually striking design that constantly gets compliments.",
    },
    {
        name: "Samantha Blake",
        role: "High-Impact Cover Design",
        image: "/images/testimonials/client6.png",
        text: "The cover design team took my vague ideas and turned them into a masterpiece. SpinePublishing created a cover that stands out among top bestsellers in my genre.",
    },
    {
        name: "David K. Miller",
        role: "Custom Illustrations",
        image: "/images/testimonials/client7.png",
        text: "The artwork for my children's book blew me away. SpinePublishing's artists created vibrant, expressive illustrations that brought my characters to life exactly as I imagined.",
    },
    {
        name: "Maya Lin",
        role: "Custom Illustrations",
        image: "/images/testimonials/client8.png",
        text: "From bespoke graphics to detailed chapter headers, SpinePublishing added incredible visual flair to my book. Readers frequently highlight how beautiful the illustrations are.",
    },
    {
        name: "Richard Morales",
        role: "Strategic Book Marketing",
        image: "/images/testimonials/client9.png",
        text: "SpinePublishing's marketing strategy gave my launch instant momentum. Their ad campaigns and reviewer outreach drove my book straight to the top of its target categories.",
    },
    {
        name: "Hannah Montgomery",
        role: "Strategic Book Marketing",
        image: "/images/testimonials/client10.png",
        text: "I had no idea how to market my book, but SpinePublishing made it simple. Their automated multi-channel campaigns brought steady sales and continuous reader engagement.",
    },
    {
        name: "Christopher Bell",
        role: "Premium Print Production",
        image: "/images/testimonials/client11.png",
        text: "Holding the physical copy of my book was an emotional moment. The print quality, paper feel, and binding durability from SpinePublishing far exceeded standard print-on-demand expectations.",
    },
    {
        name: "Beatrice Dupont",
        role: "Premium Print Production",
        image: "/images/testimonials/client12.png",
        text: "The crispness of the text and richness of the color prints are outstanding. SpinePublishing ensures every physical book delivered to readers feels luxurious and high-end.",
    },
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

export default function ServicesTestimonials() {
    const [[index, dir], setState] = useState<[number, number]>([0, 1]);
    const paused = useRef(false);

    const paginate = useCallback((step: number) => {
        setState(([i]) => [(i + step + total) % total, step]);
    }, []);

    // autoplay (pauses on hover)
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
        <section id="services-testimonials" className="bg-white py-20 lg:py-28">
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
                        Real Success Stories Across
                        <br />
                        Every Spine Publishing Service
                    </motion.h2>
                    <motion.p
                        className="max-w-[560px] font-body text-[15px] leading-relaxed text-neutral-600 lg:justify-self-end lg:pt-2 2xl:text-[17px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    >
                        See how SpinePublishing's dedicated services — from professional editing and custom artwork to global
                        marketing — help authors turn their manuscript dreams into polished bestsellers.
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
                <div className="mt-0 flex justify-center gap-2 flex-wrap">
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