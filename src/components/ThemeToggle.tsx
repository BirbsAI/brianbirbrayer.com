"use client";

export function toggleTheme() {
  const dark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", dark);
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="rounded-md border border-zinc-300 p-2 text-sm hover:border-accent dark:border-zinc-700"
    >
      <span aria-hidden className="dark:hidden">☾</span>
      <span aria-hidden className="hidden dark:inline">☀</span>
    </button>
  );
}
