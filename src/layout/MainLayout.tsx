import Navbar from "@/components/navbar/Navbar";
import WeatherBackground from "@/components/weather/WeatherBackground";
import { useTheme } from "@/providers/ThemeProvider";
import React from "react";
import { Toaster } from "sonner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen mx-auto max-w-5xl px-4">
      <Navbar />
      {theme === "weather" && <WeatherBackground />}
      <main>{children}</main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
