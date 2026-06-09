import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie and Data Notice — PlainDocs" },
      {
        name: "description",
        content: "How PlainDocs uses cookies and similar technologies.",
      },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        Cookie and Data Notice
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        PlainDocs · plaindocs.techbees.me · Effective: June 2026
      </p>

      <div className="mt-8 space-y-6 text-foreground leading-relaxed">
        <p>
          This notice explains how PlainDocs uses cookies and similar tracking
          technologies. It is shorter than it sounds.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Cookies We Use
          </h2>

          <h3 className="text-base font-semibold">
            Authentication Cookies (Required)
          </h3>
          <p>
            PlainDocs uses Amazon Cognito to manage user accounts. When you
            sign in, Cognito sets session cookies that keep you logged in as
            you use the app. These are necessary for the service to function.
            You cannot opt out of these while using PlainDocs as a signed-in
            user.
          </p>

          <h3 className="text-base font-semibold">
            No Advertising or Tracking Cookies
          </h3>
          <p>
            PlainDocs does not use advertising cookies, third-party tracking
            cookies, or analytics tools that build profiles about your behavior
            across websites. We do not share cookie data with advertisers.
          </p>

          <h3 className="text-base font-semibold">Local Storage</h3>
          <p>
            PlainDocs may use browser local storage to preserve your session
            state (for example, keeping you on the right page after you sign
            in). This stays on your device and is not transmitted to any third
            party.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Third-Party Services
          </h2>
          <p>
            The Tally help form linked from PlainDocs operates on Tally's
            platform and may use its own cookies or storage. If you submit a
            help request, Tally's privacy policy applies to that interaction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Managing Cookies
          </h2>
          <p>
            You can clear cookies and local storage through your browser
            settings. Doing so will sign you out of PlainDocs. Most browsers
            also allow you to block cookies from specific sites, though this
            will prevent PlainDocs from functioning correctly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Questions</h2>
          <p>
            Questions about cookies or data? Use the
            <a href="https://tally.so/r/ODEQE7" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">help form</a> or email
            <a href="mailto:support@techbees.me" className="text-teal hover:underline">support@techbees.me</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
