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
    <div className="min-h-screen lg:pl-60">
      <div className="bg-grid min-h-screen">
        {/* Header — offset below mobile top bar on small screens */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5 mt-14 lg:mt-0">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-white truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-white/40 mt-1 truncate">{subtitle}</p>
              )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        </header>
        <main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">{children}</main>
      </div>
    </div>
  );
}
