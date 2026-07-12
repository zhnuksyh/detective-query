import { case01 } from './case01.js'
import { case02 } from './case02.js'
import { case03 } from './case03.js'

/**
 * Case 04 is a "coming soon" placeholder — it renders as a folder but has no
 * playable schema yet. `comingSoon` marks it for the level-select card.
 */
const lockedStub = (over) => ({
  locked: true,
  crimeScene: null,
  schemaSql: null,
  erd: null,
  report: null,
  ...over,
})

export const CASES = [
  case01,
  case02,
  case03,
  lockedStub({
    id: 'case_04',
    code: 'CODE_04',
    tag: 'SIGNAL',
    title: 'Dead Signal',
    folderTheme: 'signal',
    teaser: 'The last text was sent at 02:14. His phone was already off the grid at 01:50.',
    comingSoon: true,
  }),
]

export function getCase(id) {
  return CASES.find((c) => c.id === id) || null
}

/** A case is unlocked if it's case_01 or the previous case has been solved. */
export function isCaseUnlocked(caseId, solvedCases) {
  const idx = CASES.findIndex((c) => c.id === caseId)
  if (idx <= 0) return true
  return solvedCases.includes(CASES[idx - 1].id)
}
