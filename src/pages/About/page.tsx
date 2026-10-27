import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PartnersStrip from "@/components/PartnerStrip";
import AboutUs from "@/components/About/AboutUs";
import DidYouKnow from "@/components/DidYouKnow";
import AboutTestimonials from "@/components/About/AboutTestimonials";
import AboutHero from "@/components/About/AboutHero";

export default function AboutPage() {
    return (
        <>
            <main className="overflow-x-hidden">
                <div className="bg-hero">
                    <Navbar />
                    <AboutHero
                        title="Empowering Authors, Redefining Publishing with Spine Publishing Services"
                        description="At Spine Publishing Services, we believe every author deserves a smooth, transparent path to literary success. Combining cutting-edge technology with human expertise, we streamline editing, cover design, and global distribution to bring your unique story to millions of readers worldwide."
                    />
                    <PartnersStrip />
                    <AboutUs />
                    <DidYouKnow />
                    <AboutTestimonials />
                </div>

            </main>
            <Footer />
        </>
    );
}