import { useEffect, useState, type CSSProperties } from "react";
import { useLeadModal } from "../LeadModal";
import { openLiveChat } from "@/lib/Livechat";


const HERO_BG = "/images/HeroBG.png";
const LAPTOP_IMG = "/images/Hero-Laptop.png";

const BOOKS = [
    { src: "/images/Hero1.png", alt: "Published book cover 1", left: 0, top: 6, width: 14.1, rot: -14 },
    { src: "/images/Hero2.png", alt: "Published book cover 2", left: 16.4, top: 0, width: 12.4, rot: -8 },
    { src: "/images/Hero3.png", alt: "Published book cover 3", left: 71.1, top: 0, width: 12.6, rot: 8 },
    { src: "/images/Hero4.png", alt: "Published book cover 4", left: 86.4, top: 7, width: 13.6, rot: 14 },
];

const LAPTOP = { left: 30, top: 5, width: 40 };
const LAPTOP_IMG_RATIO = 290 / 521;
const SCREEN = { left: 11.3, right: 10.7, top: 5.9, bottom: 7 };
const STAGE_RATIO = 250 / 1027;
const BOOK_RATIO = 1.42;

const T_LAPTOP = 0.3;
const T_GLOW = 1.0;
const T_BOOKS = 1.2;
const BOOK_DURATION = 2.6;
const BOOK_STAGGER = 0.08;
const T_SCREEN_ON = 3.1;

function bookVars(): CSSProperties[] {
    const H = STAGE_RATIO;
    const lapW = LAPTOP.width / 100;
    const lapH = lapW * LAPTOP_IMG_RATIO;
    const scrL = LAPTOP.left / 100 + lapW * (SCREEN.left / 100);
    const scrW = lapW * (1 - (SCREEN.left + SCREEN.right) / 100);
    const scrT = (LAPTOP.top / 100) * H + lapH * (SCREEN.top / 100);
    const scrH = lapH * (1 - (SCREEN.top + SCREEN.bottom) / 100);
    const slotH = scrH * 0.42;

    return BOOKS.map((b, i) => {
        const w = b.width / 100;
        const h = w * BOOK_RATIO;
        const cx = b.left / 100 + w / 2;
        const cy = (b.top / 100) * H + h / 2;
        const slotCx = scrL + scrW * (0.215 + 0.19 * i);
        const slotCy = scrT + scrH * 0.55;
        const dx = slotCx - cx;
        const dy = slotCy - cy;
        const s0 = slotH / h;
        const pct = (v: number, size: number) => `${((v / size) * 100).toFixed(2)}%`;

        return {
            "--dx": pct(dx, w),
            "--dy": pct(dy, h),
            "--px": pct(dx * 0.8, w),
            "--py": pct(dy - scrH * 0.35, h),
            "--s0": s0.toFixed(4),
            "--s0a": (s0 * 0.7).toFixed(4),
            "--sp": (s0 * 1.7).toFixed(4),
            "--r": `${b.rot}deg`,
            animationDelay: `${T_BOOKS + i * BOOK_STAGGER}s`,
        } as CSSProperties;
    });
}
const BOOK_VARS = bookVars();

const HERO_CSS = `
@keyframes hero-in { from { opacity: 0; transform: translate3d(0, 24px, 0); } to { opacity: 1; transform: none; } }
@keyframes hero-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes hero-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hero-book {
  0%   { opacity: 0; transform: translate3d(var(--dx), var(--dy), 0) scale(var(--s0a)); animation-timing-function: ease-out; }
  15%  { opacity: 1; transform: translate3d(var(--dx), var(--dy), 0) scale(var(--s0)); animation-timing-function: linear; }
  42%  { opacity: 1; transform: translate3d(var(--dx), var(--dy), 0) scale(var(--s0)); animation-timing-function: cubic-bezier(0.34, 1.3, 0.64, 1); }
  60%  { opacity: 1; transform: translate3d(var(--px), var(--py), 0) scale(var(--sp)) rotate(var(--r)); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
}
.hero-in { opacity: 0; animation: hero-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
.hero-book { opacity: 0; transform-origin: center; backface-visibility: hidden; animation: hero-book ${BOOK_DURATION}s both; }
.hero-glow { opacity: 0; animation: hero-fade-in 0.5s ease-out ${T_GLOW}s both; }
.hero-screen { animation: hero-fade-out 0.8s ease-in-out ${T_SCREEN_ON}s both; }
.hero-shadow { opacity: 0; animation: hero-fade-in 0.6s ease-out both; }
/* wait until the images are loaded, so decoding never interrupts the animation */
.hero-stage:not(.is-ready) .hero-book,
.hero-stage:not(.is-ready) .hero-glow,
.hero-stage:not(.is-ready) .hero-screen,
.hero-stage:not(.is-ready) .hero-shadow,
.hero-stage:not(.is-ready) .hero-in { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .hero-in, .hero-book, .hero-glow, .hero-shadow { animation: none; opacity: 1; transform: none; }
  .hero-screen { animation: none; opacity: 0; }
}
`;

const displayFont: CSSProperties = { fontFamily: '"Lexend", var(--font-body)' };
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const shadowBg = "radial-gradient(50% 50% at 50% 50%, rgba(60,35,100,0.28) 0%, rgba(60,35,100,0) 100%)";

export default function Hero() {
    const { openLeadModal } = useLeadModal();

    const [ready, setReady] = useState(false);
    useEffect(() => {
        const srcs = [LAPTOP_IMG, ...BOOKS.map((b) => b.src)];
        let done = 0;
        let cancelled = false;
        const finish = () => !cancelled && setReady(true);
        srcs.forEach((src) => {
            const img = new Image();
            img.onload = img.onerror = () => {
                done += 1;
                if (done === srcs.length) finish();
            };
            img.src = src;
        });
        const fallback = window.setTimeout(finish, 2500);
        return () => {
            cancelled = true;
            window.clearTimeout(fallback);
        };
    }, []);

    return (
        <section id="home" className="relative isolate">
            <style>{HERO_CSS}</style>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 bottom-0 -z-10 bg-cover bg-top bg-no-repeat"
                style={{ backgroundImage: `url(${HERO_BG})`, backgroundColor: "#ece0fb" }}
            />

            <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-[2%] -z-10 h-[78%] w-full"
                viewBox="0 0 1440 700"
                preserveAspectRatio="none"
                fill="none"
            >
                <defs>
                    <linearGradient id="hero-ribbon" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#b88be8" />
                        <stop offset="50%" stopColor="#a374e0" />
                        <stop offset="100%" stopColor="#c39cf0" />
                    </linearGradient>
                </defs>
                <path
                    d="M-40 150 C 220 110, 330 420, 600 520 S 930 250, 1120 215 S 1380 200, 1480 225"
                    stroke="url(#hero-ribbon)"
                    strokeWidth="34"
                    strokeLinecap="round"
                    opacity="0.75"
                />
            </svg>

            <div className="mx-auto flex w-full max-w-[1760px] flex-col items-center px-6 pb-16 pt-6 text-center md:px-10 lg:pb-20 lg:pt-10 xl:px-16 2xl:px-24 2xl:pt-16">
                {/* Text */}
                <h1
                    className="hero-in max-w-[1000px] text-[28px] font-normal leading-[1.28] text-[#17122b] sm:text-[38px] lg:text-[46px] 2xl:max-w-[1200px] 2xl:text-[58px]"
                    style={{ ...displayFont, ...delay(0.05) }}
                >
                    Transform Your <strong className="font-bold">Manuscript</strong> into
                    <br className="hidden sm:block" /> a Masterpiece with <strong className="font-bold">Spine Publishing Services</strong>
                </h1>

                <p
                    className="hero-in mt-3 max-w-[680px] font-body text-[15px] leading-relaxed text-[#3d3654] sm:text-[17px] 2xl:max-w-[820px] 2xl:text-[20px]"
                    style={delay(0.15)}
                >
                    Professional editing, cover design, and global distribution that take your book from manuscript to bookshelf.
                </p>

                <div className="hero-in mt-6 flex flex-wrap items-center justify-center gap-4 2xl:mt-8" style={delay(0.25)}>
                    <button
                        type="button"
                        onClick={openLeadModal}
                        style={displayFont}
                        className="btn-primary"
                    >
                        Get Started
                    </button>
                    <button
                        type="button"
                        onClick={() => openLiveChat(openLeadModal)}
                        style={displayFont}
                        className="btn-glass max-md:hidden"
                    >
                        Get A Free Quote
                    </button>
                </div>

                <div
                    className={`hero-stage relative mt-10 aspect-[1027/250] w-full max-w-[1320px] lg:mt-12 2xl:max-w-[1500px] ${ready ? "is-ready" : ""
                        }`}
                >
                    <div
                        aria-hidden="true"
                        className="hero-shadow absolute bottom-[-6%] left-[28%] h-[14%] w-[44%]"
                        style={{ background: shadowBg, ...delay(T_LAPTOP + 0.5) }}
                    />
                    {BOOKS.map((b, i) => (
                        <div
                            key={`shadow-${b.src}`}
                            aria-hidden="true"
                            className="hero-shadow absolute h-[8%]"
                            style={{
                                left: `${b.left + b.width * 0.05}%`,
                                width: `${b.width * 0.9}%`,
                                top: `calc(${b.top}% + ${b.width * BOOK_RATIO * (1 / STAGE_RATIO)}% - 4%)`,
                                background: shadowBg,
                                ...delay(T_BOOKS + BOOK_DURATION + i * BOOK_STAGGER - 0.3),
                            }}
                        />
                    ))}

                    <div
                        className="hero-in absolute z-10"
                        style={{ left: `${LAPTOP.left}%`, top: `${LAPTOP.top}%`, width: `${LAPTOP.width}%`, ...delay(T_LAPTOP) }}
                    >
                        <img
                            src={LAPTOP_IMG}
                            alt="Spine Publishing author dashboard on a laptop"
                            className="block w-full"
                            fetchPriority="high"
                            decoding="async"
                            draggable={false}
                        />
                        <div
                            aria-hidden="true"
                            className="hero-screen absolute overflow-hidden rounded-[3px] bg-[#0f0c18]"
                            style={{
                                left: `${SCREEN.left}%`,
                                right: `${SCREEN.right}%`,
                                top: `${SCREEN.top}%`,
                                bottom: `${SCREEN.bottom}%`,
                            }}
                        >
                            <div
                                className="hero-glow absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(70% 80% at 50% 55%, rgba(190,150,245,0.95) 0%, rgba(120,80,190,0.85) 45%, rgba(40,25,70,1) 100%)",
                                }}
                            />
                        </div>
                    </div>

                    {BOOKS.map((b, i) => (
                        <img
                            key={b.src}
                            src={b.src}
                            alt={b.alt}
                            className="hero-book absolute z-20 block select-none"
                            style={{ left: `${b.left}%`, top: `${b.top}%`, width: `${b.width}%`, ...BOOK_VARS[i] }}
                            decoding="async"
                            draggable={false}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}