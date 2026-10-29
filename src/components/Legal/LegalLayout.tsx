import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

/* =========================================================
   Layout for legal pages (Privacy Policy, Terms & Conditions).
   The page passes its sections; this adds the numbering,
   the "On this page" side menu and the styling.
   ========================================================= */

export type LegalSection = { title: string; content: ReactNode };

/* ---------- small building blocks used inside the page content ---------- */
export function P({ children }: { children: ReactNode }) {
    return <p className="my-4">{children}</p>;
}

export function Sub({ children }: { children: ReactNode }) {
    return <h3 className="mb-2 mt-7 font-body text-[18px] font-semibold text-[#2c2340]">{children}</h3>;
}

export function List({ items }: { items: ReactNode[] }) {
    return (
        <ul className="my-4 space-y-2 pl-1">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-light" aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function B({ children }: { children: ReactNode }) {
    return <strong className="font-semibold text-[#2c2340]">{children}</strong>;
}

/* ---------- layout ---------- */
export default function LegalLayout({
    intro,
    sections,
    otherDoc,
}: {
    intro?: ReactNode;
    sections: LegalSection[];
    otherDoc: { label: string; to: string };
}) {
    const ids = sections.map((_, i) => `section-${i + 1}`);

    // highlight the section currently on screen in the side menu
    const [activeId, setActiveId] = useState(ids[0]);
    useEffect(() => {
        const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: "-120px 0px -60% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sections.length]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const header = document.getElementById("site-header")?.offsetHeight ?? 0;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - header - 16, behavior: "smooth" });
    };

    return (
        <section className="bg-[#fbf9fe] py-14 lg:py-20">
            <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 md:px-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 xl:px-16">
                {/* Side menu */}
                <aside className="hidden lg:block">
                    <nav aria-label="On this page" className="sticky top-32">
                        <p className="mb-4 font-body text-[13px] font-semibold uppercase tracking-wider text-neutral-500">On this page</p>
                        <ol className="max-h-[calc(100vh-11rem)] space-y-1 overflow-y-auto border-l border-brand-light/30 pr-2">
                            {sections.map((s, i) => {
                                const active = ids[i] === activeId;
                                return (
                                    <li key={ids[i]}>
                                        <button
                                            type="button"
                                            onClick={() => scrollTo(ids[i])}
                                            className={`-ml-px block w-full border-l-2 py-1.5 pl-4 text-left font-body text-[14px] leading-snug transition-colors ${active
                                                    ? "border-brand-dark font-semibold text-brand-dark"
                                                    : "border-transparent text-neutral-600 hover:text-brand-dark"
                                                }`}
                                        >
                                            {i + 1}. {s.title}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                </aside>

                {/* Document */}
                <article className="rounded-2xl border border-white/80 bg-white px-6 py-10 shadow-[0_18px_40px_-24px_rgba(77,55,96,0.35)] sm:px-10 lg:px-14 lg:py-14">
                    <div className="max-w-[820px] font-body text-[16px] leading-[1.8] text-neutral-700 2xl:text-[17px]">
                        {intro && <div className="mb-10">{intro}</div>}

                        {sections.map((s, i) => (
                            <div key={ids[i]}>
                                <h2
                                    id={ids[i]}
                                    className="mb-4 mt-12 scroll-mt-32 font-heading text-[24px] leading-tight text-[#2c2c2c] sm:text-[28px]"
                                >
                                    <span className="text-brand-light">{i + 1}.</span> {s.title}
                                </h2>
                                {s.content}
                            </div>
                        ))}

                        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-brand-light/20 pt-8">
                            <p className="text-[15px] text-neutral-600">Also read our</p>
                            <Link to={otherDoc.to} className="btn-glass">
                                {otherDoc.label}
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}