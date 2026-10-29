import { useEffect } from "react";

export const SITE_URL = "https://spinepublishingservices.com"; 
export const SITE_NAME = "Spine Publishing Services";
const DEFAULT_IMAGE = "/images/og-image.jpg"; 

type SeoProps = {
    title: string;
    description: string;
    path: string; 
    image?: string;
    noindex?: boolean;
};

export const SEO = {
    home: {
        title: "Spine Publishing Services | Professional Book Publishing for Authors",
        description:
            "Turn your manuscript into a professionally published book. Editing, cover design, formatting, and worldwide distribution with a dedicated project manager.",
        path: "/",
    },
    about: {
        title: "About Us | Spine Publishing Services",
        description:
            "Learn how Spine Publishing Services helps authors publish with confidence, combining expert editors and designers with a simple, author-first process.",
        path: "/about",
    },
    services: {
        title: "Book Publishing Services | Editing, Cover Design & More",
        description:
            "Editing, formatting, cover design, illustrations, marketing, and book printing. Everything you need to publish a professional book in one place.",
        path: "/services",
    },
    pricing: {
        title: "Pricing & Packages | Spine Publishing Services",
        description:
            "Compare our Starter, Professional, and Enterprise publishing packages and choose the plan that fits your book and your budget.",
        path: "/pricing",
    },
    reviews: {
        title: "Author Reviews | Spine Publishing Services",
        description:
            "Read what authors say about publishing with Spine Publishing Services, from editing and cover design to global distribution.",
        path: "/reviews",
    },
    contact: {
        title: "Contact Us | Spine Publishing Services",
        description:
            "Have a question about publishing your book? Call, email, or send us a message and a publishing specialist will reply within one business day.",
        path: "/contact",
    },
    privacy: {
        title: "Privacy Policy | Spine Publishing Services",
        description:
            "How Spine Publishing Services collects, uses, protects, and shares your personal information and manuscripts, and the privacy choices available to you.",
        path: "/privacy",
    },
    terms: {
        title: "Terms & Conditions | Spine Publishing Services",
        description:
            "The terms that apply when you use the Spine Publishing Services website and purchase our editing, design, publishing, and marketing services.",
        path: "/terms",
    },
    notFound: {
        title: "Page Not Found | Spine Publishing Services",
        description: "The page you're looking for doesn't exist.",
        path: "/404",
        noindex: true,
    },
} satisfies Record<string, SeoProps>;

export default function Seo({ title, description, path, image = DEFAULT_IMAGE, noindex = false }: SeoProps) {
    const url = `${SITE_URL}${path === "/" ? "" : path}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    useEffect(() => {
        document.querySelectorAll("[data-default-seo]").forEach((el) => el.remove());
    }, []);

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_US" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </>
    );
}