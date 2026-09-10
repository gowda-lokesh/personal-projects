"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Dumbbell } from "lucide-react"
import { createClient } from "../../lib/supabase/client"

type Session = {
  id: string
  session_date: string
  workout_name_snapshot: string | null
  completed_at: string | null
  workout_session_exercises: {
    exercise_id: string | null
    exercise_name_snapshot: string
    exercise_sets: { weight: number | null; reps: number | null; rpe: number | null; completed: boolean }[]
  }[]
}

export default function HistoryPage() {
  const supabase = createClient()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: auth } = await supabase.auth.getSession()
      if (!auth.session) { setLoading(false); return }
      const { data } = await supabase.from("workout_sessions")
        .select("id,session_date,workout_name_snapshot,completed_at,workout_session_exercises(exercise_id,exercise_name_snapshot,exercise_sets(weight,reps,rpe,completed))")
        .eq("status", "completed")
        .order("session_date", { ascending: false })
        .limit(50)
      setSessions((data ?? []) as Session[])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <main className="shell loading"><div className="spinner"/>Loading history…</main>

  return <main className="shell historyPage">
    <header className="top"><div><div className="brand">Workout history</div><div className="muted">Every completed session, preserved.</div></div><Link href="/" className="btn secondary"><ArrowLeft size={16}/> Back to training</Link></header>
    {!sessions.length ? <section className="card empty"><Dumbbell size={28}/><strong>No completed workouts yet</strong><span className="muted">Finish your first workout and it will appear here.</span></section> : <div className="historySessions">{sessions.map(s => {
      const volume = s.workout_session_exercises.flatMap(e => e.exercise_sets).reduce((n, x) => n + (Number(x.weight)||0)*(Number(x.reps)||0), 0)
      const sets = s.workout_session_exercises.reduce((n, e) => n + e.exercise_sets.filter(x => x.completed).length, 0)
      return <details className="historySession card" key={s.id}>
        <summary><div><span className="eyebrow"><CalendarDays size={12}/> {new Date(s.session_date+"T00:00:00").toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</span><h2>{s.workout_name_snapshot || "Workout"}</h2></div><div className="historySummary"><strong>{s.workout_session_exercises.length} exercises</strong><span>{sets} sets · {Math.round(volume).toLocaleString()} kg</span></div></summary>
        <div className="sessionDetail">{s.workout_session_exercises.map(e => <div className="historyExercise" key={e.exercise_id ?? e.exercise_name_snapshot}><div><strong>{e.exercise_name_snapshot}</strong><span>{e.exercise_sets.filter(x=>x.completed).length} completed sets</span></div><div className="historySetList">{e.exercise_sets.filter(x=>x.completed).map((x,i)=><span key={i}>{x.weight ?? "—"} kg × {x.reps ?? "—"}{x.rpe != null ? ` · RPE ${x.rpe}` : ""}</span>)}</div></div>)}</div>
      </details>
    })}</div>}
  </main>
}
