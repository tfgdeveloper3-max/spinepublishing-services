import Seo, { SEO } from "../../components/Seo";
import Navbar from "../../components/Navbar";
import PageHero from "../../components/PageHero";
import Footer, { CONTACT } from "../../components/Footer";
import LegalLayout, { B, List, P, Sub, type LegalSection } from "../../components/Legal/LegalLayout";

const TITLE = "Privacy Policy";
const EFFECTIVE_DATE = "October 28, 2026";

const LINK = "break-all text-brand-dark underline decoration-brand-light/60 underline-offset-2 hover:decoration-brand-dark";

const INTRO = (
    <>
        <P>Spine Publishing Services respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and disclose information when you visit our website, contact our team, or purchase our publishing services.</P>
        <P>By using our website, you acknowledge that you have read this Privacy Policy. Where applicable law requires consent for specific data processing activities, we will obtain that consent as required.</P>
    </>
);

const SECTIONS: LegalSection[] = [
    {
        title: "Information We Collect",
        content: (
            <>
                <P>We may collect different types of information depending on how you interact with Spine Publishing Services.</P>
                <Sub>Personal Information</Sub>
                <P>When you submit an inquiry, request a quotation, place an order, or communicate with us, we may collect:</P>
                <List
                    items={[
                        <>Full name</>,
                        <>Email address</>,
                        <>Phone number</>,
                        <>Mailing or billing address</>,
                        <>Business or author information</>,
                        <>Payment and transaction details</>,
                        <>Information you provide through contact forms, emails, or other communications</>,
                    ]}
                />
                <P>You may browse certain areas of our website without directly providing personal information.</P>
                <Sub>Project and Manuscript Information</Sub>
                <P>To provide publishing-related services, we may collect and process materials you submit, including manuscripts, book titles, author biographies, photographs, illustrations, cover concepts, formatting instructions, and other project-related files.</P>
                <P>We use these materials to understand your requirements, perform the services you request, communicate with you about your project, and deliver the agreed work.</P>
                <Sub>Technical and Usage Information</Sub>
                <P>When you visit our website, certain technical information may be collected automatically, depending on the website's configuration and the tools it uses. This may include your IP address, browser type, device information, operating system, referring website, pages viewed, and general browsing activity.</P>
            </>
        ),
    },
    {
        title: "How We Use Your Information",
        content: (
            <>
                <P>Spine Publishing Services may use collected information for the following purposes:</P>
                <List
                    items={[
                        <><B>Providing services:</B> To prepare quotations, manage orders, edit manuscripts, design book covers, format files, and deliver publishing-related services.</>,
                        <><B>Communicating with clients:</B> To respond to questions, provide project updates, request approvals, and address support inquiries.</>,
                        <><B>Processing payments:</B> To facilitate authorized transactions and maintain appropriate business records.</>,
                        <><B>Improving our website:</B> To understand website usage and identify opportunities to improve functionality and user experience.</>,
                        <><B>Managing our business:</B> To maintain records, administer client relationships, prevent fraud, and protect our services.</>,
                        <><B>Meeting legal obligations:</B> To comply with applicable laws, regulations, and lawful requests.</>,
                        <><B>Sending updates and promotions:</B> To provide service announcements or marketing communications where permitted by law and, when required, with your consent.</>,
                    ]}
                />
                <P>We will not use your personal information for purposes that are incompatible with the purposes described in this policy unless permitted by law or appropriately disclosed to you.</P>
            </>
        ),
    },
    {
        title: "Manuscript Confidentiality and Intellectual Property",
        content: (
            <>
                <P>We understand that manuscripts and unpublished creative works may contain confidential or commercially valuable material.</P>
                <P>Information and files submitted to Spine Publishing Services will be handled for the purposes of providing the requested services, managing the client relationship, and meeting applicable legal obligations.</P>
                <P>We do not claim ownership of your original manuscript merely because you submit it to us for editing, formatting, design, or publishing assistance.</P>
                <P>We do not intend to publish or publicly disclose your unpublished manuscript without your authorization, except where disclosure is necessary to provide a service you have requested, is authorized by an applicable agreement, or is required or permitted by law.</P>
                <P>Clients should avoid including unnecessary sensitive personal information in manuscripts or project files.</P>
            </>
        ),
    },
    {
        title: "Cookies and Similar Technologies",
        content: (
            <>
                <P>Our website may use cookies and similar technologies to support website functionality, remember preferences, understand visitor activity, and improve performance.</P>
                <P>Cookies are small files stored on your device through your browser. Depending on their purpose, they may help the website remember information about your visit or measure how visitors interact with its pages.</P>
                <P>We may use the following categories of cookies, depending on the technologies enabled on our website:</P>
                <List
                    items={[
                        <><B>Essential cookies:</B> Support core website functionality and security.</>,
                        <><B>Preference cookies:</B> Remember certain settings or choices.</>,
                        <><B>Analytics cookies:</B> Help us understand website traffic and usage patterns.</>,
                        <><B>Advertising cookies:</B> May be used to measure or personalize advertising where applicable.</>,
                    ]}
                />
                <P>You may be able to manage cookies through your browser settings or any cookie preference tool available on our website. Disabling certain cookies may affect some website features.</P>
                <P>Where required by law, we will obtain consent before using nonessential cookies or similar technologies.</P>
            </>
        ),
    },
    {
        title: "How We Share Information",
        content: (
            <>
                <P>Spine Publishing Services does not sell your personal information for money. We may share information in limited circumstances when necessary for legitimate business purposes or as permitted by law.</P>
                <P>These circumstances may include:</P>
                <Sub>Service Providers</Sub>
                <P>We may share relevant information with trusted providers that help us host our website, process payments, manage communications, provide technical support, or perform other services on our behalf.</P>
                <P>Such providers should receive only the information reasonably necessary for their assigned functions and must handle it in accordance with applicable obligations.</P>
                <Sub>Publishing and Distribution Platforms</Sub>
                <P>Where you request publishing or distribution assistance, we may provide necessary project information and publication files to relevant retailers, distributors, printers, or publishing platforms to carry out your instructions.</P>
                <P>Third-party platforms may process your information under their own privacy policies and terms.</P>
                <Sub>Legal and Regulatory Requirements</Sub>
                <P>We may disclose information when we reasonably believe disclosure is necessary to comply with applicable law, respond to lawful requests, protect our rights, investigate suspected fraud, or safeguard the security of our business and others.</P>
                <Sub>Business Transfers</Sub>
                <P>If our business is involved in a merger, acquisition, restructuring, or sale of assets, relevant information may be transferred as part of that transaction, subject to applicable legal requirements.</P>
            </>
        ),
    },
    {
        title: "Payment Information",
        content: (
            <>
                <P>Payments for services may be handled through third-party payment processors, depending on the payment methods available for your order.</P>
                <P>Payment processors may collect and process information necessary to authorize and complete transactions under their own terms and privacy policies.</P>
                <P>We do not intentionally store full payment card details on our website servers unless this is specifically required and handled through an appropriately secured payment arrangement. The actual handling of payment information depends on the payment systems used.</P>
                <P>For questions about a particular transaction, you may contact us through our official business communication channels.</P>
            </>
        ),
    },
    {
        title: "Data Security",
        content: (
            <>
                <P>We take reasonable technical and organizational measures designed to protect personal information against unauthorized access, disclosure, alteration, loss, or misuse.</P>
                <P>These measures may include access restrictions, secure service providers, appropriate account controls, and other safeguards suitable for the information we handle.</P>
                <P>However, no website, electronic transmission, or storage system can be guaranteed to be completely secure. We therefore cannot promise absolute security.</P>
                <P>Clients should use appropriate precautions when transmitting files or sensitive information and notify us promptly if they believe their information has been accessed or disclosed without authorization.</P>
            </>
        ),
    },
    {
        title: "Data Retention",
        content: (
            <>
                <P>We retain personal information for as long as reasonably necessary to fulfill the purposes for which it was collected, including providing services, maintaining business records, resolving disputes, and meeting legal or accounting obligations.</P>
                <P>Manuscripts and project files may be retained for the period necessary to complete the work, provide agreed support, maintain relevant records, or satisfy applicable obligations.</P>
                <P>When information is no longer required, we will take reasonable steps to delete it, anonymize it, or securely dispose of it, subject to applicable legal requirements and legitimate recordkeeping needs.</P>
                <P>Retention periods may vary according to the nature of the information and the circumstances in which it was collected.</P>
            </>
        ),
    },
    {
        title: "Your Privacy Rights and Choices",
        content: (
            <>
                <P>Depending on your location and applicable law, you may have the right to:</P>
                <List
                    items={[
                        <>Request access to personal information we hold about you.</>,
                        <>Request correction of inaccurate or incomplete information.</>,
                        <>Request deletion of certain personal information.</>,
                        <>Object to or request restrictions on certain processing activities.</>,
                        <>Request a copy of eligible information in a portable format.</>,
                        <>Withdraw consent where processing is based on consent.</>,
                        <>Opt out of certain marketing communications.</>,
                        <>Submit a complaint to the appropriate data protection authority.</>,
                    ]}
                />
                <P>These rights may be subject to legal limitations and verification requirements.</P>
                <P>To make a privacy-related request, contact us using the details provided in the Contact Us section. We may request information reasonably necessary to verify your identity before processing your request.</P>
            </>
        ),
    },
    {
        title: "Marketing Communications",
        content: (
            <>
                <P>We may send service-related communications concerning your inquiries, purchases, projects, or account activity.</P>
                <P>Where permitted by law, we may also send promotional emails about our publishing services, offers, or relevant updates.</P>
                <P>You can opt out of marketing emails by following the unsubscribe instructions included in the message or contacting us directly. Opting out of promotional communications will not prevent us from sending essential messages relating to an existing order or other legitimate business matters.</P>
            </>
        ),
    },
    {
        title: "Third-Party Websites and Services",
        content: (
            <>
                <P>Our website may contain links to external websites or services, including book retailers, publishing platforms, payment providers, and other third-party resources.</P>
                <P>We do not control the privacy practices, security measures, or content of these external services. If you visit a third-party website or provide information directly to a third party, its own privacy policy and terms will apply.</P>
                <P>We encourage you to review the relevant policies before submitting personal information to any external website or service.</P>
            </>
        ),
    },
    {
        title: "International Data Transfers",
        content: (
            <>
                <P>Depending on the services and technology providers we use, your information may be processed or stored in a country other than the country in which you reside.</P>
                <P>Privacy and data protection laws may differ between countries. Where applicable law requires specific safeguards for international transfers, we will take reasonable steps to implement those safeguards.</P>
                <P>For further information about how your information is handled, you may contact us using the details below.</P>
            </>
        ),
    },
    {
        title: "Children's Privacy",
        content: (
            <>
                <P>Our website and publishing services are not intended to knowingly collect personal information from children without the appropriate authorization required by applicable law.</P>
                <P>If we become aware that personal information has been collected from a child in circumstances where collection was not permitted, we will take appropriate steps to address the situation, which may include deleting the information where required.</P>
                <P>A parent or legal guardian who believes a child has submitted personal information to us may contact us to request a review.</P>
            </>
        ),
    },
    {
        title: "Changes to This Privacy Policy",
        content: (
            <>
                <P>We may update this Privacy Policy from time to time to reflect changes in our services, website technology, business practices, or legal obligations.</P>
                <P>When changes are made, we will update the effective date displayed at the top of this page. Where required by law, we will provide additional notice or obtain consent for material changes.</P>
                <P>We encourage visitors and clients to review this page periodically to remain informed about our privacy practices.</P>
            </>
        ),
    },
    {
        title: "Contact Us",
        content: (
            <>
                <P>If you have questions about this Privacy Policy, wish to make a privacy-related request, or need clarification about how your information is handled, please contact Spine Publishing Services using the official contact details below.</P>
                <P><B>Business Name:</B> Spine Publishing Services</P>
                <P><B>Website:</B> <a href="https://spinepublishingservices.com" target="_blank" rel="noopener noreferrer" className={LINK}>https://spinepublishingservices.com</a></P>
                <P><B>Email:</B> {CONTACT.email}</P>
                <P><B>Phone:</B> {CONTACT.phone}</P>
                <P><B>Business Address:</B> {CONTACT.address}</P>
                <P>We value the trust our clients place in us and are committed to handling their information responsibly.</P>
            </>
        ),
    },
];

export default function PrivacyPage() {
    return (
        <>
            <Seo {...SEO.privacy} />
            <main className="overflow-x-clip">
                <div className="bg-hero">
                    <Navbar />
                    <PageHero title={TITLE} description={`Effective Date: ${EFFECTIVE_DATE}`} showButtons={false} showBadges={false} />
                </div>
                <LegalLayout intro={INTRO} sections={SECTIONS} otherDoc={{ label: "Terms & Conditions", to: "/terms" }} />
            </main>
            <Footer />
        </>
    );
}