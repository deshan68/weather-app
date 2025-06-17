import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Toaster } from "sonner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen mx-auto max-w-5xl bg-background px-4">
      <Navbar />
      <main>{children}</main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
