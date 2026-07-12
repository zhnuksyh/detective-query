/**
 * A "CASE CLOSED" rubber-stamp badge — rotated, distressed-ink look. Used on
 * solved level cards (bottom-right) and on a correctly submitted report card
 * (top-right, overlapping the text). Sizing via the `className` on the wrapper.
 */
export default function CaseStamp({ className = '', rotate = -14 }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <div className="rounded-md border-[3px] border-crimson/80 px-3 py-1.5 text-center opacity-90 mix-blend-screen">
        <div className="font-display text-sm font-black uppercase leading-none tracking-[0.2em] text-crimson/90">
          Case
        </div>
        <div className="font-display text-lg font-black uppercase leading-none tracking-[0.15em] text-crimson/90">
          Closed
        </div>
      </div>
    </div>
  )
}
