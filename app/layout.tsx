import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import ThemeSwitch from "../components/ThemeSwitch";

export const metadata: Metadata = {
  title: "Parlios — Hub IA & Mouvement",
  description:
    "Parlios aide les entrepreneurs à optimiser leur temps et leur business avec une IA simple, humaine et utile."
};

function NavLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-zinc-700 hover:text-zinc-900 hover:font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <div className="border-b border-zinc-200 bg-white/90 backdrop-blur">
          <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/parlios-logo.png"
                alt="Parlios"
                className="h-8 w-auto"
              />
              <span className="text-sm font-semibold tracking-tight text-zinc-900">
                Parlios
              </span>
            </Link>

            <nav className="flex items-center gap-4 text-sm ml-6">
              <NavLink href="/hub">Hub</NavLink>
              <NavLink href="/projet-parlios">Projet</NavLink>
              <NavLink href="/outils">Boîte à outils</NavLink>
              <NavLink href="/application">Application</NavLink>
              <NavLink href="/communaute">Communauté</NavLink>
              <NavLink href="/actualites">Actualités</NavLink>
              <NavLink href="/temoignages-impact">Impact</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>

            <div className="ml-auto">
              <ThemeSwitch />
            </div>
          </header>
        </div>

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
