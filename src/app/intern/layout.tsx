"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/intern/layout/sidebar";

export default function InternLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/intern/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
