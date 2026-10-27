import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hero from "../../components/Landing/Hero";
import AboutSection from "../../components/Landing/AboutSection";
import HowItWorks from "../../components/Landing/HowItWorks";
import DidYouKnow from "../../components/DidYouKnow";
import Portfolio from "../../components/Landing/Portfolio";
import PartnersStrip from "@/components/PartnerStrip";
import Testimonials from "@/components/Landing/Testimonial";

export default function HomePage() {
    return (
        <>
            <main className="overflow-x-hidden">
                <div className="bg-hero">
                    <Navbar />
                    <Hero />
                </div>
                <PartnersStrip />
                <AboutSection />
                <HowItWorks />
                <DidYouKnow />
                <Portfolio />
                <Testimonials />
            </main>
            <Footer />
        </>
    );
}