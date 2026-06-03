import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export function AuthHeader() {
  const { status, user, signOut } = useAuth();

  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-end gap-2 px-6 py-2 text-sm">
        {status === "loading" ? (
          <span className="text-xs text-muted-foreground">&nbsp;</span>
        ) : status === "authenticated" && user ? (
          <>
            <span className="mr-2 text-xs text-muted-foreground">{user.email}</span>
            <Button asChild variant="ghost" size="sm">
              <Link to="/history">History</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="ghost" size="sm">
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-teal text-teal-foreground hover:bg-teal/90">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
