export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-3xl px-6 py-6 space-y-2 text-xs text-muted-foreground">
        <p>PlainDocs provides general information, not legal advice.</p>
        <div className="flex items-center justify-between gap-3">
          <p>© 2026 TechBees</p>
          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </footer>
  );
}
