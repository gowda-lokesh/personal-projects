"use client";
import { useMemo, useState } from 'react';

const workouts = ['Push','Pull','Legs'];
const exercises = {Push:['Bench Press','Incline Dumbbell Press','Cable Crossover'],Pull:['Lat Pulldown','Seated Cable Row','Face Pull'],Legs:['Squat','Leg Press','Leg Curl']};
export default function Home(){
 const [date,setDate]=useState(new Date().toISOString().slice(0,10));
 const [workout,setWorkout]=useState('Push');
 const [sets,setSets]=useState<Record<string,{weight:string,reps:string}[]>>({});
 const todaySets=useMemo(()=>sets[workout]||[],[sets,workout]);
 function addSet(name:string){setSets(s=>({...s,[workout]:[...(s[workout]||[]),{weight:'',reps:''}]}));}
 return <main className="shell">
  <header className="top"><div><div className="brand">Fitness Tracker</div><div className="muted">Train. Track. Progress.</div></div><div className="nav"><span className="pill">Strength</span><span className="pill">Cardio</span><span className="pill">Steps</span></div></header>
  <section className="hero"><div className="muted">TODAY</div><h1 style={{margin:'6px 0 8px'}}>Ready for your next session?</h1><div className="row"><span className="muted">Log your work without leaving the flow of your workout.</span><button className="btn secondary" onClick={()=>alert('Workout saved locally. Database connection is next.')}>Finish Workout</button></div></section>
  <section className="grid"><div className="card"><div className="muted">Workouts</div><div className="stat">0</div><div className="muted">this week</div></div><div className="card"><div className="muted">Volume</div><div className="stat">0 kg</div><div className="muted">this week</div></div><div className="card"><div className="muted">Steps</div><div className="stat">—</div><div className="muted">today</div></div><div className="card"><div className="muted">Streak</div><div className="stat">0 days</div><div className="muted">keep going</div></div></section>
  <section className="section card"><div className="row"><div><h2 style={{margin:'0 0 4px'}}>Log workout</h2><div className="muted">Previous performance will appear beside each exercise.</div></div><input aria-label="Workout date" type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
   <div style={{display:'flex',gap:8,margin:'18px 0',flexWrap:'wrap'}}>{workouts.map(w=><button key={w} className={'btn '+(workout===w?'':'secondary')} onClick={()=>setWorkout(w)}>{w}</button>)}</div>
   <div className="list">{exercises[workout as keyof typeof exercises].map((name,i)=><div className="item" key={name}><div><strong>{name}</strong><div className="muted">Last time · {i===0?'60 kg × 8':'—'}</div></div><div style={{display:'flex',gap:8,alignItems:'center'}}><input inputMode="decimal" placeholder="kg" style={{width:72,padding:9,border:'1px solid #e4e7ec',borderRadius:10}}/><input inputMode="numeric" placeholder="reps" style={{width:72,padding:9,border:'1px solid #e4e7ec',borderRadius:10}}/><button className="btn secondary" onClick={()=>addSet(name)}>+ Set</button></div></div>)}</div>
  </section>
  <section className="section grid"><div className="card"><h3>Progress</h3><p className="muted">Strength, volume, estimated 1RM and PR trends.</p></div><div className="card"><h3>Cardio</h3><p className="muted">Duration, distance, pace and heart-rate history.</p></div><div className="card"><h3>Activity</h3><p className="muted">Daily steps, targets and rolling averages.</p></div><div className="card"><h3>Insights</h3><p className="muted">Training frequency, muscle volume and consistency.</p></div></section>
 </main>
}
