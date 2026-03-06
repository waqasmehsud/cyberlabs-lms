"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>CYBERLABS — Security Learning Platform</title>
        <meta name="description" content="Master cybersecurity with hands-on labs, courses, and CTF challenges on the CYBERLABS learning platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main wrapper — offset for sidebar on desktop */}
        <div
          style={{
            marginLeft: 0,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
          className="lg-main-offset"
        >
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Page content */}
          <main
            style={{
              flex: 1,
              paddingTop: "var(--topbar-height)",
            }}
          >
            {children}
          </main>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .lg-main-offset {
              margin-left: var(--sidebar-width) !important;
            }
            header {
              padding-left: calc(20px) !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
