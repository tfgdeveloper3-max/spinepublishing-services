import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServicesGrid from "@/components/Services/ServicesGrid";
import FAQ from "@/components/Services/FAQ";
import ServicesTestimonials from "@/components/Services/ServicesTestimonial";
import PartnersStrip from "@/components/PartnerStrip";
import PageHero from "@/components/PageHero";


export default function ServicesPage() {
    return (
        <>
            <main className="overflow-x-hidden">
                <div className="bg-hero">
                    <Navbar />
                    <PageHero
                        title="End-to-End Book Publishing Services Engineered for Author Success"
                        description="From professional manuscript editing and custom cover design to global distribution and targeted marketing, SpinePublishing provides everything you need to turn your manuscript into a successful published book."
                    />
                    <PartnersStrip />
                </div>
                <ServicesGrid />
                <ServicesTestimonials />
                <FAQ />
            </main>
            <Footer />
        </>
    );
}