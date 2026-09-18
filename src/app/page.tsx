export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Designing for GenAI · Fall 2026
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          Hello, world.
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Week 1 deliverable. A Next.js app on Vercel, deploying straight from
          GitHub. Everything after this gets built on top of it.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-4 dark:border-neutral-800 dark:bg-neutral-800">
          {[
            ["Framework", "Next.js"],
            ["Styling", "Tailwind"],
            ["Host", "Vercel"],
            ["Data", "Supabase"],
          ].map(([label, value]) => (
            <div key={label} className="bg-background px-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                {label}
              </dt>
              <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
