const LEAD_API_URL = "https://crm.authorssale.com/api/lead/rEQUumIXV3LMOyeXEaE86EkeaO6gpl3U";

export type Lead = {
    name: string;
    email: string;
    phone_number: string;
    message: string;
};

export async function submitLead(lead: Lead): Promise<void> {
    const res = await fetch(LEAD_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lead),
    });

    if (!res.ok) {
        let detail = `${res.status}`;
        try {
            const data = await res.json();
            detail = data?.message ?? detail;
        } catch {
            
        }
        throw new Error(`Lead API error: ${detail}`);
    }
}

export function withHeading(heading: string, body: string): string {
    const text = body.trim();
    const divider = "-".repeat(heading.length);
    return `${heading}\n${divider}\n${text || "No additional message."}`;
}