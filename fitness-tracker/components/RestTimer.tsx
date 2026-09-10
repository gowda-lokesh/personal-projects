"use client"

import { useEffect, useState } from "react"
import { Timer, X } from "lucide-react"

const PRESETS = [60, 90, 120, 180]

export default function RestTimer() {
  const [open, setOpen] = useState(false)
  const [seconds, setSeconds] = useState(90)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running || seconds <= 0) return
    const id = window.setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [running, seconds])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const label = `${mins}:${secs.toString().padStart(2, "0")}`

  return (
    <>
      <button className="restFab" onClick={() => setOpen(true)} aria-label="Open rest timer">
        <Timer size={17} /> Rest
      </button>
      {open && (
        <div className="restOverlay" onClick={() => setOpen(false)}>
          <div className="restCard" onClick={e => e.stopPropagation()}>
            <div className="restHeader">
              <div><span className="eyebrow">RECOVERY</span><h2>Rest timer</h2></div>
              <button className="iconBtn" onClick={() => setOpen(false)} aria-label="Close"><X size={17}/></button>
            </div>
            <div className={`restClock ${seconds === 0 ? "done" : ""}`}>{seconds === 0 ? "GO" : label}</div>
            <div className="restPresets">
              {PRESETS.map(p => <button key={p} className={seconds === p ? "selected" : ""} onClick={() => { setSeconds(p); setRunning(false) }}>{p >= 60 ? `${p / 60}m` : `${p}s`}</button>)}
            </div>
            <div className="restActions">
              <button className="btn secondary" onClick={() => { setSeconds(90); setRunning(false) }}>Reset</button>
              <button className="btn primary" onClick={() => { if (seconds === 0) setSeconds(90); setRunning(true) }}>{running ? "Pause" : seconds === 0 ? "Start again" : "Start"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
