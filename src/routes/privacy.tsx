import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PlainDocs" },
      { name: "description", content: "PlainDocs privacy policy." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">
        This page is coming soon.
      </p>
    </main>
  );
}
