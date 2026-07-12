import { case01 } from './case01.js'

/**
 * Cases 02–05 are locked placeholders for now. They carry enough metadata to
 * render the filing-cabinet folders (code, tag, teaser, theme) but no playable
 * schema yet. Themes/tags mirror the GRID DAILY reference: DRIFT, FALLING,
 * FALLING, SIGNAL, AFTER WORK.
 */
const lockedStub = (over) => ({
  status: 'UNRESOLVED',
  locked: true,
  crimeScene: null,
  schemaSql: null,
  erd: null,
  report: null,
  ...over,
})

export const CASES = [
  case01,
  lockedStub({
    id: 'case_02',
    code: 'CODE_02',
    tag: 'PLACEHOLDER',
    title: 'CASE TWO',
    folderTheme: 'fall',
    teaser: 'Placeholder case — coming soon.',
  }),
  lockedStub({
    id: 'case_03',
    code: 'CODE_03',
    tag: 'PLACEHOLDER',
    title: 'CASE THREE',
    folderTheme: 'fall',
    teaser: 'Placeholder case — coming soon.',
  }),
  lockedStub({
    id: 'case_04',
    code: 'CODE_04',
    tag: 'PLACEHOLDER',
    title: 'CASE FOUR',
    folderTheme: 'signal',
    teaser: 'Placeholder case — coming soon.',
  }),
  lockedStub({
    id: 'case_05',
    code: 'CODE_05',
    tag: 'PLACEHOLDER',
    title: 'CASE FIVE',
    folderTheme: 'work',
    teaser: 'Placeholder case — coming soon.',
  }),
]

export function getCase(id) {
  return CASES.find((c) => c.id === id) || null
}

/** A case is unlocked if it's case_01 or the previous case has been solved. */
export function isCaseUnlocked(caseId, solvedCases) {
  // TEMP: unlock every case so all folders are visible during layout work.
  // Restore the progression logic below when cases 02–05 are built.
  return true
  // eslint-disable-next-line no-unreachable
  const idx = CASES.findIndex((c) => c.id === caseId)
  if (idx <= 0) return true
  return solvedCases.includes(CASES[idx - 1].id)
}
