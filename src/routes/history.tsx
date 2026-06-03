import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

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

type HistoryItem = {
  id?: string;
  summary_preview?: string;
  input_type?: string;
  language?: string;
  timestamp?: string | number;
};

function formatTimestamp(ts?: string | number) {
  if (!ts) return "";
  const d = typeof ts === "number" ? new Date(ts) : new Date(ts);
  if (isNaN(d.getTime())) return String(ts);
  return d.toLocaleString();
}

function HistoryPage() {
  const { status } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.accessToken?.toString();
        const res = await fetch(
          "https://6tbzx4c751.execute-api.us-east-1.amazonaws.com/history",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          },
        );
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        const list: HistoryItem[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.history)
              ? data.history
              : [];
        list.sort((a, b) => {
          const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return tb - ta;
        });
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load history");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading") {
    return (
      <main className="mx-auto flex max-w-3xl items-center justify-center px-6 py-12 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="mx-auto max-w-md px-6 py-8 text-center">
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
    <main className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">History</h1>
      <p className="mt-1 text-sm text-muted-foreground">Showing a summary of the recent docs you've explained.</p>

      {loading ? (
        <div className="mt-8 flex items-center justify-center py-8 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : error || items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          <p>No analyses yet. Go explain a document to get started.</p>
          <Button asChild className="mt-4 bg-teal text-teal-foreground hover:bg-teal/90">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((item, idx) => (
            <li
              key={item.id ?? idx}
              className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/30"
            >
              <p className="text-sm text-foreground">
                {item.summary_preview ?? "(no summary)"}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {item.input_type && <span className="uppercase tracking-wide">{item.input_type}</span>}
                {item.language && <span>{item.language}</span>}
                {item.timestamp && <span>{formatTimestamp(item.timestamp)}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
