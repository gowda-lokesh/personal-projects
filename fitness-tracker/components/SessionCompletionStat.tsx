"use client"

import { useEffect } from "react"

export default function SessionCompletionStat() {
  useEffect(() => {
    const update = () => {
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
      const nextLabel = "Completed exercises"
      const nextValue = `${completed} / ${exercises}`

      // Avoid writing identical text back into the DOM. Otherwise the observer
      // would observe its own mutations and continuously rerun this function.
      if (label?.textContent !== nextLabel) label!.textContent = nextLabel
      if (value?.textContent !== nextValue) value!.textContent = nextValue
    }

    update()
    const observer = new MutationObserver(update)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
