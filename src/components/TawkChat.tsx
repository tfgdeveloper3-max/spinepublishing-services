import { useEffect } from "react";

declare global {
    interface Window {
        Tawk_API: any;
        Tawk_LoadStart: any;
        __lc: any;
        LiveChatWidget: any;
        LC_API: any;
    }
}

const AUTO_OPEN_ON_LOAD = true;

const TAWK_SRC = "https://embed.tawk.to/6ae28094a6f08d347cd1e2f7/1k62cch9g";

const LOAD_DELAY_MS = 4000;

export default function LiveChat() {
    useEffect(() => {
        if (document.getElementById("tawk-script")) return;

        let loaded = false;
        const queue: Array<() => void> = [];
        const run = (fn: () => void) => (loaded ? fn() : queue.push(fn));

        window.Tawk_API = window.Tawk_API || {};
        const Tawk = window.Tawk_API;

        Tawk.customStyle = {
            zIndex: 998,
            visibility: {
                desktop: { position: "br", xOffset: 20, yOffset: 20 },
                mobile: { position: "br", xOffset: 20, yOffset: 20 },
            },
        };

        Tawk.onLoad = () => {
            loaded = true;
            queue.splice(0).forEach((fn) => fn());
            if (AUTO_OPEN_ON_LOAD) Tawk.maximize();
        };

        Tawk.onChatMessageAgent = () => Tawk.maximize();

        const callMap: Record<string, (...args: any[]) => void> = {
            maximize: () => Tawk.maximize(),
            open: () => Tawk.maximize(),
            minimize: () => Tawk.minimize(),
            hide: () => Tawk.hideWidget(),
            show: () => Tawk.showWidget(),
            set_customer_name: (name: string) => Tawk.setAttributes({ name }, () => { }),
            set_customer_email: (email: string) => Tawk.setAttributes({ email }, () => { }),
        };

        window.LiveChatWidget = {
            call: (method: string, ...args: any[]) => {
                const fn = callMap[method];
                if (fn) {
                    run(() => fn(...args));
                    loadScript(); 
                }
            },
            on: (event: string, cb: () => void) => {
                if (event === "ready") run(cb);
            },
            off: () => { },
            get: () => null,
        };

        window.LC_API = {
            open_chat_window: () => {
                run(() => Tawk.maximize());
                loadScript();
            },
            minimize_chat_window: () => run(() => Tawk.minimize()),
            hide_chat_window: () => run(() => Tawk.hideWidget()),
            chat_window_maximized: () => (loaded ? Tawk.isChatMaximized() : false),
        };

        const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
        let timer = 0;

        function cleanupTriggers() {
            window.clearTimeout(timer);
            events.forEach((e) => window.removeEventListener(e, loadScript));
        }

        function loadScript() {
            cleanupTriggers();
            if (document.getElementById("tawk-script")) return;
            window.Tawk_LoadStart = new Date();
            const s = document.createElement("script");
            s.id = "tawk-script";
            s.async = true;
            s.src = TAWK_SRC;
            s.charset = "UTF-8";
            s.setAttribute("crossorigin", "*");
            document.body.appendChild(s);
        }

        timer = window.setTimeout(loadScript, LOAD_DELAY_MS);
        events.forEach((e) => window.addEventListener(e, loadScript, { once: true, passive: true }));

        return cleanupTriggers;
    }, []);

    return null;
}