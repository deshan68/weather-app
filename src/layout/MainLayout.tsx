import Navbar from "@/components/navbar/Navbar";
import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen mx-auto max-w-4xl bg-background px-4 md:px-0">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
