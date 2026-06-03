import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — PlainDocs" },
      { name: "description", content: "Reset your PlainDocs password." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { resetPassword, confirmResetPassword } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"request" | "confirm">("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRequest(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setStep("confirm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send reset code");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await confirmResetPassword(email.trim(), code.trim(), newPassword);
      navigate({ to: "/sign-in" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Forgot password</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {step === "request"
          ? "Enter your email and if an account is found, we'll send a reset code."
          : `Enter the code sent to ${email} and choose a new password.`}
      </p>

      {step === "request" ? (
        <form onSubmit={handleRequest} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-teal text-teal-foreground hover:bg-teal/90">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send reset code"}
          </Button>
          <p className="text-xs text-muted-foreground">
            <Link to="/sign-in" className="hover:text-foreground hover:underline">Back to sign in</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleConfirm} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div>
            <Label htmlFor="code">Confirmation code</Label>
            <Input id="code" inputMode="numeric" required value={code} onChange={(e) => setCode(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="newPassword">New password</Label>
            <Input id="newPassword" type="password" autoComplete="new-password" minLength={8} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1.5" />
            <p className="mt-1 text-xs text-muted-foreground">At least 8 characters, must include a number, a special character, an uppercase letter, and a lowercase letter.</p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-teal text-teal-foreground hover:bg-teal/90">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Resetting…</> : "Reset password"}
          </Button>
        </form>
      )}
    </main>
  );
}
