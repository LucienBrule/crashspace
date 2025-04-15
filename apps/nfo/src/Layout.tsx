

import React from 'react';
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <ThemeToggle />
      {children}
    </div>
  );
}