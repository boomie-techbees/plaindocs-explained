import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — PlainDocs" },
      { name: "description", content: "PlainDocs cookie policy." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Cookie Policy</h1>
      <p className="mt-4 text-muted-foreground">
        This page is coming soon.
      </p>
    </main>
  );
}
