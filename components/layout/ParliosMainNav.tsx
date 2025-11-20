"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const links = [
  { href: "/", label: "Hub" },
  { href: "/projet-parlios", label: "Projet" },
  { href: "/outils", label: "Boîte à outils" },
  { href: "/application", label: "Application" },
  { href: "/communaute", label: "Communauté" },
  { href: "/actualites", label: "Actualités" },
  { href: "/temoignages-impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ParliosMainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-emerald-400 to-violet-500 shadow-[0_0_18px_rgba(56,189,248,0.8)]">
            <span className="text-[0.7rem] font-black tracking-[0.2em] text-slate-950">
              P
            </span>
          </div>
          <div className="hidden flex-col leading-tight md:flex">
            <span className="text-xs font-semibold text-slate-100">
              Parlios
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
              Hub IA & Mouvement
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 text-xs font-medium text-slate-300 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" &&
                pathname.startsWith(link.href) &&
                link.href !== "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={classNames(
                  "rounded-full px-3 py-1 transition",
                  active
                    ? "bg-sky-500/15 text-sky-100 border border-sky-400/70"
                    : "text-slate-300 hover:text-sky-100 hover:bg-slate-900/80 border border-transparent"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
