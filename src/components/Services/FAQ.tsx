import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../motion";
import GlowBackdrop from "../GlowBackdrop";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
    {
        q: "What is included in SpinePublishing's precision editing service?",
        a: "Our professional editing service covers comprehensive developmental editing, detailed copyediting, and final proofreading to refine your narrative style, fix grammar, and polish your manuscript to perfection.",
    },
    {
        q: "How does SpinePublishing format my book for print and digital?",
        a: "We design clean, eye-catching interior layouts and custom typesetting that conform to strict industry standards, ensuring a seamless reading experience across all e-readers and physical formats.",
    },
    {
        q: "Can I get a custom cover design tailored to my book's genre?",
        a: "Yes! Our expert designers create high-impact, custom book covers using typography, imagery, and color palettes that perfectly match your story's theme and genre.",
    },
    {
        q: "Do you provide custom illustrations for children's books or ebooks?",
        a: "Absolutely. Our talented artists and illustrators craft imaginative artwork, infographics, and bespoke chapter illustrations tailored specifically to bring your visual concepts to life.",
    },
    {
        q: "How does SpinePublishing help market and promote my book?",
        a: "We help maximize your sales potential by setting up strategic promotional campaigns, coordinating media reviews, and connecting your book with renowned industry names.",
    },
    {
        q: "What makes your book printing and distribution services unique?",
        a: "We offer superior print-on-demand and custom printing options with luxury paper quality and durable binding, alongside global distribution across major retail platforms.",
    },
];

function FaqItem({ item, open, onToggle, index }: { item: Faq; open: boolean; onToggle: () => void; index: number }) {
    const id = useId();
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: EASE }}
            className={`relative overflow-hidden rounded-xl border backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${open
                ? "border-brand-light/50 bg-white/60 shadow-[0_18px_40px_-16px_rgba(77,55,96,0.45)]"
                : "border-white/60 bg-white/35 shadow-[0_8px_24px_-12px_rgba(77,55,96,0.3)] hover:bg-white/60"
                }`}
        >
            {/* glass shine */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
            {/* left accent when open */}
            <motion.span
                className="bg-brand-gradient absolute left-0 top-0 h-full w-[3px] origin-top"
                animate={{ scaleY: open ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
            />

            <h3 className="relative">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={id}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-light 2xl:px-8 2xl:py-6"
                >
                    <span className="font-heading text-[18px] leading-snug text-black sm:text-[20px] 2xl:text-[23px]">{item.q}</span>
                    <motion.span
                        className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center text-white shadow-[0_6px_14px_-6px_rgba(77,55,96,0.7)] 2xl:h-11 2xl:w-11"
                        animate={{ rotate: open ? 90 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        aria-hidden="true"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </motion.span>
                </button>
            </h3>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={id}
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="relative overflow-hidden"
                    >
                        <p className="px-6 pb-6 pr-20 font-body text-[15px] leading-relaxed text-neutral-600 2xl:px-8 2xl:pb-8 2xl:text-[17px]">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    const half = Math.ceil(FAQS.length / 2);
    const columns = [FAQS.slice(0, half), FAQS.slice(half)];

    return (
        <section id="faqs" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
            <GlowBackdrop />

            <div className="relative mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-16 2xl:px-24">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <p className="font-body text-[14px] text-ink 2xl:text-[16px]">FAQS</p>
                    <h2 className="mt-1 font-heading text-[34px] leading-[1.15] text-[#3a3a3a] sm:text-[42px] xl:text-[48px] 2xl:text-[56px]">
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-12 2xl:gap-16">
                    {columns.map((col, c) => (
                        <div key={c} className="flex flex-col gap-6 2xl:gap-8">
                            {col.map((item, i) => {
                                const index = c * half + i;
                                return (
                                    <FaqItem
                                        key={item.q}
                                        item={item}
                                        index={index}
                                        open={open === index}
                                        onToggle={() => setOpen(open === index ? null : index)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}