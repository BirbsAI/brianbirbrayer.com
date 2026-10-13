import { CommandPalette, PaletteButton } from "@/components/CommandPalette";
import { Reveal } from "@/components/Reveal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { sections, site } from "@/content/site";

const card = "rounded-xl border border-zinc-200 bg-white/70 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60";
const chip = "rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-xs dark:border-zinc-800 dark:bg-zinc-800/60";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-12">
      <Reveal>
        <h2 id={`${id}-title`} className="mb-6 font-mono text-sm uppercase tracking-widest text-accent">
          <span aria-hidden className="text-zinc-400">## </span>{title}
        </h2>
        {children}
      </Reveal>
    </section>
  );
}

export default function Home() {
  const { links, education: edu } = site;
  const socials = [
    { label: "Email", href: `mailto:${links.email}` },
    { label: "LinkedIn", href: links.linkedin },
    { label: "GitHub", href: links.github },
    { label: "birbs.ai", href: links.website },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <CommandPalette />

      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80">
        <nav aria-label="Primary" className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="text-accent">~/</span>birbs
          </a>
          <ul className="hidden gap-5 text-sm md:flex">
            {sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`} className="hover:text-accent">{s.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <PaletteButton />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-4xl px-5">
        {/* Hero */}
        <section id="top" className="grid items-center gap-10 pb-8 pt-16 md:grid-cols-[1.1fr_1fr] md:pt-24">
          <div>
            <p className="font-mono text-sm text-accent">Hi, I’m</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {site.name}
            </h1>
            <p className="mt-3 text-lg">
              {site.title} <span className="text-zinc-400">·</span>{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">{site.tagline}</span>
            </p>
            <p className="mt-2 text-sm text-zinc-500">{site.location}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.resumePdf} download className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                Download résumé ↓
              </a>
              <a href={`mailto:${links.email}`} className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:border-accent dark:border-zinc-700">
                Get in touch
              </a>
            </div>
          </div>

          <figure aria-label="Profile as code" className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-[13px] leading-relaxed text-zinc-300 shadow-xl">
            <div className="flex items-center gap-1.5 border-b border-zinc-800 px-4 py-2.5">
              <span className="size-3 rounded-full bg-red-500/80" /><span className="size-3 rounded-full bg-yellow-500/80" /><span className="size-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-zinc-500">birbs.ts</span>
            </div>
            <pre className="overflow-x-auto p-4"><code>
<span className="text-sky-400">const</span> <span className="text-emerald-300">birbs</span> = {"{"}{"\n"}
{"  "}name: <span className="text-amber-300">&quot;{site.name}&quot;</span>,{"\n"}
{"  "}role: <span className="text-amber-300">&quot;{site.title}&quot;</span>,{"\n"}
{"  "}stack: [<span className="text-amber-300">&quot;C#&quot;</span>, <span className="text-amber-300">&quot;.NET&quot;</span>, <span className="text-amber-300">&quot;TypeScript&quot;</span>, <span className="text-amber-300">&quot;Python&quot;</span>],{"\n"}
{"  "}education: <span className="text-amber-300">&quot;B.S. CS @ MSOE&quot;</span>,{"\n"}
{"  "}focus: <span className="text-amber-300">&quot;AI / ML&quot;</span>,{"\n"}
{"  "}shipping: <span className="text-sky-400">true</span>,{"\n"}
{"}"};<span className="caret" />
            </code></pre>
          </figure>
        </section>

        <Section id="about" title="About">
          <p className="max-w-prose text-lg leading-relaxed">{site.summary}</p>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="relative space-y-8 border-l border-zinc-200 pl-6 dark:border-zinc-800">
            {site.experience.map((job) => (
              <li key={job.role + job.period} className="relative">
                <span aria-hidden className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-accent ring-4 ring-zinc-50 dark:ring-zinc-950" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{job.role} · {job.company}</h3>
                  <span className="font-mono text-sm text-zinc-500">{job.period}</span>
                </div>
                <p className="text-sm text-zinc-500">{job.via}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
                  {job.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects">
          {site.projects.map((p) => (
            <article key={p.name} className={card}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{p.name} ↗</a>
                </h3>
                <span className="font-mono text-sm text-zinc-500">{p.kind}</span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
                {p.stack.map((s) => <li key={s} className={chip}>{s}</li>)}
              </ul>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-accent">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </article>
          ))}
        </Section>

        <Section id="skills" title="Skills">
          <dl className="grid gap-4 sm:grid-cols-2">
            {site.skills.map((g) => (
              <div key={g.group} className={card}>
                <dt className="mb-3 font-mono text-sm text-zinc-500">{g.group}</dt>
                <dd><ul className="flex flex-wrap gap-2">{g.items.map((i) => <li key={i} className={chip}>{i}</li>)}</ul></dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <div className={card}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{edu.degree} — {edu.school}</h3>
              <span className="font-mono text-sm text-zinc-500">{edu.period}</span>
            </div>
            <p className="mt-3"><strong className="font-medium text-zinc-900 dark:text-zinc-100">AI / Machine Learning focus:</strong> {edu.focus}</p>
            <p className="mt-4 font-mono text-sm text-zinc-500">Relevant coursework</p>
            <ul className="mt-2 flex flex-wrap gap-2">{edu.coursework.map((c) => <li key={c} className={chip}>{c}</li>)}</ul>
            <p className="mt-4 text-sm">{edu.extras.join(" · ")}</p>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className={`${card} font-mono text-sm`}>
            <p><span className="text-accent">❯</span> contact --birbs</p>
            <ul className="mt-3 space-y-1.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <span className="inline-block w-24 text-zinc-500">{s.label}</span>
                  <a href={s.href} className="underline decoration-accent/50 underline-offset-4 hover:text-accent" {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {s.href.replace(/^(mailto:|https?:\/\/(www\.)?)/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>

      <footer className="mx-auto max-w-4xl px-5 py-10 font-mono text-xs text-zinc-500">
        © {new Date().getFullYear()} {site.name}. Built with Next.js, TypeScript & Tailwind · Press <kbd>⌘K</kbd>.
      </footer>
    </>
  );
}
