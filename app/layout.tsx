import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthorProfile } from "@/components/AuthorProfile";
import { ViewTransitions } from "@/components/ViewTransitions";
import { ShootingStars } from "@/components/ShootingStars";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Rushiraj Gadhvi",
  description: "AI Researcher, Developer, Design Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Halant:wght@400;600&family=Figtree:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/academicons/1.9.4/css/academicons.min.css" />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="preload" href="/arrow.svg" as="image" type="image/svg+xml" />
        <link rel="prefetch" href="/files/RushirajGadhviCV.pdf" as="document" />
        {/* anti-flash: apply saved theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){if(localStorage.getItem('theme')==='dark')document.documentElement.setAttribute('data-theme','dark');})();
        `}} />
        <GoogleAnalytics />
      </head>
      <body>
        <ShootingStars />
        <ThemeToggle />
        <ViewTransitions />
        <div className="page-wrapper">
          <div id="main">
            <aside className="sidebar sticky">
              <AuthorProfile />
            </aside>
            <div id="sidebar-line" className="sidebar-line" />
            <main className="main-content">
              {children}
            </main>
          </div>
</div>
      </body>
    </html>
  );
}
