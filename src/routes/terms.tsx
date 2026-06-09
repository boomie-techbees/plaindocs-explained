import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — PlainDocs" },
      {
        name: "description",
        content: "PlainDocs Terms of Use and Acceptable Use Policy.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        PlainDocs · plaindocs.techbees.me · Effective: June 2026
      </p>

      <div className="mt-8 space-y-6 text-foreground leading-relaxed">
        <p>
          By using PlainDocs, you agree to these Terms of Use. If you do not
          agree, please do not use the service.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            1. What PlainDocs Is
          </h2>
          <p>
            PlainDocs is a tool that takes documents and explains them in plain
            language using AI. It is designed to help people understand what
            they are reading, not to replace professional advice.
          </p>
          <p>
            PlainDocs does not provide legal, medical, financial, tax, or any
            other professional advice. The AI-generated summaries are
            informational only. Do not rely on them to make important decisions
            without consulting a qualified professional.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            2. Who Can Use PlainDocs
          </h2>
          <p>
            PlainDocs is open to the public. You must be at least 13 years old
            to create an account. By using PlainDocs, you represent that you
            meet this requirement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            3. Your Account
          </h2>
          <p>
            You are responsible for maintaining the security of your account
            credentials. Do not share your password. If you believe your
            account has been compromised, contact us immediately via the
            <a href="https://tally.so/r/ODEQE7" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">help form</a> or email
            <a href="mailto:support@techbees.me" className="text-teal hover:underline">support@techbees.me</a>.
          </p>
          <p>You are responsible for all activity that occurs under your account.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            4. Acceptable Use
          </h2>
          <p>You agree not to use PlainDocs to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Submit content that you do not have the right to share</li>
            <li>
              Attempt to extract, reverse engineer, or misuse the underlying AI
              models
            </li>
            <li>Automate requests in ways that abuse or overload the service</li>
            <li>
              Submit content that is illegal, harmful, or violates others'
              rights
            </li>
            <li>Circumvent the safety filters built into the service</li>
          </ul>
          <p>
            PlainDocs uses Bedrock Guardrails to filter certain types of
            content. If your document is declined, this is the likely reason.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            5. Regulated and Sensitive Documents
          </h2>
          <p>
            A notice on the PlainDocs homepage states: PlainDocs is not
            appropriate for regulated documents where the original language
            carries legal weight, such as contracts, court filings, medical
            records, or financial disclosures. This is a real limitation, not a
            formality.
          </p>
          <p>
            PlainDocs generates AI summaries. AI can misinterpret, omit, or
            simplify language in ways that matter. If you are dealing with a
            legally or medically significant document, use PlainDocs as a
            starting point for comprehension only — not as a substitute for
            professional review.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            6. Intellectual Property
          </h2>
          <p>
            PlainDocs and its underlying code, design, and branding are owned
            by TechBees. You may not copy, redistribute, or repurpose the
            service without permission.
          </p>
          <p>
            The documents you submit remain yours. By submitting a document,
            you grant PlainDocs a limited license to process it for the purpose
            of generating your summary. We do not claim ownership of your
            documents or the summaries generated from them.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            7. Disclaimer of Warranties
          </h2>
          <p>
            PlainDocs is provided "as is." We make no warranties, express or
            implied, about the accuracy, completeness, or reliability of the
            AI-generated summaries. AI can make mistakes. We are not
            responsible for decisions made based on PlainDocs output.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            8. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, TechBees and PlainDocs are
            not liable for any damages arising from your use of or inability to
            use the service, including damages resulting from reliance on
            AI-generated content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            9. Changes to the Service
          </h2>
          <p>
            We may update, change, or discontinue PlainDocs at any time. We
            will try to provide notice of significant changes, but we do not
            guarantee continuity of service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            10. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. The effective date at
            the top reflects the most recent revision. Continued use after
            changes constitutes acceptance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            11. Governing Law
          </h2>
          <p>
            These Terms are governed by the laws of the State of Maryland,
            United States, without regard to conflict of law principles.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">12. Contact</h2>
          <p>
            Questions about these Terms? Use the
            <a href="https://tally.so/r/ODEQE7" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">help form</a> or email
            <a href="mailto:support@techbees.me" className="text-teal hover:underline">support@techbees.me</a>.
          </p>
        </section>

        <hr className="border-border" />

        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Acceptable Use Policy
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            PlainDocs · plaindocs.techbees.me · Effective: June 2026
          </p>
        </div>

        <p>
          This policy describes what you can and cannot submit to PlainDocs. It
          exists to keep the service useful, fair, and safe for everyone.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            What PlainDocs Is For
          </h2>
          <p>
            PlainDocs is designed to explain documents in plain language. It
            works well for:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Contracts, leases, and agreements you want to understand (not
              rely on legally)
            </li>
            <li>
              Terms of service, privacy policies, and user agreements
            </li>
            <li>Academic papers, research summaries, and reports</li>
            <li>Government documents and forms</li>
            <li>
              Any text-heavy document that would benefit from a plain-language
              summary
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            What You Should Not Submit
          </h2>

          <h3 className="text-base font-semibold">
            Documents You Do Not Own or Have Rights To
          </h3>
          <p>
            Only submit documents you have the right to share. Do not submit
            confidential documents belonging to others, documents covered by
            non-disclosure agreements, or copyrighted materials you are not
            authorized to reproduce.
          </p>

          <h3 className="text-base font-semibold">
            Highly Sensitive Personal Information
          </h3>
          <p>
            PlainDocs processes documents through cloud-based AI
            infrastructure. Do not submit documents containing Social Security
            numbers, financial account details, medical records with personally
            identifying information, or other data that should not be processed
            through a cloud service. If you must use PlainDocs with sensitive
            documents, consider redacting personal details before submitting.
          </p>

          <h3 className="text-base font-semibold">Harmful or Illegal Content</h3>
          <p>
            Do not submit content that is illegal, promotes harm, or is
            designed to generate harmful output from the AI. PlainDocs has
            content filters (Bedrock Guardrails) that will block much of this
            automatically, but automated filters are not perfect.
          </p>

          <h3 className="text-base font-semibold">
            Content for the Purpose of Abusing the Service
          </h3>
          <p>
            Do not use PlainDocs to stress-test, scrape, or exploit the
            service. Do not attempt to inject instructions into documents to
            manipulate the AI's behavior.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Content Filters
          </h2>
          <p>
            PlainDocs uses Amazon Bedrock Guardrails to filter content. Some
            submissions may be declined because of this. If a legitimate
            document is declined incorrectly, please let us know via the
            <a href="https://tally.so/r/ODEQE7" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">help form</a> or email
            <a href="mailto:support@techbees.me" className="text-teal hover:underline">support@techbees.me</a> — these filters are calibrated for general use and may
            occasionally be overly cautious.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Enforcement</h2>
          <p>
            Violation of this policy may result in suspension or termination of
            your account. For serious violations (illegal content, abuse), we
            reserve the right to take appropriate action.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
          <p>
            Questions about what is or is not acceptable? Use the
            <a href="https://tally.so/r/ODEQE7" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">help form</a> or email
            <a href="mailto:support@techbees.me" className="text-teal hover:underline">support@techbees.me</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
