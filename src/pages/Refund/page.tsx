import type { ReactNode } from "react";
import Seo, { SEO } from "../../components/Seo";
import Navbar from "../../components/Navbar";
import PageHero from "../../components/PageHero";
import Footer, { CONTACT } from "../../components/Footer";
import LegalLayout, { B, List, P, Sub, type LegalSection } from "../../components/Legal/LegalLayout";

const TITLE = "Refund & Cancellation Policy";

const LINK = "break-all text-brand-dark underline decoration-brand-light/60 underline-offset-2 hover:decoration-brand-dark";

/** A numbered clause, e.g. "1.1 All payments made..." */
function C({ n, children }: { n: string; children: ReactNode }) {
    return (
        <P>
            <B>{n}</B> {children}
        </P>
    );
}

const INTRO = (
    <>
        <P>This Refund and Cancellation Policy (“Policy”) governs refund requests, project cancellations, and related financial matters arising from the purchase of publishing, editorial, production, marketing, and other services offered by Spine Publishing Services (“Company,” “we,” “us,” or “our”).</P>
        <P>By purchasing or engaging our services, the client (“Client,” “you,” or “your”) acknowledges that they have read, understood, and agreed to the terms and conditions set forth in this Policy, subject to applicable laws and contractual rights.</P>
    </>
);

const SECTIONS: LegalSection[] = [
    {
        title: "General Refund Eligibility",
        content: (
            <>
                <C n="1.1">All payments made to Spine Publishing Services are subject to the terms of this Policy and the applicable service agreement.</C>
                <C n="1.2">Refund eligibility shall be determined based on the nature of the cancellation request, the time elapsed since project onboarding, the status of the services, work completed, and any expenses or financial commitments incurred by the Company.</C>
                <C n="1.3">A refund may be considered under the following circumstances:</C>
                <List
                    items={[
                        <>The Client requests cancellation before the commencement of services, subject to the applicable cancellation terms.</>,
                        <>The Company is unable to provide the services expressly agreed upon in the applicable service agreement.</>,
                        <>A payment has been processed erroneously or duplicated.</>,
                        <>A refund is otherwise required under the applicable service agreement or governing law.</>,
                    ]}
                />
                <C n="1.4">All refund requests shall be reviewed individually in accordance with this Policy and applicable legal requirements.</C>
            </>
        ),
    },
    {
        title: "Change-of-Mind Cancellation and Refund Terms",
        content: (
            <>
                <C n="2.1">A change-of-mind cancellation refers to a Client's voluntary decision to discontinue a project for personal reasons or circumstances unrelated to a failure by the Company to perform its contractual obligations.</C>
                <C n="2.2">The following conditions shall govern change-of-mind cancellation requests:</C>

                <Sub>2.2.1 Cancellation Within Twenty-Four (24) Hours of Project Onboarding</Sub>
                <P>Where the Client submits a written cancellation request within twenty-four (24) hours from the official project onboarding date and time, the Client shall be eligible for a refund equivalent to <B>thirty percent (30%)</B> of the total amount received by the Company for the relevant project.</P>
                <P>The remaining <B>seventy percent (70%)</B> shall be retained by the Company as a cancellation charge, subject to applicable law and the terms of the service agreement.</P>
                <P>Any applicable taxes, statutory deductions, or legally required adjustments shall be deducted from the refundable amount before disbursement, where permitted by law.</P>

                <Sub>2.2.2 Cancellation After Twenty-Four (24) Hours of Project Onboarding</Sub>
                <P>Where the Client submits a change-of-mind cancellation request after the expiration of the initial twenty-four (24)-hour period, the project shall be considered non-refundable on the grounds of change of mind alone.</P>
                <P>Accordingly, the Company shall have no contractual obligation to issue a refund solely because the Client elects to discontinue the project after the expiration of this period, subject to applicable consumer-protection laws, statutory refund rights, and the Company's obligations under the applicable service agreement.</P>

                <C n="2.3">For the purposes of this Section, the twenty-four (24)-hour period shall commence from the official project onboarding date and time recorded or communicated by the Company.</C>
                <C n="2.4">The provisions of this Section shall not restrict any refund entitlement arising from the Company's material breach, failure to deliver agreed services, or any other circumstance in which a refund is required by applicable law.</C>
            </>
        ),
    },
    {
        title: "Non-Refundable Services and Completed Work",
        content: (
            <>
                <C n="3.1">Subject to applicable law and the terms of the relevant service agreement, payments attributable to services already completed, delivered, or approved by the Client shall generally be non-refundable.</C>
                <C n="3.2">Such services include, without limitation:</C>
                <List
                    items={[
                        <>Manuscript writing, editing, proofreading, and related editorial services already performed or delivered.</>,
                        <>Book formatting, typesetting, interior layout, and page design work already completed.</>,
                        <>Custom book cover designs, illustrations, graphic design, and other customized creative materials already produced or approved.</>,
                        <>Audiobook production, narration, recording, editing, and other completed production services.</>,
                        <>Marketing campaigns, promotional activities, advertising placements, and associated expenses already incurred.</>,
                        <>ISBN registration, publishing setup, distribution arrangements, printing, and other third-party services for which financial commitments have already been made.</>,
                    ]}
                />
                <C n="3.3">The non-refundable status of completed services shall not exclude any remedy available to the Client under applicable law.</C>
            </>
        ),
    },
    {
        title: "Delayed, Incomplete, or Undelivered Services",
        content: (
            <>
                <C n="4.1">Where the Company is unable to deliver an agreed service due to circumstances within its reasonable control, the Company shall review the matter and determine an appropriate resolution in accordance with the applicable service agreement.</C>
                <C n="4.2">Depending on the circumstances, the resolution may include:</C>
                <List
                    items={[
                        <>Completion and delivery of the outstanding services.</>,
                        <>An alternative service or mutually agreed adjustment.</>,
                        <>A partial or full refund corresponding to the undelivered portion of the services, where appropriate.</>,
                    ]}
                />
                <C n="4.3">Any refund arising under this Section shall be assessed independently of the change-of-mind cancellation provisions in Section 2.</C>
                <C n="4.4">Nothing in this Policy shall relieve the Company of its obligations concerning services that it has expressly agreed to provide.</C>
            </>
        ),
    },
    {
        title: "Project Cancellation Procedure",
        content: (
            <>
                <C n="5.1">A Client wishing to cancel a project must submit a written cancellation request through the Company's designated communication or support channels.</C>
                <C n="5.2">The cancellation request should clearly identify the relevant project and the Client's intention to discontinue the services.</C>
                <C n="5.3">Upon receipt of the request, the Company shall review:</C>
                <List
                    items={[
                        <>The date and time of official project onboarding.</>,
                        <>The date and time the cancellation request was received.</>,
                        <>The services commenced, performed, or completed.</>,
                        <>Any approved deliverables or work already supplied.</>,
                        <>Any third-party expenses, financial commitments, or non-recoverable charges incurred.</>,
                    ]}
                />
                <C n="5.4">The applicable refund amount, if any, shall be determined in accordance with this Policy, the service agreement, and applicable law.</C>
            </>
        ),
    },
    {
        title: "Revisions, Client Dissatisfaction, and Service Disputes",
        content: (
            <>
                <C n="6.1">The Company endeavors to provide services in accordance with the specifications, scope, and requirements agreed upon with the Client.</C>
                <C n="6.2">Where a Client is dissatisfied with a deliverable, the Client shall notify the Company in writing, identifying the specific concerns and requested corrections.</C>
                <C n="6.3">Revisions included within the original service agreement shall be addressed in accordance with the applicable revision terms and limitations.</C>
                <C n="6.4">Dissatisfaction with a completed service, change in personal preference, or a change in creative direction shall not, by itself, establish an automatic entitlement to a refund.</C>
                <C n="6.5">Any legitimate service dispute shall be reviewed in good faith and resolved in accordance with the applicable contractual obligations and legal requirements.</C>
            </>
        ),
    },
    {
        title: "Taxes, Statutory Deductions, and Refund Adjustments",
        content: (
            <>
                <C n="7.1">All approved refunds shall be subject to applicable taxation requirements, statutory deductions, and legally required financial adjustments.</C>
                <C n="7.2">Where permitted by applicable law, any applicable taxes, non-recoverable tax amounts, or mandatory statutory deductions shall be deducted from the approved refund amount before payment is issued.</C>
                <C n="7.3">The Client acknowledges that the final amount disbursed may differ from the initial refund calculation as a result of applicable tax obligations or mandatory deductions.</C>
                <C n="7.4">All deductions shall be calculated and applied in accordance with applicable tax laws and regulations. No deduction shall be imposed contrary to mandatory legal requirements.</C>
            </>
        ),
    },
    {
        title: "Third-Party Costs and External Service Providers",
        content: (
            <>
                <C n="8.1">Certain services offered by the Company may require engagement with external service providers, including but not limited to publishing platforms, distributors, printers, advertising providers, registration authorities, and other vendors.</C>
                <C n="8.2">Payments or expenses already incurred with such third parties may be non-recoverable and may therefore be excluded from the refundable amount, subject to applicable law.</C>
                <C n="8.3">The Company shall consider such expenses when assessing a cancellation or refund request and may provide relevant details of applicable deductions upon request.</C>
            </>
        ),
    },
    {
        title: "Refund Approval and Processing",
        content: (
            <>
                <C n="9.1">All refund requests shall be subject to review and approval in accordance with this Policy.</C>
                <C n="9.2">Approved refunds shall, wherever reasonably practicable, be returned through the original payment method.</C>
                <C n="9.3">Refund processing periods may vary depending on the payment provider, financial institution, transaction method, and applicable verification procedures.</C>
                <C n="9.4">The Client shall be notified of the outcome of the refund review, including the approved refund amount, where applicable.</C>
                <C n="9.5">The Company shall not be responsible for delays attributable solely to payment processors, banking institutions, or other external financial service providers, provided that the Company has appropriately initiated the approved refund.</C>
            </>
        ),
    },
    {
        title: "Refund Request Requirements",
        content: (
            <>
                <C n="10.1">All refund requests must be submitted in writing through the Company's designated support channels.</C>
                <C n="10.2">To facilitate review, the Client should provide:</C>
                <List
                    items={[
                        <>Full name and contact information.</>,
                        <>Order number or project reference, where available.</>,
                        <>Description of the services purchased.</>,
                        <>Official project onboarding date, where available.</>,
                        <>Reason for requesting cancellation or a refund.</>,
                        <>Relevant payment confirmation or transaction reference.</>,
                    ]}
                />
                <C n="10.3">The Company may request additional information reasonably necessary to verify the transaction and assess the refund request.</C>
            </>
        ),
    },
    {
        title: "Policy Amendments and Modifications",
        content: (
            <>
                <C n="11.1">Spine Publishing Services reserves the right to amend, revise, or update this Policy when reasonably necessary.</C>
                <C n="11.2">Any revised Policy shall be published through the Company's official website and shall identify its applicable effective date.</C>
                <C n="11.3">Amendments shall not retroactively eliminate rights or obligations established under an existing service agreement or applicable law.</C>
                <C n="11.4">The version of this Policy applicable to a Client's purchase shall be determined in accordance with the applicable contractual terms and governing law.</C>
            </>
        ),
    },
    {
        title: "Governing Law and Legal Compliance",
        content: (
            <>
                <C n="12.1">This Policy shall be interpreted and applied in conjunction with the applicable service agreement and the laws governing the relevant transaction.</C>
                <C n="12.2">Where any provision of this Policy conflicts with a mandatory statutory requirement or applicable consumer-protection law, the relevant legal requirement shall prevail.</C>
                <C n="12.3">If any provision is determined to be invalid or unenforceable, the remaining provisions shall continue to apply to the extent permitted by law.</C>
            </>
        ),
    },
    {
        title: "Contact Information",
        content: (
            <>
                <C n="13.1">For questions, clarification, cancellation requests, or refund-related inquiries, Clients may contact Spine Publishing Services through the official contact information below.</C>
                <P><B>Business Name:</B> Spine Publishing Services</P>
                <P><B>Website:</B> <a href="https://spinepublishingservices.com" target="_blank" rel="noopener noreferrer" className={LINK}>https://spinepublishingservices.com</a></P>
                <P><B>Email:</B> {CONTACT.email}</P>
                <P><B>Phone:</B> {CONTACT.phone}</P>
                <P><B>Business Address:</B> {CONTACT.address}</P>
            </>
        ),
    },
    {
        title: "Acknowledgment and Acceptance",
        content: (
            <>
                <P>By purchasing, authorizing, or engaging Spine Publishing Services to perform any publishing-related services, the Client acknowledges that they have been provided with an opportunity to review this Refund and Cancellation Policy and understand its provisions.</P>
                <P>The Client's acceptance of the applicable service agreement and this Policy shall be subject to all rights and protections afforded under applicable law.</P>
            </>
        ),
    },
];

export default function RefundPage() {
    return (
        <>
            <Seo {...SEO.refund} />
            <main className="overflow-x-clip">
                <div className="bg-hero">
                    <Navbar />
                    <PageHero title={TITLE} showButtons={false} showBadges={false} />
                </div>
                <LegalLayout intro={INTRO} sections={SECTIONS} otherDoc={{ label: "Terms & Conditions", to: "/terms" }} />
            </main>
            <Footer />
        </>
    );
}