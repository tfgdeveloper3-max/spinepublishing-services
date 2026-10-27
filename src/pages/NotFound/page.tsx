import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function NotFoundPage() {
    return (
        <>
            <main className="bg-hero overflow-x-hidden">
                <Navbar />
                <section className="flex flex-col items-center px-6 pb-28 pt-16 text-center lg:pt-24">
                    <h1 className="font-heading text-[56px] leading-none text-black sm:text-[80px]">404</h1>
                    <p className="mt-4 max-w-[480px] font-body text-[16px] text-neutral-700">
                        This page isn't ready yet or doesn't exist. Head back home to keep exploring.
                    </p>
                    <Link
                        to="/"
                        className="bg-brand-gradient mt-8 inline-flex px-8 py-2.5 font-body text-[16px] text-white shadow-[0_6px_18px_-6px_rgba(77,55,96,0.6)]"
                    >
                        Back to Home
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
}