import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — PlainDocs" },
      { name: "description", content: "Your past document analyses." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <main className="mx-auto flex max-w-3xl items-center justify-center px-6 py-24 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in required</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You need to sign in to view your history.
        </p>
        <Button asChild className="mt-6 bg-teal text-teal-foreground hover:bg-teal/90">
          <Link to="/sign-in">Sign in</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">History</h1>
      <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-12 text-center text-sm text-muted-foreground">
        Your past analyses will appear here.
      </div>
    </main>
  );
}
