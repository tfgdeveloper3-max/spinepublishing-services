import { motion } from "framer-motion";
import { EASE } from "./motion";
import Marquee from "./Marque";

type Partner = { name: string; src: string; className: string };

const PARTNERS: Partner[] = [
    { name: "Amazon", src: "/images/brands/amazon.png", className: "h-[34px]" },
    { name: "IngramSpark", src: "/images/brands/ingramspark.png", className: "h-[32px]" },
    { name: "Barnes & Noble", src: "/images/brands/barnes-noble.png", className: "h-[26px]" },
    { name: "Kobo", src: "/images/brands/kobo.png", className: "h-[42px]" },
    { name: "Apple Books", src: "/images/brands/apple-books.png", className: "h-[40px]" },
];

const SPEED = 45;

export default function PartnersStrip() {
    return (
        <section aria-label="Publishing partners" className="bg-brand-gradient">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE }}
            >
                <Marquee
                    speed={SPEED}
                    direction={-1}
                    className="py-6 2xl:py-8"
                    itemsClassName="gap-16 pr-16 md:gap-24 md:pr-24 2xl:gap-32 2xl:pr-32"
                    style={{
                        maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                    }}
                >
                    {PARTNERS.map((partner) => (
                        <img
                            key={partner.name}
                            src={partner.src}
                            alt={partner.name}
                            draggable={false}
                            className={`${partner.className} w-auto shrink-0 select-none object-contain transition-transform duration-300 hover:scale-110`}
                        />
                    ))}
                </Marquee>
            </motion.div>
        </section>
    );
}