import type { Metadata } from "next";
import "./globals.css";
import ParliosMainNav from "../components/layout/ParliosMainNav";

export const metadata: Metadata = {
  title: "Parlios",
  description: "Parlios · Hub IA, outils gratuits et mouvement pour entrepreneurs.",
};

import ThemeSwitch from "../components/ThemeSwitch";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <ParliosMainNav />
        <main className="min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}

