import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PricingPlans from "@/components/Pricing/PricingPlans";
import PartnersStrip from "@/components/PartnerStrip";
import PricingTestimonials from "@/components/Pricing/PricingTestimonials";
import PricingFAQ from "@/components/Pricing/PricingFaq";
import PageHero from "@/components/PageHero";
import Seo, { SEO } from "../../components/Seo";

export default function PricingPage() {
    return (
        <>
            <Seo {...SEO.pricing} />
            <main className="overflow-x-hidden">
                <div className="bg-hero">
                    <Navbar />
                    <PageHero
                        title="Transparent, Value-Driven Publishing Plans with Spine Publishing Services "
                        description="Choose the perfect publishing package designed for your goals and budget. Enjoy clear, upfront pricing with zero hidden fees, complete author rights retention, and maximum return on your literary investment."
                    />
                    <PartnersStrip />
                </div>
                <PricingPlans />
                <PricingTestimonials />
                <PricingFAQ />
            </main>
            <Footer />
        </>
    );
}