import Seo, { SEO } from "../../components/Seo";
import Navbar from "../../components/Navbar";
import PageHero from "../../components/PageHero";
import Footer from "../../components/Footer";
import LegalLayout, { List, P, type LegalSection } from "../../components/Legal/LegalLayout";

const TITLE = "Terms and Conditions";
const EFFECTIVE_DATE = "October 28, 2026";

const INTRO = (
    <>
        <P>Welcome to Spine Publishing Services. These Terms and Conditions govern your access to and use of our website, publishing services, and related offerings. By browsing our website, submitting an inquiry, placing an order, or purchasing a service, you agree to comply with these terms.</P>
        <P>Please read these terms carefully before using our services. If you do not agree with any part of these Terms and Conditions, please discontinue your use of the website and services.</P>
    </>
);

const SECTIONS: LegalSection[] = [
    {
        title: "Overview of Our Services",
        content: (
            <>
                <P>Spine Publishing Services provides publishing-related services to authors, independent writers, businesses, and other clients. Depending on the service selected and the terms of an individual order, our offerings may include:</P>
                <List
                    items={[
                        <>Book publishing and distribution assistance</>,
                        <>Manuscript editing and proofreading</>,
                        <>Book formatting and layout design</>,
                        <>Cover design and related creative services</>,
                        <>Book marketing and promotional support</>,
                        <>Assistance with preparing books for digital and print publication</>,
                        <>Other writing, publishing, and author support services offered on our website</>,
                    ]}
                />
                <P>The exact scope, deliverables, pricing, and estimated completion time for each project will be communicated to the client before or during the ordering process.</P>
            </>
        ),
    },
    {
        title: "Acceptance of Terms",
        content: (
            <>
                <P>By accessing this website or purchasing our services, you confirm that you are legally capable of entering into a binding agreement and that you accept these Terms and Conditions.</P>
                <P>These terms apply to website visitors, prospective clients, existing customers, and anyone who uses our services. Additional terms may apply to specific service packages, written proposals, or individual agreements. Where applicable, those terms should be read alongside this document.</P>
            </>
        ),
    },
    {
        title: "Orders and Service Agreements",
        content: (
            <>
                <P>Clients may contact Spine Publishing Services through the available website forms or other designated communication channels to discuss their publishing requirements.</P>
                <P>Before work begins, clients should review the selected services, agreed pricing, project specifications, deliverables, and estimated timelines.</P>
                <P>An order will be considered confirmed once the required acceptance and payment arrangements have been completed as agreed between the client and Spine Publishing Services.</P>
                <P>Clients are responsible for providing accurate contact information, complete project instructions, and all materials required to fulfill their orders. Any changes to the agreed scope of work may require revised pricing or an adjusted delivery schedule.</P>
            </>
        ),
    },
    {
        title: "Payments and Pricing",
        content: (
            <>
                <P>All service fees will be communicated to clients before an order is finalized. Prices may vary depending on the nature, length, complexity, and requirements of the project.</P>
                <P>Clients agree to pay the applicable fees according to the payment schedule communicated at the time of purchase.</P>
                <P>Additional charges may apply if a client requests work outside the original scope, including substantial manuscript revisions, extra design concepts, additional formatting, or other services not included in the original agreement. Any additional charges should be communicated to and approved by the client before the extra work is undertaken.</P>
                <P>Spine Publishing Services reserves the right to revise its prices for future orders. Price changes will not automatically alter an existing order that has already been agreed upon, unless the client approves a change in scope or another applicable agreement provides otherwise.</P>
            </>
        ),
    },
    {
        title: "Manuscript Submission and Client Responsibilities",
        content: (
            <>
                <P>Clients are responsible for supplying the manuscript, images, illustrations, author information, references, and other materials necessary for their projects.</P>
                <P>By submitting materials to Spine Publishing Services, you confirm that:</P>
                <List
                    items={[
                        <>You own the materials or have obtained the necessary permissions to use them.</>,
                        <>Your content does not knowingly infringe another person's copyright, trademark, privacy rights, or other legal rights.</>,
                        <>Your materials do not contain unlawful content or violate applicable laws.</>,
                        <>The information and instructions you provide are accurate to the best of your knowledge.</>,
                        <>You are authorized to request the services associated with the submitted materials.</>,
                    ]}
                />
                <P>Clients should retain their own copies of all manuscripts, source files, images, and other important materials. Unless otherwise agreed in writing, clients remain responsible for reviewing and approving the final deliverables before publication.</P>
                <P>Spine Publishing Services reserves the right to decline or discontinue work involving materials that appear unlawful, infringing, misleading, or otherwise unsuitable for the requested services.</P>
            </>
        ),
    },
    {
        title: "Editing, Proofreading, and Formatting",
        content: (
            <>
                <P>Our editing, proofreading, and formatting services are intended to improve the presentation, readability, consistency, and professional appearance of a manuscript according to the agreed scope of work.</P>
                <P>The level of editing or proofreading provided will depend on the service purchased. A proofreading package, for example, may not include extensive rewriting, fact-checking, developmental editing, or substantive changes to the manuscript.</P>
                <P>Clients are responsible for reviewing edited manuscripts, page layouts, cover designs, and final files before approving them for publication.</P>
                <P>Although we aim to deliver accurate and professionally prepared work, no editing or proofreading service can guarantee the elimination of every error. Clients should carefully examine the final materials and report any issues covered by their service agreement within the agreed review period.</P>
            </>
        ),
    },
    {
        title: "Publishing and Distribution",
        content: (
            <>
                <P>Spine Publishing Services may assist clients in preparing their books for publication and submitting them to relevant publishing or distribution platforms, depending on the services purchased.</P>
                <P>Publication and distribution may depend on the eligibility requirements, technical specifications, approval procedures, and policies of independent third-party platforms.</P>
                <P>We do not control the decisions, review procedures, listing availability, pricing rules, distribution territories, or content requirements of third-party publishers, retailers, printers, or distributors.</P>
                <P>Accordingly, we cannot guarantee that a manuscript will be accepted by a particular platform, published by a specific date, listed in every intended marketplace, or remain available indefinitely.</P>
                <P>Clients are responsible for reviewing publication details, metadata, author information, pricing, rights selections, and other relevant information before authorizing publication.</P>
            </>
        ),
    },
    {
        title: "Intellectual Property and Ownership",
        content: (
            <>
                <P>Clients retain ownership of the original manuscripts and other intellectual property they own or are legally entitled to use.</P>
                <P>Ownership and usage rights relating to completed deliverables created by Spine Publishing Services will be governed by the applicable service agreement and any relevant third-party licensing terms.</P>
                <P>Where a written agreement provides that ownership of eligible custom-created deliverables transfers to the client after full payment, that transfer will be subject to the terms of that agreement and any applicable legal restrictions.</P>
                <P>Third-party materials, stock images, fonts, software, templates, and other licensed assets remain subject to their respective owners' rights and licensing conditions. Clients may be required to obtain additional licenses or pay separate fees for certain uses.</P>
                <P>Spine Publishing Services does not claim ownership of a client's original manuscript merely because it has been submitted for editing, formatting, design, or publishing assistance.</P>
                <P>Neither party may use the other party's protected intellectual property beyond the rights granted under the applicable agreement or by law.</P>
            </>
        ),
    },
    {
        title: "Cover Design, Images, and Creative Materials",
        content: (
            <>
                <P>Cover designs and other creative materials will be prepared according to the specifications and scope agreed upon for the project.</P>
                <P>Clients must ensure that any images, photographs, logos, illustrations, or other materials they supply are authorized for the intended use.</P>
                <P>Where third-party images, fonts, or other licensed assets are incorporated into a project, their use may be subject to separate restrictions or licensing fees.</P>
                <P>Unless otherwise stated in the service agreement, the inclusion of a design element does not transfer ownership of the underlying third-party asset to the client.</P>
                <P>Clients should confirm that the final cover and interior design meet the technical and content requirements of their intended publishing or printing platform before approving publication.</P>
            </>
        ),
    },
    {
        title: "Revisions and Approvals",
        content: (
            <>
                <P>Revision allowances, review periods, and approval requirements may vary according to the selected service package.</P>
                <P>Clients should provide clear, consolidated feedback within the applicable review period. Requests that exceed the included revision allowance or materially change the original project requirements may incur additional charges.</P>
                <P>Approval of a manuscript, cover, layout, or other deliverable indicates that the client has reviewed the material and authorizes the agreed next action.</P>
                <P>Clients should not approve files for publication or printing until they are satisfied with the content and presentation. Corrections requested after final approval, publication, or printing may require additional work and may not be possible to implement through every third-party platform.</P>
            </>
        ),
    },
    {
        title: "Delivery Timelines",
        content: (
            <>
                <P>Estimated delivery dates will depend on the project scope, the timely receipt of materials, client feedback, and any required third-party approvals.</P>
                <P>We make reasonable efforts to meet agreed timelines but cannot guarantee completion by a particular date unless expressly confirmed in a written agreement.</P>
                <P>Delays may occur because of incomplete submissions, late revisions, changes in project scope, technical difficulties, or circumstances beyond our reasonable control.</P>
                <P>Clients are encouraged to provide requested materials and approvals promptly to help prevent avoidable delays.</P>
            </>
        ),
    },
    {
        title: "Refunds, Cancellations, and Order Changes",
        content: (
            <>
                <P>Refund eligibility and cancellation terms depend on the applicable service agreement, the work already completed, any costs incurred, and applicable consumer protection laws.</P>
                <P>Clients who wish to cancel an order or request a refund should contact Spine Publishing Services as soon as possible and provide the relevant order details.</P>
                <P>Where work has not started, cancellation requests may be considered in accordance with the agreed cancellation policy. Where work has commenced, any refund determination should account for the services performed, deliverables supplied, and any applicable nonrecoverable costs, subject to the governing agreement and applicable law.</P>
                <P>Requests to change a project after work has started may affect its price, scope, and delivery timeline. Any revised arrangements should be agreed upon before the additional work proceeds.</P>
                <P>Nothing in these terms excludes any refund, cancellation, or other right that cannot lawfully be excluded.</P>
            </>
        ),
    },
    {
        title: "Marketing and Promotional Services",
        content: (
            <>
                <P>Where book marketing or promotional services are included in an order, the specific activities and deliverables will depend on the agreed package.</P>
                <P>Marketing services may involve promotional planning, content preparation, campaign support, or other agreed activities. Results may vary based on the book's subject, audience, pricing, competition, market conditions, advertising budgets, and third-party platform policies.</P>
                <P>Spine Publishing Services does not guarantee a particular number of sales, downloads, reviews, rankings, media placements, followers, or revenue unless a specific measurable commitment is expressly stated in a written agreement.</P>
                <P>Clients remain responsible for ensuring that their promotional claims, endorsements, and advertising materials comply with applicable laws and platform rules.</P>
            </>
        ),
    },
    {
        title: "No Guarantee of Commercial Success",
        content: (
            <>
                <P>Publishing and marketing outcomes are influenced by factors that may be outside our control, including reader demand, market trends, distribution decisions, competition, and the quality and positioning of a book.</P>
                <P>Our services are intended to provide publishing assistance and related professional support. Purchasing our services does not guarantee commercial success, profitability, bestseller status, a particular level of visibility, or any specific financial return.</P>
                <P>Any examples, portfolio materials, or testimonials displayed on our website are provided for illustrative purposes and should not be interpreted as a promise that another client will achieve the same results.</P>
            </>
        ),
    },
    {
        title: "Website Use and Prohibited Activities",
        content: (
            <>
                <P>You agree to use our website lawfully and responsibly. You must not:</P>
                <List
                    items={[
                        <>Use the website for fraudulent, unlawful, or deceptive purposes.</>,
                        <>Submit malicious software, harmful code, or unauthorized automated requests.</>,
                        <>Attempt to gain unauthorized access to our website, systems, or data.</>,
                        <>Interfere with the website's operation, security, or availability.</>,
                        <>Copy, reproduce, or commercially exploit protected website materials without authorization.</>,
                        <>Submit materials that violate applicable laws or the rights of others.</>,
                    ]}
                />
                <P>We reserve the right to restrict or suspend website access where reasonably necessary to protect our services, users, systems, or legal interests.</P>
            </>
        ),
    },
    {
        title: "Privacy and Personal Information",
        content: (
            <>
                <P>Spine Publishing Services may collect information that clients provide when submitting inquiries, requesting quotations, placing orders, or communicating with our team.</P>
                <P>Personal information will be handled in accordance with our Privacy Policy and applicable data protection laws.</P>
                <P>Clients should review the Privacy Policy to understand what information may be collected, how it may be used, and the circumstances in which it may be shared with service providers or other relevant parties.</P>
                <P>By submitting information through our website, you acknowledge that your information will be handled as described in the applicable Privacy Policy.</P>
            </>
        ),
    },
    {
        title: "Third-Party Websites and Services",
        content: (
            <>
                <P>Our website or services may refer to or interact with third-party platforms, including book retailers, publishing services, distribution providers, payment processors, and marketing platforms.</P>
                <P>These third parties operate independently and may have their own terms, privacy policies, fees, and eligibility requirements.</P>
                <P>Spine Publishing Services is not responsible for the availability, content, policies, or independent actions of third-party websites and platforms. Clients should review the relevant third-party terms before using those services or authorizing publication.</P>
            </>
        ),
    },
];

export default function TermsPage() {
    return (
        <>
            <Seo {...SEO.terms} />
            <main className="overflow-x-clip">
                <div className="bg-hero">
                    <Navbar />
                    <PageHero title={TITLE} description={`Effective Date: ${EFFECTIVE_DATE}`} showButtons={false} showBadges={false} />
                </div>
                <LegalLayout intro={INTRO} sections={SECTIONS} otherDoc={{ label: "Privacy Policy", to: "/privacy" }} />
            </main>
            <Footer />
        </>
    );
}