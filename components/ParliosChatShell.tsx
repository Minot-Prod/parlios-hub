"use client";

import * as React from "react";

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  content: string;
};

type Props = {
  onThinkingChange?: (thinking: boolean) => void;
};

export default function ParliosChatShell({ onThinkingChange }: Props) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "m-0",
      role: "assistant",
      content:
        "Bienvenue sur Parlios · Hub IA. Décris ce que tu veux optimiser, je lance la fourmilière d'agents.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isThinking, setIsThinking] = React.useState(false);

  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isThinking]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: "u-" + Date.now(), role: "user", content: text },
    ]);
    setInput("");

    setIsThinking(true);
    onThinkingChange?.(true);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    setMessages((prev) => [
      ...prev,
      {
        id: "a-" + Date.now(),
        role: "assistant",
        content:
          "Réponse simulée pour l'instant. Bientôt, cette zone sera branchée sur ton LLM Parlios + tous tes outils (Base44, Sync, n8n, etc.).",
      },
    ]);

    setIsThinking(false);
    onThinkingChange?.(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-[32px] border border-slate-800 bg-slate-900/80 shadow-[0_0_80px_rgba(56,189,248,0.35)] backdrop-blur-2xl overflow-hidden">
      {/* Header avec avatar Parlios */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-slate-800/70 bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-emerald-400 to-violet-500 shadow-[0_0_24px_rgba(56,189,248,0.9)] flex items-center justify-center">
            <span className="text-[0.7rem] font-black tracking-[0.2em] text-slate-950">
              P
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
              PARLIOS · CORE CHAT
            </p>
            <p className="text-[0.7rem] text-slate-400">
              Interface principale · Mémoire perso + démo publique plus tard
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[0.65rem]">
          {isThinking ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 border border-sky-500/70 px-3 py-1 text-sky-100">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>Les agents s'activent…</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/60 px-3 py-1 text-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Prêt</span>
            </span>
          )}
        </div>
      </header>

      {/* Zone de chat */}
      <div className="flex flex-col">
        <div
          ref={listRef}
          className="max-h-[380px] min-h-[220px] overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/40"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  m.role === "user"
                    ? "bg-sky-500 text-slate-950 px-3.5 py-2.5 rounded-2xl rounded-br-sm max-w-[80%] text-sm shadow-lg"
                    : "bg-slate-800/90 border border-slate-700 px-3.5 py-2.5 rounded-2xl rounded-bl-sm max-w-[80%] text-sm text-slate-50 shadow-lg"
                }
              >
                {m.content}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-2 rounded-2xl text-[0.75rem] text-slate-200">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Parlios prépare une réponse…</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-800/80 bg-slate-950/80 px-5 py-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Ex: "Planifie ma semaine autour de Parlios et de mes clients Sync."'
                className="flex-1 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || isThinking}
                className="rounded-2xl bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-[0_0_16px_rgba(56,189,248,0.8)] hover:bg-sky-400 transition disabled:opacity-60 disabled:shadow-none"
              >
                Envoyer
              </button>
            </div>
            <div className="flex items-center justify-between text-[0.65rem] text-slate-500">
              <span>Cette fenêtre deviendra ton “ChatGPT Parlios” perso + version démo.</span>
              <span className="hidden md:inline">Enter pour envoyer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
