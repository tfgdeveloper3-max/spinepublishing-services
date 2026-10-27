import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

type MarqueeProps = {
    children: ReactNode;
    speed?: number;
    direction?: 1 | -1;
    pauseOnHover?: boolean;
    itemsClassName?: string;
    className?: string;
    style?: CSSProperties;
};

export default function Marquee({
    children,
    speed = 40,
    direction = -1,
    pauseOnHover = true,
    itemsClassName = "gap-16 pr-16",
    className = "",
    style,
}: MarqueeProps) {
    const x = useMotionValue(0);
    const setRef = useRef<HTMLDivElement>(null);
    const [setWidth, setSetWidth] = useState(0);
    const [copies, setCopies] = useState(2);
    const hovering = useRef(false);
    const speedFactor = useRef(1);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const el = setRef.current;
        if (!el) return;
        const measure = () => {
            const w = el.offsetWidth;
            if (!w) return;
            setSetWidth(w);
            setCopies(Math.max(2, Math.ceil(window.innerWidth / w) + 1));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    const wrap = (v: number) => (setWidth ? (((v % setWidth) + setWidth) % setWidth) - setWidth : v);

    useAnimationFrame((_, delta) => {
        if (!setWidth || reduceMotion) return;
        const target = pauseOnHover && hovering.current ? 0 : 1;
        speedFactor.current += (target - speedFactor.current) * 0.06; 
        const dt = Math.min(delta, 64) / 1000;
        x.set(wrap(x.get() + direction * speed * speedFactor.current * dt));
    });

    return (
        <div
            className={`overflow-hidden ${className}`}
            style={style}
            onMouseEnter={() => (hovering.current = true)}
            onMouseLeave={() => (hovering.current = false)}
        >
            <motion.div className="flex w-max" style={{ x }}>
                {Array.from({ length: copies }, (_, i) => (
                    <div
                        key={i}
                        ref={i === 0 ? setRef : undefined}
                        className={`flex shrink-0 items-center ${itemsClassName}`}
                        aria-hidden={i > 0}
                    >
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}