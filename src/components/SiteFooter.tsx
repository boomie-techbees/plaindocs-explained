import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-3xl px-6 py-6 space-y-3 text-center text-xs text-muted-foreground">
        <p>PlainDocs provides general information, not legal advice.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>© 2026 TechBees</span>
          <span>·</span>
          <a
            href="https://techbees.me/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal underline-offset-4 hover:underline transition-colors"
          >
            More apps
          </a>
          <span>·</span>
          <a
            href="https://tally.so/r/ODEQE7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal underline-offset-4 hover:underline transition-colors"
          >
            Help
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground/70">
          <Link
            to="/privacy"
            className="underline-offset-4 hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
          <span>·</span>
          <Link
            to="/terms"
            className="underline-offset-4 hover:underline transition-colors"
          >
            Terms of Use
          </Link>
          <span>·</span>
          <Link
            to="/cookies"
            className="underline-offset-4 hover:underline transition-colors"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

