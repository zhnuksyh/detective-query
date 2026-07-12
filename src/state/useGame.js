import { useCallback, useEffect, useState } from 'react'
import { loadState, saveState, resetState } from '../engine/storage.js'

/**
 * Top-level game state: which screen we're on, the persisted save, and the
 * currently open case. Persistence is transparent — any mutation via the
 * returned helpers writes through to localStorage.
 */
export function useGame() {
  const [screen, setScreen] = useState('menu') // 'menu' | 'levels' | 'options' | 'credits' | 'game'
  const [openCaseId, setOpenCaseId] = useState(null)
  const [save, setSave] = useState(() => loadState())

  useEffect(() => {
    saveState(save)
  }, [save])

  const patch = useCallback((updater) => {
    setSave((prev) => (typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }))
  }, [])

  const openCase = useCallback(
    (caseId) => {
      setOpenCaseId(caseId)
      patch((s) => ({ ...s, lastCaseId: caseId }))
      setScreen('game')
    },
    [patch],
  )

  const markSolved = useCallback(
    (caseId) => {
      patch((s) =>
        s.solvedCases.includes(caseId)
          ? s
          : { ...s, solvedCases: [...s.solvedCases, caseId] },
      )
    },
    [patch],
  )

  const setNotebook = useCallback(
    (caseId, text) => {
      patch((s) => ({ ...s, notebooks: { ...s.notebooks, [caseId]: text } }))
    },
    [patch],
  )

  const setUnlocks = useCallback(
    (caseId, unlockedArray) => {
      patch((s) => ({ ...s, unlocks: { ...s.unlocks, [caseId]: unlockedArray } }))
    },
    [patch],
  )

  const setSettings = useCallback(
    (partial) => {
      patch((s) => ({ ...s, settings: { ...s.settings, ...partial } }))
    },
    [patch],
  )

  const hardReset = useCallback(() => {
    setSave(resetState())
    setOpenCaseId(null)
    setScreen('menu')
  }, [])

  return {
    screen,
    setScreen,
    openCaseId,
    openCase,
    save,
    markSolved,
    setNotebook,
    setUnlocks,
    setSettings,
    hardReset,
  }
}
