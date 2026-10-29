import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ReviewsHero from "../../components/Reviews/ReviewsHero";
import ReviewsSection from "../../components/Reviews/ReviewsSection";
import Seo, { SEO } from "../../components/Seo";

export default function ReviewsPage() {
    return (
        <>
            <Seo {...SEO.reviews} />
            <main className="overflow-x-hidden">
                <div className="bg-hero">
                    <Navbar />
                    <ReviewsHero />
                </div>
                <ReviewsSection />
            </main>
            <Footer />
        </>
    );
}