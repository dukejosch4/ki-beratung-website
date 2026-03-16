interface PageShellProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function PageShell({
  title,
  subtitle,
  action,
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen pl-60">
      <div className="bg-grid min-h-screen">
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">{title}</h1>
              {subtitle && (
                <p className="text-sm text-white/40 mt-1">{subtitle}</p>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
        </header>
        <main className="px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
