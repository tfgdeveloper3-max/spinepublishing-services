import { motion } from "framer-motion";

export default function GlowBackdrop() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
            <motion.div
                className="absolute left-[-6%] top-[18%] h-[420px] w-[420px] rounded-full bg-brand-light/55 blur-[80px]"
                animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute right-[-4%] top-[8%] h-[380px] w-[380px] rounded-full bg-[#8ccbf0]/50 blur-[80px]"
                animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[38%] h-[460px] w-[460px] rounded-full bg-[#dca6f0]/55 blur-[90px]"
                animate={{ x: [0, 40, -30, 0], y: [0, -30, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute left-[30%] top-[30%] h-[260px] w-[260px] rounded-full bg-brand-dark/25 blur-[90px]"
                animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}