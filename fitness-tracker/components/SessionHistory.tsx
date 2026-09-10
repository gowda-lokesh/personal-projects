"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown, ChevronUp, History } from "lucide-react"
import { createClient } from "../lib/supabase/client"

type Session = { id: string; session_date: string; workout_name_snapshot: string | null; completed_at: string | null }
type SessionExercise = { exercise_id: string | null; exercise_name_snapshot: string; sort_order: number; exercise_sets: { set_number: number; weight: number | null; reps: number | null; rpe: number | null; completed: boolean }[] }

const supabase = createClient()
const dateLabel = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

export default function SessionHistory() {
  const [open, setOpen] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [detail, setDetail] = useState<SessionExercise[]>([])
  const [loading, setLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)

  async function loadSessions() {
    setLoading(true)
    const { data } = await supabase.from("workout_sessions").select("id,session_date,workout_name_snapshot,completed_at").eq("status", "completed").order("session_date", { ascending: false }).order("completed_at", { ascending: false }).limit(50)
    const items = (data ?? []) as Session[]
    setSessions(items)
    if ((!selectedId || !items.some(s => s.id === selectedId)) && items.length) setSelectedId(items[0].id)
    setLoading(false)
  }

  async function loadDetail(id: string) {
    if (!id) return
    setDetailLoading(true)
    const { data } = await supabase.from("workout_session_exercises").select("exercise_id,exercise_name_snapshot,sort_order,exercise_sets(set_number,weight,reps,rpe,completed)").eq("session_id", id).order("sort_order")
    setDetail((data ?? []) as SessionExercise[])
    setDetailLoading(false)
  }

  useEffect(() => { if (open) loadSessions() }, [open])
  useEffect(() => { if (selectedId && open) loadDetail(selectedId) }, [selectedId, open])

  const selected = useMemo(() => sessions.find(s => s.id === selectedId), [sessions, selectedId])
  const totalVolume = detail.reduce((sum, ex) => sum + ex.exercise_sets.reduce((n, s) => n + (Number(s.weight) || 0) * (Number(s.reps) || 0), 0), 0)
  const totalSets = detail.reduce((sum, ex) => sum + ex.exercise_sets.filter(s => s.completed).length, 0)

  return <section className="card sessionHistoryCard">
    <div className="sectionHead sessionHistoryHead">
      <div><h2 className="sessionTitle"><History size={18}/> Saved sessions</h2><p className="muted">Review any completed workout and the sets you logged.</p></div>
      <button className="btn secondary sessionToggle" onClick={() => setOpen(v => !v)}>{open ? <>Hide history <ChevronUp size={16}/></> : <>View sessions <ChevronDown size={16}/></>}</button>
    </div>
    {open && <div className="sessionHistoryBody">
      {loading ? <div className="empty small">Loading sessions…</div> : sessions.length === 0 ? <div className="empty small">No completed workouts yet.</div> : <>
        <div className="sessionSelectRow">
          <label>SESSION<select value={selectedId} onChange={e => setSelectedId(e.target.value)}>{sessions.map(s => <option key={s.id} value={s.id}>{dateLabel(s.session_date)} · {s.workout_name_snapshot || "Workout"}</option>)}</select></label>
          {selected && <div className="sessionMeta"><strong>{selected.workout_name_snapshot || "Workout"}</strong><span>{dateLabel(selected.session_date)} · {totalSets} sets · {Math.round(totalVolume).toLocaleString()} kg volume</span></div>}
        </div>
        {detailLoading ? <div className="empty small">Loading workout…</div> : <div className="sessionDetailList">{detail.map(ex => <div className="sessionDetailExercise" key={`${selectedId}-${ex.exercise_id}-${ex.sort_order}`}>
          <div className="sessionDetailHeader"><strong>{ex.exercise_name_snapshot}</strong><span>{ex.exercise_sets.filter(s => s.completed).length} sets</span></div>
          <div className="sessionSetList">{ex.exercise_sets.filter(s => s.completed).sort((a,b) => a.set_number-b.set_number).map(s => <div className="sessionSet" key={s.set_number}><span className="sessionSetNo">{s.set_number}</span><strong>{s.weight ?? "—"} kg</strong><strong>{s.reps ?? "—"} reps</strong>{s.rpe != null && <span>RPE {s.rpe}</span>}</div>)}</div>
        </div>)}</div>}
      </>}
    </div>}
    <style jsx>{`
      .sessionHistoryCard{margin-top:14px}
      .sessionHistoryHead{align-items:center}
      .sessionTitle{display:flex;align-items:center;gap:8px}
      .sessionHistoryBody{margin-top:16px;padding-top:16px;border-top:1px solid var(--line)}
      .sessionSelectRow{display:grid;grid-template-columns:minmax(260px,1.2fr) 1fr;gap:14px;align-items:end}
      .sessionSelectRow label{display:grid;gap:7px;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:800;color:var(--muted)}
      .sessionMeta{min-height:43px;padding:9px 12px;border:1px solid var(--line);border-radius:11px;background:var(--soft);display:grid;gap:2px}
      .sessionMeta strong{font-size:13px}
      .sessionMeta span{font-size:11px;color:var(--muted)}
      .sessionDetailList{display:grid;gap:10px;margin-top:14px}
      .sessionDetailExercise{border:1px solid var(--line);border-radius:13px;overflow:hidden}
      .sessionDetailHeader{display:flex;align-items:center;justify-content:space-between;padding:11px 13px;background:#fcfcfd}
      .sessionDetailHeader span{font-size:11px;color:var(--muted)}
      .sessionSetList{padding:5px 12px}
      .sessionSet{display:grid;grid-template-columns:30px 1fr 1fr 70px;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid #eef0f3;font-size:12px}
      .sessionSet:last-child{border-bottom:0}
      .sessionSetNo{width:25px;height:25px;border-radius:8px;background:var(--soft);display:grid;place-items:center;font-weight:800;color:var(--muted)}
      .sessionSet>span:last-child{color:var(--muted);font-size:11px;text-align:right}
      @media(max-width:600px){.sessionHistoryHead{align-items:flex-start;flex-direction:column}.sessionToggle{width:100%;justify-content:center}.sessionSelectRow{grid-template-columns:1fr}.sessionSet{grid-template-columns:28px 1fr 1fr}.sessionSet>span:last-child{grid-column:2/-1;text-align:left}}
    `}</style>
  </section>
}
