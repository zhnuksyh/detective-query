/**
 * Folder-style tabs matching the reference: rounded-top trapezoids with angled
 * sides. The active tab is black with a white outline and NO bottom edge, so it
 * merges into the bordered content card below it (see GameDashboard). Inactive
 * tabs are white with gray text.
 *
 * The angled + rounded shape is drawn with an inline SVG background per tab so
 * the outline can follow the trapezoid exactly (clip-path can't stroke a border).
 */
export default function TabBar({ tabs, active, onSelect }) {
  return (
    <div className="flex items-end gap-1.5 px-4">
      {tabs.map((t) => (
        <Tab key={t.key} tab={t} isActive={t.key === active} onSelect={onSelect} />
      ))}
    </div>
  )
}

function Tab({ tab, isActive, onSelect }) {
  return (
    <button
      onClick={() => onSelect(tab.key)}
      className={`tab-shape relative px-8 pb-3 pt-3 font-display text-xs font-bold tracking-widest transition-colors ${
        isActive ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-700'
      }`}
      data-active={isActive}
    >
      {tab.label}
    </button>
  )
}
