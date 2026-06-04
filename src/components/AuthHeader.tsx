import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export function AuthHeader() {
  const { status, user, signOut } = useAuth();

  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-6 py-2 text-sm">
        <Link to="/" className="flex items-center gap-1.5 font-semibold text-foreground hover:text-teal transition-colors">
          PlainDocs
          <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-medium text-teal">Beta</span>
        </Link>
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <span className="text-xs text-muted-foreground">&nbsp;</span>
          ) : status === "authenticated" && user ? (
            <>
              <span className="mr-2 text-xs text-muted-foreground">{user.email}</span>
              <Button asChild variant="ghost" size="sm">
                <Link to="/history">History</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                <span className="hidden sm:inline">Sign Out</span>
                <LogOut className="h-4 w-4 sm:hidden" />
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
    </div>
  );
}
