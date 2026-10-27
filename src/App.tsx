import { MotionConfig } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import ScrollManager from "./components/ScrollManager";
import HomePage from "./pages/Home/page";
import AboutPage from "./pages/About/page";
import ServicesPage from "./pages/Services/page";
import PricingPage from "./pages/Pricing/page";
import ContactPage from "./pages/Contact/page";
import NotFoundPage from "./pages/NotFound/page";
import ReviewsPage from "./pages/Reviews/page";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MotionConfig>
  );
}