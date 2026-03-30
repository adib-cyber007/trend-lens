"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const tabs = [
  { name: "Dashboard", href: "/" },
  { name: "Predictions", href: "/predictions" },
  { name: "Data Upload", href: "/data-upload" },
  { name: "Reports", href: "/reports" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="topnav h-14 flex items-center justify-between px-6 sticky top-0 z-20">
      <nav className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          return (
            <motion.button
              key={tab.name}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push(tab.href)}
              className={`nav-tab ${isActive ? "active" : ""}`}
            >
              {tab.name}
            </motion.button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[#9b97b0] font-medium">Acme Corp</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f97316] to-[#8b5cf6] flex items-center justify-center"
        >
          <User className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </header>
  );
}
