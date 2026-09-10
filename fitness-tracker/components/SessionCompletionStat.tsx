"use client"

import { useEffect } from "react"

export default function SessionCompletionStat() {
  useEffect(() => {
    const update = () => {
      // Only target the strength-session stats row, not the Progress tab stats.
      const stats = Array.from(document.querySelectorAll<HTMLElement>(".stats"))
        .find(el => el.textContent?.includes("Logged sets"))
      if (!stats) return

      const cards = stats.querySelectorAll<HTMLElement>(":scope > div")
      const card = cards[3]
      if (!card) return

      const section = stats.closest("section")
      const exercises = section?.querySelectorAll(".exerciseCard").length ?? 0
      const completed = section?.querySelectorAll(".exerciseDone").length ?? 0
      const label = card.querySelector<HTMLElement>("span")
      const value = card.querySelector<HTMLElement>("strong")

      if (label) label.textContent = "Completed exercises"
      if (value) value.textContent = `${completed} / ${exercises}`
    }

    update()
    const observer = new MutationObserver(update)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
