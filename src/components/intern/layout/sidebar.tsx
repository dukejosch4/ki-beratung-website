"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Users,
  LayoutDashboard,
  BarChart3,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/intern/leads", label: "Leads", icon: Users },
  { href: "/intern/search", label: "Suche", icon: Search },
  { href: "/intern/pipeline", label: "Pipeline", icon: LayoutDashboard },
  { href: "/intern/stats", label: "Statistik", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-black border-r border-white/[0.08] flex flex-col z-40">
      <div className="px-6 py-6 border-b border-white/[0.08]">
        <Link href="/intern/leads" className="block">
          <span className="text-lg font-semibold text-white tracking-tight">
            veqtis
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-2">
            intern
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "text-white bg-white/[0.06]"
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.08]">
        <button
          onClick={async () => {
            await fetch("/api/intern/auth", { method: "DELETE" });
            window.location.href = "/intern/login";
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/60 hover:bg-white/[0.03] transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}
