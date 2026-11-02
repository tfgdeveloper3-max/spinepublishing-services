import type { SelectedPlan } from "../components/LeadModal";

export const THANK_YOU_PATH = "/thank-you";

export type ThankYouState = {
    from?: string;
    name?: string;
    email?: string;
    plan?: SelectedPlan | null;
};

const STORAGE_KEY = "spine:thank-you";

export function saveThankYouState(state: ThankYouState) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
       
    }
}

export function readThankYouState(): ThankYouState | null {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ThankYouState) : null;
    } catch {
        return null;
    }
}

export function safeFromPath(from?: string): string | null {
    if (!from || !from.startsWith("/") || from.startsWith("//")) return null;
    if (from.split(/[?#]/)[0] === THANK_YOU_PATH) return null;
    return from;
}