import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE } from "../motion";

const PORTFOLIO_COUNT = 14;
const PORTFOLIO_EXT = "png"; 
const SPEED = 28; 

const ALL_BOOKS = Array.from(
    { length: PORTFOLIO_COUNT },
    (_, i) => `/portfolio/Portfolio${i + 1}.${PORTFOLIO_EXT}`
);
const HALF = Math.ceil(ALL_BOOKS.length / 2);
const ROW_ONE = ALL_BOOKS.slice(0, HALF);
const ROW_TWO = ALL_BOOKS.slice(HALF);

type RowProps = { images: string[]; direction: 1 | -1 };

function MarqueeRow({ images, direction }: RowProps) {
    const x = useMotionValue(0);
    const setRef = useRef<HTMLDivElement>(null);
    const [setWidth, setSetWidth] = useState(0);
    const reduceMotion = useReducedMotion();

    const hovering = useRef(false);
    const dragging = useRef(false);
    const speedFactor = useRef(1); 
    useEffect(() => {
        const el = setRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setSetWidth(el.offsetWidth));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const wrap = (v: number) => (setWidth ? (((v % setWidth) + setWidth) % setWidth) - setWidth : v);

    useAnimationFrame((_, delta) => {
        if (!setWidth || reduceMotion) return;
        const target = hovering.current || dragging.current ? 0 : 1;
        speedFactor.current += (target - speedFactor.current) * 0.06;
        const dt = Math.min(delta, 64) / 1000;
        x.set(wrap(x.get() + direction * SPEED * speedFactor.current * dt));
    });

    return (
        <div
            className="overflow-hidden"
            onMouseEnter={() => (hovering.current = true)}
            onMouseLeave={() => (hovering.current = false)}
        >
            <motion.div
                className="flex w-max cursor-grab active:cursor-grabbing"
                style={{ x, touchAction: "pan-y" }}
                onPanStart={() => (dragging.current = true)}
                onPan={(_, info) => x.set(wrap(x.get() + info.delta.x))}
                onPanEnd={() => (dragging.current = false)}
            >
                {[0, 1, 2].map((copy) => (
                    <div
                        key={copy}
                        ref={copy === 0 ? setRef : undefined}
                        className="flex shrink-0 gap-6 pr-6 lg:gap-10 lg:pr-10 2xl:gap-14 2xl:pr-14"
                        aria-hidden={copy > 0}
                    >
                        {images.map((src, i) => (
                            <img
                                key={`${copy}-${src}`}
                                src={src}
                                alt={copy === 0 ? `Published book cover ${i + 1}` : ""}
                                draggable={false}
                                className="w-[140px] shrink-0 select-none py-3 transition-transform duration-500 hover:-translate-y-2 sm:w-[170px] lg:w-[190px] xl:w-[210px] 2xl:w-[240px]"
                            />
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function Portfolio() {
    return (
        <section id="portfolio" className="overflow-hidden bg-white py-20 lg:py-28">
            <motion.h2
                className="px-6 text-center font-heading text-[32px] leading-[1.15] text-[#3a3a3a] sm:text-[40px] xl:text-[48px] 2xl:text-[54px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: EASE }}
            >
                Your Book
                <br />
                Deserves A Global Audience
            </motion.h2>

            <motion.div
                className="mt-10 space-y-4 lg:mt-14 lg:space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: EASE }}
            >
                <MarqueeRow images={ROW_ONE} direction={-1} />
                <MarqueeRow images={ROW_TWO} direction={1} />
            </motion.div>
        </section>
    );
}