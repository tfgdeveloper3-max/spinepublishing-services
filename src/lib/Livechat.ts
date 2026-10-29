export function openLiveChat(fallback?: () => void) {
    const w = window as any;
    if (w.LiveChatWidget?.call) {
        w.LiveChatWidget.call("maximize");
        return;
    }
    if (typeof w.Tawk_API?.maximize === "function") {
        w.Tawk_API.maximize();
        return;
    }
    fallback?.();
}