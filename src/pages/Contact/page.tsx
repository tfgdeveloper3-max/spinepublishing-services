import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactSection from "../../components/Contact/ContactSection";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
    return (
        <>
            <main className="overflow-x-hidden">
                <div className="bg-hero">
                    <Navbar />
                    <PageHero
                        title={"Let’s Bring Your Book to Life with Spine Publishing Services"}
                        description="Have questions about your manuscript or our publishing packages? Our expert team is here to guide you every step of the way. Reach out today and start your journey toward becoming a published author."
                    />
                </div>
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}