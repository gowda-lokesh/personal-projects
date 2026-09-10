"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createClient } from "../lib/supabase/client"
import { Plus, Check, Trash2, LogOut, Dumbbell, Activity, Footprints, TrendingUp } from "lucide-react"

type Workout = { id: string; name: string; description: string | null }
type Exercise = { id: string; name: string; muscle_group: string | null; equipment: string | null }
type TemplateExercise = { exercise_id: string; sort_order: number; target_sets: number | null; target_reps_min: number | null; target_reps_max: number | null; exercise: Exercise }
type SetRow = { weight: string; reps: string; rpe: string }
type Previous = { date: string; sets: { weight: number | null; reps: number | null }[] }

const supabase = createClient()
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date())

export default function Home() {
  const [sessionUser, setSessionUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [authBusy, setAuthBusy] = useState(false)
  const [message, setMessage] = useState("")
  const [date, setDate] = useState(today())
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<string>("")
  const [templateExercises, setTemplateExercises] = useState<TemplateExercise[]>([])
  const [rows, setRows] = useState<Record<string, SetRow[]>>({})
  const [previous, setPrevious] = useState<Record<string, Previous | null>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSetup, setShowSetup] = useState(false)
  const [newWorkout, setNewWorkout] = useState("")
  const [newExercise, setNewExercise] = useState("")
  const [newMuscle, setNewMuscle] = useState("")

  const currentWorkout = useMemo(() => workouts.find(w => w.id === selectedWorkout), [workouts, selectedWorkout])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionUser(session?.user ?? null)
      setLoading(false)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (sessionUser) loadData()
  }, [sessionUser])

  useEffect(() => {
    if (selectedWorkout) loadTemplate(selectedWorkout)
  }, [selectedWorkout])

  async function loadData() {
    setLoading(true)
    const [{ data: ws }, { data: ex }] = await Promise.all([
      supabase.from("workout_templates").select("id,name,description").eq("archived", false).order("created_at"),
      supabase.from("exercises").select("id,name,muscle_group,equipment").eq("archived", false).order("name"),
    ])
    setWorkouts(ws ?? [])
    setExercises(ex ?? [])
    if (!selectedWorkout && ws?.length) setSelectedWorkout(ws[0].id)
    setLoading(false)
  }

  async function loadTemplate(workoutId: string) {
    const { data } = await supabase
      .from("workout_template_exercises")
      .select("exercise_id,sort_order,target_sets,target_reps_min,target_reps_max,exercise:exercises(id,name,muscle_group,equipment)")
      .eq("workout_id", workoutId)
      .order("sort_order")
    const items = (data ?? []) as unknown as TemplateExercise[]
    setTemplateExercises(items)
    const nextRows: Record<string, SetRow[]> = {}
    items.forEach(item => {
      const count = item.target_sets ?? 3
      nextRows[item.exercise_id] = Array.from({ length: count }, () => ({ weight: "", reps: "", rpe: "" }))
    })
    setRows(nextRows)
    await loadPrevious(items.map(i => i.exercise_id))
  }

  async function loadPrevious(ids: string[]) {
    if (!ids.length) return
    const { data } = await supabase
      .from("workout_sessions")
      .select("id,session_date,workout_session_exercises(exercise_id,exercise_sets(weight,reps))")
      .eq("status", "completed")
      .order("session_date", { ascending: false })
      .limit(50)
    const map: Record<string, Previous | null> = {}
    ids.forEach(id => { map[id] = null })
    for (const session of (data ?? []) as any[]) {
      for (const se of session.workout_session_exercises ?? []) {
        if (!ids.includes(se.exercise_id) || map[se.exercise_id]) continue
        map[se.exercise_id] = { date: session.session_date, sets: se.exercise_sets ?? [] }
      }
    }
    setPrevious(map)
    setRows(prev => {
      const copy = { ...prev }
      ids.forEach(id => {
        const p = map[id]
        if (p?.sets?.length) copy[id] = p.sets.map((s: any) => ({ weight: s.weight?.toString() ?? "", reps: "", rpe: "" }))
      })
      return copy
    })
  }

  async function auth(e: FormEvent) {
    e.preventDefault(); setAuthBusy(true); setMessage("")
    const result = authMode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    if (result.error) setMessage(result.error.message)
    else setMessage(authMode === "signup" ? "Account created. Check your email if confirmation is enabled." : "")
    setAuthBusy(false)
  }

  async function ensureProfile() {
    if (!sessionUser) return
    await supabase.from("profiles").upsert({ id: sessionUser.id, display_name: sessionUser.email?.split("@")[0] ?? "Athlete" })
  }

  async function createWorkout(e: FormEvent) {
    e.preventDefault(); if (!newWorkout.trim() || !sessionUser) return
    await ensureProfile()
    const { data, error } = await supabase.from("workout_templates").insert({ user_id: sessionUser.id, name: newWorkout.trim() }).select("id,name,description").single()
    if (error) return setMessage(error.message)
    setWorkouts(prev => [...prev, data]); setSelectedWorkout(data.id); setNewWorkout("")
  }

  async function createExercise(e: FormEvent) {
    e.preventDefault(); if (!newExercise.trim() || !sessionUser) return
    const { data, error } = await supabase.from("exercises").insert({ user_id: sessionUser.id, name: newExercise.trim(), muscle_group: newMuscle.trim() || null }).select("id,name,muscle_group,equipment").single()
    if (error) return setMessage(error.message)
    setExercises(prev => [...prev, data].sort((a,b) => a.name.localeCompare(b.name))); setNewExercise(""); setNewMuscle("")
  }

  async function addExerciseToWorkout(exerciseId: string) {
    if (!selectedWorkout) return
    const exists = templateExercises.some(x => x.exercise_id === exerciseId)
    if (exists) return
    const { error } = await supabase.from("workout_template_exercises").insert({ workout_id: selectedWorkout, exercise_id: exerciseId, sort_order: templateExercises.length, target_sets: 3, target_reps_min: 8, target_reps_max: 12 })
    if (!error) loadTemplate(selectedWorkout)
  }

  function updateSet(exerciseId: string, index: number, field: keyof SetRow, value: string) {
    setRows(prev => ({ ...prev, [exerciseId]: (prev[exerciseId] ?? []).map((r, i) => i === index ? { ...r, [field]: value } : r) }))
  }

  function addSet(exerciseId: string) {
    setRows(prev => ({ ...prev, [exerciseId]: [...(prev[exerciseId] ?? []), { weight: "", reps: "", rpe: "" }] }))
  }

  async function finishWorkout() {
    if (!selectedWorkout || !templateExercises.length) return setMessage("Choose a workout with at least one exercise.")
    setSaving(true); setMessage("")
    const payload = {
      workout_id: selectedWorkout,
      workout_name: currentWorkout?.name,
      session_date: date,
      started_at: new Date().toISOString(),
      exercises: templateExercises.map(item => ({
        exercise_id: item.exercise_id,
        exercise_name: item.exercise.name,
        sets: (rows[item.exercise_id] ?? []).map((r, i) => ({ set_number: i + 1, weight: r.weight || null, reps: r.reps || null, rpe: r.rpe || null, completed: Boolean(r.weight || r.reps) }))
      }))
    }
    const { error } = await supabase.rpc("finish_workout", { payload })
    if (error) setMessage(error.message)
    else { setMessage("Workout saved ✓"); await loadData(); await loadTemplate(selectedWorkout) }
    setSaving(false)
  }

  if (loading) return <main className="shell loading"><div className="spinner" />Loading your tracker…</main>

  if (!sessionUser) return (
    <main className="authShell">
      <div className="authCard">
        <div className="logoMark"><Dumbbell size={22} /></div>
        <h1>Fitness Tracker</h1><p className="muted">Your training, one clean log.</p>
        <div className="authTabs"><button className={authMode === "signin" ? "active" : ""} onClick={() => setAuthMode("signin")}>Sign in</button><button className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>Create account</button></div>
        <form onSubmit={auth} className="formStack"><input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /><input type="password" placeholder="Password (6+ characters)" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required /><button className="btn primary wide" disabled={authBusy}>{authBusy ? "Please wait…" : authMode === "signin" ? "Sign in" : "Create account"}</button></form>
        {message && <div className="notice">{message}</div>}
      </div>
    </main>
  )

  const totalVolume = Object.values(rows).flat().reduce((sum, r) => sum + (Number(r.weight)||0)*(Number(r.reps)||0), 0)
  return <main className="shell">
    <header className="top"><div><div className="brand">Fitness Tracker</div><div className="muted">Train. Track. Progress.</div></div><div className="nav"><span className="pill activePill"><Dumbbell size={14}/> Strength</span><span className="pill"><Activity size={14}/> Cardio</span><span className="pill"><Footprints size={14}/> Steps</span><button className="iconBtn" title="Sign out" onClick={()=>supabase.auth.signOut()}><LogOut size={17}/></button></div></header>
    <section className="hero"><div><div className="eyebrow">{date === today() ? "TODAY" : date}</div><h1>{currentWorkout ? currentWorkout.name : "Start your training"}</h1><p className="muted">Log each set without leaving the flow of your workout.</p></div><button className="btn primary finish" onClick={finishWorkout} disabled={saving}>{saving ? "Saving…" : <><Check size={17}/> Finish Workout</>}</button></section>
    <section className="grid stats"><div className="card"><div className="muted">Exercises</div><div className="stat">{templateExercises.length}</div><div className="muted">in session</div></div><div className="card"><div className="muted">Volume</div><div className="stat">{Math.round(totalVolume).toLocaleString()} kg</div><div className="muted">entered</div></div><div className="card"><div className="muted">Previous</div><div className="stat">{Object.values(previous).filter(Boolean).length}</div><div className="muted">exercises with history</div></div><div className="card insightCard"><TrendingUp size={18}/><strong>Progress</strong><span className="muted">Your history becomes the benchmark for every next session.</span></div></section>
    <section className="card controls"><div className="controlGroup"><label>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></div><div className="controlGroup workoutPicker"><label>Workout</label><div className="chipRow">{workouts.map(w=><button key={w.id} className={selectedWorkout===w.id ? "chip selected" : "chip"} onClick={()=>setSelectedWorkout(w.id)}>{w.name}</button>)}<button className="chip add" onClick={()=>setShowSetup(!showSetup)}><Plus size={15}/> Manage</button></div></div></section>
    {showSetup && <section className="setupGrid"><div className="card"><h3>New workout</h3><form onSubmit={createWorkout} className="inlineForm"><input placeholder="e.g. Upper Body" value={newWorkout} onChange={e=>setNewWorkout(e.target.value)}/><button className="btn primary"><Plus size={16}/> Add</button></form></div><div className="card"><h3>New exercise</h3><form onSubmit={createExercise} className="inlineForm"><input placeholder="Exercise name" value={newExercise} onChange={e=>setNewExercise(e.target.value)}/><input placeholder="Muscle group" value={newMuscle} onChange={e=>setNewMuscle(e.target.value)}/><button className="btn primary"><Plus size={16}/> Add</button></form><div className="exercisePool">{exercises.filter(e=>!templateExercises.some(t=>t.exercise_id===e.id)).slice(0,12).map(e=><button key={e.id} className="poolItem" onClick={()=>addExerciseToWorkout(e.id)}><Plus size={14}/>{e.name}<span>{e.muscle_group ?? ""}</span></button>)}</div></div></section>}
    <section className="card workoutCard"><div className="sectionHead"><div><h2>Log workout</h2><p className="muted">Previous performance is shown above each exercise.</p></div></div>{templateExercises.length === 0 ? <div className="empty"><Dumbbell size={28}/><strong>No exercises yet</strong><span className="muted">Open Manage to add exercises to this workout.</span></div> : <div className="exerciseList">{templateExercises.map(item => { const p = previous[item.exercise_id]; const sets = rows[item.exercise_id] ?? []; return <div className="exercise" key={item.exercise_id}><div className="exerciseHeader"><div><h3>{item.exercise.name}</h3><span className="muted">{item.exercise.muscle_group || "Strength"}{item.target_reps_min ? ` · ${item.target_reps_min}–${item.target_reps_max} reps` : ""}</span></div>{p && <div className="previous"><span>Last time · {new Date(p.date+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</span><strong>{p.sets.filter(s=>s.weight!=null).map(s=>`${s.weight} kg${s.reps?` × ${s.reps}`:""}`).join("  ·  ") || "Recorded"}</strong></div>}</div><div className="setTable"><div className="setHeader"><span>SET</span><span>WEIGHT</span><span>REPS</span><span>RPE</span><span></span></div>{sets.map((r,i)=><div className="setRow" key={i}><span className="setNo">{i+1}</span><input inputMode="decimal" placeholder="kg" value={r.weight} onChange={e=>updateSet(item.exercise_id,i,"weight",e.target.value)}/><input inputMode="numeric" placeholder="reps" value={r.reps} onChange={e=>updateSet(item.exercise_id,i,"reps",e.target.value)}/><input inputMode="decimal" placeholder="—" value={r.rpe} onChange={e=>updateSet(item.exercise_id,i,"rpe",e.target.value)}/><button className="removeBtn" onClick={()=>setRows(prev=>({...prev,[item.exercise_id]:(prev[item.exercise_id]??[]).filter((_,j)=>j!==i)}))}><Trash2 size={15}/></button></div>)}<button className="addSet" onClick={()=>addSet(item.exercise_id)}><Plus size={15}/> Add set</button></div></div> })}</div>}</section>
    {message && <div className="notice success">{message}</div>}
    <section className="section grid lower"><div className="card mini"><h3>Progress</h3><p className="muted">Strength, volume, estimated 1RM and PR trends will build automatically from completed sessions.</p></div><div className="card mini"><h3>Cardio</h3><p className="muted">Duration, distance, pace and heart-rate logging is ready in the database layer.</p></div><div className="card mini"><h3>Activity</h3><p className="muted">Daily steps and rolling averages are ready for the activity screen.</p></div></section>
  </main>
}
