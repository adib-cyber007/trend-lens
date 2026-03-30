import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import PulseAIChat from "@/components/chat/PulseAIChat";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Digital Pulse — Real-Time Trend Intelligence",
  description:
    "AI-powered trend radar, viral forecasting, and campaign simulation platform for brands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Background gradient mesh */}
        <div className="bg-gradient-mesh" />

        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="ml-60 mr-0 xl:mr-[340px] relative z-10 min-h-screen flex flex-col">
          <TopNav />
          <main className="flex-1 p-6">{children}</main>
        </div>

        {/* Pulse AI Chat */}
        <PulseAIChat />
      </body>
    </html>
  );
}
