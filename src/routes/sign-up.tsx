import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Sign Up — PlainDocs" },
      { name: "description", content: "Create a PlainDocs account." },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { signUp, confirmSignUp, signIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { needsConfirmation } = await signUp(email.trim(), password);
      if (needsConfirmation) {
        setStep("confirm");
      } else {
        await signIn(email.trim(), password);
        navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await confirmSignUp(email.trim(), code.trim());
      try {
        await signIn(email.trim(), password);
        navigate({ to: "/" });
      } catch {
        navigate({ to: "/sign-in" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Confirmation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {step === "form" ? "Create account" : "Confirm your email"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {step === "form"
          ? "Sign up to save your past analyses."
          : `We sent a code to ${email}. Enter it below.`}
      </p>

      {step === "form" ? (
        <form onSubmit={handleSignUp} className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            <p className="mt-1 text-xs text-muted-foreground">
              At least 8 characters, must include a number, a special character, an uppercase letter, and a lowercase letter.
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-teal text-teal-foreground hover:bg-teal/90">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</> : "Sign Up"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="hover:text-foreground hover:underline">Sign in</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleConfirm} className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div>
            <Label htmlFor="code">Confirmation code</Label>
            <Input id="code" inputMode="numeric" required value={code} onChange={(e) => setCode(e.target.value)} className="mt-1.5" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-teal text-teal-foreground hover:bg-teal/90">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Confirming…</> : "Confirm"}
          </Button>
        </form>
      )}
    </main>
  );
}
