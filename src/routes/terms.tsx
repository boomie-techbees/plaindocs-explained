import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — PlainDocs" },
      { name: "description", content: "PlainDocs terms of use." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-4 text-muted-foreground">
        This page is coming soon.
      </p>
    </main>
  );
}
