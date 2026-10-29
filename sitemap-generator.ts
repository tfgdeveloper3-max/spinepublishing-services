import { SitemapStream, streamToPromise, type SitemapItemLoose, EnumChangefreq } from "sitemap";
import { Readable } from "node:stream";
import { writeFileSync } from "node:fs";
import path from "node:path";

const HOSTNAME = "https://spinepublishingservices.com";

const routes: SitemapItemLoose[] = [
    { url: "/", changefreq: EnumChangefreq.WEEKLY, priority: 1.0 },
    { url: "/services", changefreq: EnumChangefreq.MONTHLY, priority: 0.9 },
    { url: "/pricing", changefreq: EnumChangefreq.MONTHLY, priority: 0.9 },
    { url: "/about", changefreq: EnumChangefreq.MONTHLY, priority: 0.8 },
    { url: "/reviews", changefreq: EnumChangefreq.WEEKLY, priority: 0.8 },
    { url: "/contact", changefreq: EnumChangefreq.MONTHLY, priority: 0.7 },
    { url: "/privacy", changefreq: EnumChangefreq.YEARLY, priority: 0.3 },
    { url: "/terms", changefreq: EnumChangefreq.YEARLY, priority: 0.3 },
];

async function generateSitemap() {
    const sitemapPath = path.resolve("./public/sitemap.xml");
    const lastmod = new Date().toISOString();

    const stream = new SitemapStream({ hostname: HOSTNAME });
    const xml = await streamToPromise(Readable.from(routes.map((r) => ({ ...r, lastmod }))).pipe(stream));

    writeFileSync(sitemapPath, xml.toString());
    console.log(`Sitemap generated with ${routes.length} pages at: ${sitemapPath}`);
}

generateSitemap().catch((err) => {
    console.error("Sitemap generation failed:", err);
    process.exit(1);
});