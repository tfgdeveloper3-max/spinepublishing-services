import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../components/motion";
import { readThankYouState, safeFromPath, type ThankYouState } from "@/lib/thankyou";
import Seo, { SEO } from "../components/Seo";


export default function ThankYou() {
    const location = useLocation();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    // router state first, sessionStorage as fallback (e.g. after a refresh)
    const data = useMemo<ThankYouState>(
        () => (location.state as ThankYouState | null) ?? readThankYouState() ?? {},
        [location.state]
    );
    const from = safeFromPath(data.from);
    const firstName = data.name?.trim().split(/\s+/)[0];

    useEffect(() => {
        window.scrollTo(0, 0);
        const prevTitle = document.title;
        document.title = "Thank You | Spine Publishing Services";
        return () => {
            document.title = prevTitle;
        };
    }, []);

    const goBack = () => {
        if (from) navigate(from);
        else if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    const rise = (delay: number) =>
        reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay, duration: 0.5, ease: EASE },
            };

    return (
        <>
            <Seo {...SEO.thankYou} />
            <main className="bg-hero relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
                <motion.section
                    aria-labelledby="thank-you-title"
                    className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-[0_30px_80px_-20px_rgba(42,31,54,0.45)] backdrop-blur-2xl 2xl:max-w-[700px]"
                    initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE }}
                >
                    {/* header */}
                    <div className="bg-brand-gradient relative flex flex-col items-center px-7 pb-9 pt-10 text-center text-white 2xl:px-10 2xl:pt-12">
                        <span
                            aria-hidden="true"
                            className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                        />

                        <motion.div
                            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-dark shadow-[0_12px_30px_-10px_rgba(42,31,54,0.6)] 2xl:h-24 2xl:w-24"
                            initial={reduceMotion ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.25 }}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <motion.path
                                    d="M5 12l5 5L20 7"
                                    initial={reduceMotion ? false : { pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.55 }}
                                />
                            </svg>
                        </motion.div>

                        <motion.h1
                            id="thank-you-title"
                            className="relative mt-6 font-heading text-[32px] leading-tight sm:text-[38px] 2xl:text-[46px]"
                            {...rise(0.45)}
                        >
                            {firstName ? `Thank you, ${firstName}!` : "Thank You!"}
                        </motion.h1>
                        <motion.p
                            className="relative mt-2 max-w-[420px] font-body text-[15px] text-white/85 2xl:text-[17px]"
                            {...rise(0.55)}
                        >
                            Your details have reached our publishing team.
                        </motion.p>
                    </div>

                    {/* body */}
                    <div className="flex flex-col items-center px-7 py-8 text-center 2xl:px-10 2xl:py-10">
                        <motion.p
                            className="max-w-[440px] font-body text-[16px] leading-relaxed text-neutral-700 2xl:text-[18px]"
                            {...rise(0.65)}
                        >
                            A publishing specialist will contact you within one business day
                            {data.email ? (
                                <>
                                    {" "}at <strong className="font-semibold text-ink">{data.email}</strong>.
                                </>
                            ) : (
                                "."
                            )}
                        </motion.p>

                        {data.plan && (
                            <motion.div
                                className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-light/40 bg-brand-light/10 px-4 py-1.5 font-body text-[14px] text-brand-dark 2xl:text-[16px]"
                                {...rise(0.7)}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12l5 5L20 7" />
                                </svg>
                                Selected plan: <strong className="font-semibold">{data.plan.name}</strong> (${data.plan.price})
                            </motion.div>
                        )}

                        <motion.div
                            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
                            {...rise(0.8)}
                        >
                            <button type="button" onClick={goBack} className="btn-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M19 12H5M11 18l-6-6 6-6" />
                                </svg>
                                Back to Previous Page
                            </button>
                            <Link to="/" className="btn-glass">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M3 11l9-7 9 7" />
                                    <path d="M5 10v10h14V10" />
                                </svg>
                                Back to Home
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>
            </main>
        </>
    );
}