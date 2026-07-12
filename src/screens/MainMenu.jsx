import { useState } from 'react'
import { CASES } from '../cases/index.js'

const MENU = [
  { key: 'new', label: 'NEW GAME', desc: 'Open Case 01 and begin the investigation.' },
  { key: 'continue', label: 'CONTINUE', desc: 'Resume from your last opened case file.' },
  { key: 'options', label: 'OPTIONS', desc: 'Sound, text scaling, CRT theme.' },
  { key: 'credits', label: 'CREDITS', desc: 'Attributions and contributors.' },
  { key: 'more', label: 'MORE GAMES', desc: 'External links to other works.' },
]

export default function MainMenu({ game }) {
  const [hover, setHover] = useState(0)
  const { save } = game

  const handle = (key) => {
    switch (key) {
      case 'new':
        game.openCase(CASES[0].id)
        break
      case 'continue':
        game.openCase(save.lastCaseId || CASES[0].id)
        break
      case 'options':
        game.setScreen('options')
        break
      case 'credits':
        game.setScreen('credits')
        break
      case 'more':
        window.open('https://github.com/zhnuksyh', '_blank', 'noopener')
        break
      default:
        break
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        {/* Terminal header */}
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            <span className="h-2 w-2 animate-flicker rounded-full bg-teal" />
            bureau of digital forensics // secure terminal
          </div>
          <h1 className="font-display text-5xl font-black leading-none tracking-tight text-zinc-100 sm:text-6xl">
            DEDUCTIVE<span className="text-crimson">_</span>QUERY
          </h1>
          <p className="mt-3 max-w-md text-sm text-zinc-500">
            Field agents upload the evidence. You write the SQL. The database never lies —
            find where a suspect does.
          </p>
        </div>

        {/* Boot lines */}
        <pre className="mb-6 select-none text-[11px] leading-relaxed text-teal/70">
{`> mounting evidence volumes .......... [ OK ]
> sql.js runtime (wasm) .............. [ READY ]
> cases indexed: ${CASES.length}  solved: ${save.solvedCases.length}
> awaiting analyst input_`}
          <span className="ml-0.5 inline-block h-3 w-2 animate-blink bg-teal align-middle" />
        </pre>

        {/* Menu */}
        <ul className="space-y-1">
          {MENU.map((item, i) => (
            <li key={item.key}>
              <button
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={() => handle(item.key)}
                className={`group flex w-full items-center justify-between border-l-2 px-4 py-3 text-left transition-colors ${
                  hover === i
                    ? 'border-crimson bg-zinc-900 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:bg-zinc-900/50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`text-crimson ${hover === i ? 'opacity-100' : 'opacity-0'}`}>
                    &gt;
                  </span>
                  <span className="font-display text-lg tracking-wide">{item.label}</span>
                </span>
                <span className="hidden text-[11px] text-zinc-500 sm:block">{item.desc}</span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-zinc-700">
          FILE_01 // v0.1 // all data fictional
        </p>
      </div>
    </div>
  )
}
