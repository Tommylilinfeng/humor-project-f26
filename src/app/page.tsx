import { supabase } from "@/lib/supabase";
import type { Caption } from "@/lib/types";

// Re-fetch from Supabase at most once a minute instead of baking the rows in
// at build time.
export const revalidate = 60;

export default async function Home() {
  const { data, error } = await supabase
    .from("captions")
    .select("id, text, flavor, context, upvotes, downvotes, created_at")
    .order("created_at", { ascending: false })
    .returns<Caption[]>();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-24">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Designing for GenAI · Fall 2026
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Caption board
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Every caption below is a row in Supabase, fetched on the server and
          rendered here. Voting comes later — this week is just the read path.
        </p>
      </header>

      {error ? (
        <ErrorCard message={error.message} />
      ) : !data || data.length === 0 ? (
        <EmptyCard />
      ) : (
        <>
          <p className="mt-12 font-mono text-xs uppercase tracking-widest text-neutral-500">
            {data.length} captions
          </p>
          <ul className="mt-4 space-y-3">
            {data.map((caption) => (
              <CaptionCard key={caption.id} caption={caption} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

function CaptionCard({ caption }: { caption: Caption }) {
  const score = caption.upvotes - caption.downvotes;

  return (
    <li className="rounded-xl border border-neutral-200 p-5 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
      <div className="flex items-start justify-between gap-6">
        <p className="text-lg leading-snug">{caption.text}</p>
        <div className="shrink-0 text-right">
          <div className="text-lg font-semibold tabular-nums">
            {score > 0 ? `+${score}` : score}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            score
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-500">
        <span className="rounded-full border border-neutral-200 px-2.5 py-0.5 font-mono uppercase tracking-wider dark:border-neutral-800">
          {caption.flavor}
        </span>
        {caption.context && <span>{caption.context}</span>}
        <span className="ml-auto tabular-nums">
          {caption.upvotes} up · {caption.downvotes} down
        </span>
      </div>
    </li>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="mt-12 rounded-xl border border-red-300 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/40">
      <h2 className="font-medium text-red-900 dark:text-red-200">
        Could not load captions
      </h2>
      <p className="mt-2 font-mono text-sm text-red-800 dark:text-red-300">
        {message}
      </p>
      <p className="mt-3 text-sm text-red-800/80 dark:text-red-300/80">
        Usually this means the table does not exist yet, or its row-level
        security policy does not allow reads with the anon key.
      </p>
    </div>
  );
}

function EmptyCard() {
  return (
    <div className="mt-12 rounded-xl border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-700">
      <p className="text-neutral-600 dark:text-neutral-400">
        The <code className="font-mono">captions</code> table is empty.
      </p>
    </div>
  );
}
