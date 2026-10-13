"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sections, site } from "@/content/site";
import { toggleTheme } from "./ThemeToggle";

type Command = { id: string; label: string; hint: string; run: () => void };

const go = (id: string) => document.getElementById(id)?.scrollIntoView();
const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = sections.map((s) => ({ id: `go-${s.id}`, label: `Go to ${s.label}`, hint: `cd ~/${s.id}`, run: () => go(s.id) }));
    list.push(
      { id: "resume", label: "Download resume (PDF)", hint: "curl -O resume.pdf", run: () => open(site.resumePdf) },
      { id: "email", label: "Send an email", hint: "mail", run: () => { window.location.href = `mailto:${site.links.email}`; } },
      { id: "linkedin", label: "Open LinkedIn", hint: "open", run: () => open(site.links.linkedin) },
      { id: "birbs", label: "Visit birbs.ai", hint: "open", run: () => open(site.links.website) },
      { id: "theme", label: "Toggle theme", hint: "theme --toggle", run: toggleTheme },
    );
    if (site.links.github) { const gh = site.links.github; list.push({ id: "github", label: "Open GitHub", hint: "open", run: () => open(gh) }); }
    return list;
  }, []);

  const filtered = commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(query.toLowerCase()));

  const close = useCallback(() => { setOpen(false); setQuery(""); setActive(0); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-palette", onOpen); };
  }, [close]);

  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  if (!isOpen) return null;

  const runAt = (i: number) => { const c = filtered[i]; if (c) { close(); c.run(); } };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white font-mono shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center gap-2 border-b border-zinc-200 px-4 dark:border-zinc-800">
          <span className="text-accent" aria-hidden>❯</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              else if (e.key === "Enter") runAt(active);
            }}
            placeholder="Type a command…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400"
          />
          <kbd className="text-xs text-zinc-400">esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2 text-sm">
          {filtered.length === 0 && <li className="px-3 py-2 text-zinc-500">command not found: {query}</li>}
          {filtered.map((c, i) => (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => runAt(i)}
              className={`flex cursor-pointer justify-between rounded-md px-3 py-2 ${i === active ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
            >
              <span>{c.label}</span>
              <span className="text-zinc-400">{c.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-palette"))}
      className="hidden items-center gap-2 rounded-md border border-zinc-300 px-3 py-1.5 font-mono text-xs text-zinc-500 hover:border-accent sm:flex dark:border-zinc-700"
    >
      Search <kbd className="rounded bg-zinc-200 px-1.5 dark:bg-zinc-800">⌘K</kbd>
    </button>
  );
}
