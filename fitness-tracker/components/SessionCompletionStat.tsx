"use client"

import { useEffect } from "react"

export default function SessionCompletionStat() {
  useEffect(() => {
    const update = () => {
      const stats = document.querySelector(".stats")
      if (!stats) return

      const cards = stats.querySelectorAll<HTMLElement>(":scope > .card")
      const card = cards[2]
      if (!card) return

      const exercises = document.querySelectorAll(".exercise").length
      const completed = document.querySelectorAll(".exerciseDone").length
      const label = card.querySelector<HTMLElement>(".muted")
      const value = card.querySelector<HTMLElement>(".stat")

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
