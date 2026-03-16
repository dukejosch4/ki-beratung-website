"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Users,
  LayoutDashboard,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/intern/leads", label: "Leads", icon: Users },
  { href: "/intern/search", label: "Suche", icon: Search },
  { href: "/intern/pipeline", label: "Pipeline", icon: LayoutDashboard },
  { href: "/intern/stats", label: "Statistik", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navContent = (
    <>
      <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">
        <Link href="/intern/leads" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/veqtis-icon.png" alt="" className="h-5 invert" />
          <span className="text-base font-semibold text-white tracking-tight">
            veqtis
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            intern
          </span>
        </Link>
        <button onClick={() => setOpen(false)} className="lg:hidden text-white/40 p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
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
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-black/90 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-4">
        <Link href="/intern/leads" className="flex items-center gap-2">
          <img src="/veqtis-icon.png" alt="" className="h-4 invert" />
          <span className="text-sm font-semibold text-white">veqtis</span>
          <span className="text-[9px] uppercase tracking-[0.15em] text-white/40">intern</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-white/60 p-1">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — desktop: always visible, mobile: slide-in drawer */}
      <aside
        className={`fixed top-0 bottom-0 w-60 bg-black border-r border-white/[0.08] flex flex-col z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
