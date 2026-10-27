import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = window.setTimeout(() => {
                const target = document.getElementById(hash.slice(1));
                if (!target) return;
                const headerHeight = document.getElementById("site-header")?.offsetHeight ?? 0;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top, behavior: "smooth" });
            }, 80);
            return () => window.clearTimeout(id);
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }, [pathname, hash]);

    return null;
}