import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileText, Upload, Link, Loader2, ShieldCheck, AlertTriangle, Eye, FileSearch, Lock, Share2 } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlainDocs — Understand any document in minutes" },
      {
        name: "description",
        content:
          "PlainDocs explains legal documents, terms of service, and contracts in plain language. Paste text or upload a PDF and get a clear breakdown of your rights, risks, and key terms.",
      },
      { property: "og:title", content: "PlainDocs — Understand any document in minutes" },
      {
        property: "og:description",
        content: "Plain-language explanations of legal documents and contracts.",
      },
    ],
  }),
  component: PlainDocsPage,
});

const API_URL = "https://6tbzx4c751.execute-api.us-east-1.amazonaws.com/explain";
const MAX_PDF_BYTES = 4 * 1024 * 1024; // 4 MB

const LANGUAGES = [
  "Chinese",
  "English",
  "French",
  "German",
  "Japanese",
  "Krio",
  "Portuguese",
  "Spanish",
  "Yoruba",
] as const;

type Item = { label: string; description: string };
type ApiResult = {
  summary: string;
  keyRights: Item[];
  keyRisks: Item[];
  watchOutFor: Item[];
  otherNotable?: Item[];
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function PlainDocsPage() {
  const { status } = useAuth();
  const [isPrivate, setIsPrivate] = useState(false);
  const [mode, setMode] = useState<"text" | "pdf" | "url">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState<string>("English");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("shared");
    if (!shared) return;
    try {
      const json = decodeURIComponent(escape(atob(shared)));
      const data = JSON.parse(json) as ApiResult;
      setResult(data);
      setIsShared(true);
    } catch {
      toast.error("Invalid shared link");
    }
  }, []);

  function handleShare() {
    if (!result) return;
    try {
      const json = JSON.stringify(result);
      const encoded = btoa(unescape(encodeURIComponent(json)));
      const url = new URL(window.location.href);
      url.searchParams.set("shared", encoded);
      const shareUrl = url.toString();
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to create share link");
    }
  }

  function handleClearShared() {
    const url = new URL(window.location.href);
    url.searchParams.delete("shared");
    window.history.replaceState({}, "", url.toString());
    setIsShared(false);
    setResult(null);
  }

  const canSubmit =
    !loading &&
    (mode === "text"
      ? text.trim().length > 0
      : mode === "pdf"
        ? file !== null
        : url.trim().length > 0);

  async function handleSubmit() {
    setError(null);
    setResult(null);

    let body: Record<string, unknown>;
    try {
      if (mode === "text") {
        if (!text.trim()) return;
        body = { text: text.trim(), language };
      } else if (mode === "pdf") {
        if (!file) return;
        if (file.size > MAX_PDF_BYTES) {
          toast.error("PDF too large. Max 4 MB.");
          return;
        }
        const document = await fileToBase64(file);
        body = { document, language };
      } else {
        const trimmed = url.trim();
        if (!trimmed) return;
        if (!/^https?:\/\//i.test(trimmed)) {
          toast.error("URL must start with http:// or https://");
          return;
        }
        body = { url: trimmed, language };
      }
      body.private = isPrivate;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to prepare request";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      try {
        const { fetchAuthSession } = await import("aws-amplify/auth");
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch {
        // not signed in — proceed without auth header
      }
      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let errMsg = `Request failed (${res.status})`;
        try {
          const errBody = (await res.json()) as { error?: string };
          if (errBody.error) errMsg = errBody.error;
        } catch {
          // ignore parse failure, use fallback
        }
        throw new Error(errMsg);
      }
      const data = (await res.json()) as ApiResult;
      setResult(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />

      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-6 sm:py-8">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-teal">
            <FileSearch className="h-4 w-4" />
            PlainDocs
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Understand any document in minutes
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base font-light whitespace-pre-line">
            Paste, upload, or link to any document (e.g. a contract, terms of service, policy, etc). {"\n"}
            Get a plain-language breakdown of your rights, risks, and what to watch out for.
          </p>
          <p className="mt-2 text-sm italic text-muted-foreground">
            <span className="not-italic text-slate-800">⚠</span> PlainDocs is not intended for regulated documents. Though identifying information is redacted by default, to analyze sensitive or confidential information, sign in and use Private Mode.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-6">
        {status === "authenticated" && (
          <div className="mb-4">
            <div role="tablist" aria-label="Privacy mode" className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
              <button
                type="button"
                role="tab"
                aria-selected={!isPrivate}
                onClick={() => setIsPrivate(false)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                  !isPrivate ? "bg-teal text-teal-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Standard
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isPrivate}
                onClick={() => setIsPrivate(true)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                  isPrivate ? "bg-orange text-orange-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                🔒 Private
              </button>
            </div>
            {isPrivate && (
              <p className="mt-2 text-xs text-orange">
                Your analysis is stored privately and won't appear in any shared or public features.
              </p>
            )}
          </div>
        )}
        <section
          className={cn(
            "rounded-xl border bg-card p-6 shadow-sm",
            isPrivate && status === "authenticated" ? "border-2 border-orange" : "border-border",
          )}
        >
          <Tabs value={mode} onValueChange={(v) => setMode(v as "text" | "pdf" | "url")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text" className="gap-2">
                <FileText className="h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="pdf" className="gap-2">
                <Upload className="h-4 w-4" />
                PDF
              </TabsTrigger>
              <TabsTrigger value="url" className="gap-2">
                <Link className="h-4 w-4" />
                URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-4">
              <Label htmlFor="doc-text" className="sr-only">
                Document text
              </Label>
              <Textarea
                id="doc-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your document text here…"
                className="min-h-[260px] resize-y font-mono text-sm leading-relaxed"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {text.length.toLocaleString()} characters
              </p>
            </TabsContent>

            <TabsContent value="pdf" className="mt-4">
              <label
                htmlFor="doc-pdf"
                className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors hover:bg-muted/60"
              >
                <Upload className="h-6 w-6 text-muted-foreground" />
                <div className="text-sm font-medium text-foreground">
                  {file ? file.name : "Click to upload a PDF"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : "Max 4 MB"}
                </div>
                <input
                  id="doc-pdf"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                Must start with http:// or https://
              </p>
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <Label htmlFor="doc-url" className="sr-only">
                Document URL
              </Label>
              <input
                id="doc-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/terms"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Must start with http:// or https://
              </p>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="sm:w-56">
              <Label htmlFor="lang" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Output language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="lang">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground">
                Language quality varies.
              </p>
              <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                Results are AI-generated.
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              size="lg"
              className="sm:min-w-40 bg-teal text-teal-foreground hover:bg-teal/90"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Explaining…
                </>
              ) : (
                "Explain This"
              )}
            </Button>
          </div>
        </section>

        {error && !loading && (
          <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {result && (
          <section className="mt-10 space-y-6">
            <span className="inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
              Explained in: {language}
            </span>
            <div className="rounded-lg border-l-4 border-l-teal bg-card p-6 shadow-sm">
              <SectionHeading icon={<FileText className="h-4 w-4" />} title="Summary" />
              <p className="mt-3 text-[15px] leading-relaxed text-foreground">
                {result.summary}
              </p>
            </div>

            <ItemList
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Key Rights"
              items={result.keyRights}
            />
            <ItemList
              icon={<AlertTriangle className="h-4 w-4" />}
              title="Key Risks"
              items={result.keyRisks}
            />
            <ItemList
              icon={<Eye className="h-4 w-4" />}
              title="Watch Out For"
              items={result.watchOutFor}
            />
            {result.otherNotable && result.otherNotable.length > 0 && (
              <ItemList
                icon={<FileSearch className="h-4 w-4" />}
                title="Other Notable Terms"
                items={result.otherNotable}
              />
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>PlainDocs provides general information, not legal advice.</span>
          <a href="https://tally.so/r/ODEQE7" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Help
          </a>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-2">
      <span className="text-teal">{icon}</span>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
    </div>
  );
}

function ItemList({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: Item[];
}) {
  return (
    <div className="rounded-lg border-l-4 border-l-teal bg-card p-6 shadow-sm">
      <SectionHeading icon={icon} title={title} />
      {items && items.length > 0 ? (
        <ul className="mt-3 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
              <span className="text-foreground">
                <span className="font-semibold">{item.label}</span>
                {item.description ? <> — <span className="text-muted-foreground">{item.description}</span></> : null}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">None identified.</p>
      )}
    </div>
  );
}
