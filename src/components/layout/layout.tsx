
import React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}

export function Layout({ children, className, hideFooter = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      {!hideFooter && <Footer />}
      <Toaster />
    </div>
  );
}

export default Layout;
