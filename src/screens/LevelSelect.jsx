import { ChevronLeft, Lock } from 'lucide-react'
import { CASES, isCaseUnlocked } from '../cases/index.js'

export default function LevelSelect({ game }) {
  const { save } = game

  return (
    <div className="flex h-full w-full flex-col">
      {/* Top bar — "Menu" button placed exactly where the case page shows "‹ FILES". */}
      <header className="px-6 py-4">
        <div className="mx-auto w-full max-w-4xl">
          <button
            onClick={() => game.setScreen('menu')}
            className="flex items-center gap-1 text-[11px] uppercase tracking-[0.3em] text-zinc-500 hover:text-zinc-100"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
            menu
          </button>
        </div>
      </header>

      {/* Cabinet: folders centred in the row. */}
      <div className="flex flex-1 items-stretch justify-center gap-3 overflow-x-auto px-6 pb-6">
        {CASES.map((c, i) => {
          const unlocked = isCaseUnlocked(c.id, save.solvedCases)
          const solved = save.solvedCases.includes(c.id)
          return (
            <Folder
              key={c.id}
              c={c}
              index={i}
              unlocked={unlocked}
              solved={solved}
              onOpen={() => unlocked && game.openCase(c.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

function Folder({ c, index, unlocked, solved, onOpen }) {
  if (!unlocked) {
    return (
      <div className="flex w-56 shrink-0 cursor-not-allowed flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-6">
        <Lock className="h-7 w-7 text-zinc-700" strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <button
      onClick={onOpen}
      style={{ marginTop: `${(index % 3) * 14}px` }}
      className="group relative flex w-56 shrink-0 flex-col justify-between rounded-2xl border border-zinc-700 bg-zinc-800 px-5 py-5 text-left text-zinc-200 transition-transform hover:-translate-y-2 hover:border-zinc-500 focus:-translate-y-2"
    >
      {/* Status chip */}
      <div className="mb-4 flex items-start justify-end">
        <span
          className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${
            solved
              ? 'bg-zinc-200 text-zinc-900'
              : 'border border-zinc-600 text-zinc-400'
          }`}
        >
          {solved ? 'CLOSED' : 'UNRESOLVED'}
        </span>
      </div>

      <div>
        <div className="mb-1 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          FILE_{c.id.split('_')[1]}//
        </div>
        <h3 className="text-xl font-semibold leading-tight text-zinc-100">{c.title}</h3>
        <p className="mt-2 text-[11px] leading-snug text-zinc-400">{c.teaser}</p>
      </div>

      <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
        open file &rarr;
      </div>
    </button>
  )
}
