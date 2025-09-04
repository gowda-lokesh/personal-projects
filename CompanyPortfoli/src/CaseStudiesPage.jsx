import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpenText, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{children}</span>
);

export default function CaseStudiesPage() {
  return (
    <div className="relative min-h-screen bg-[#0b0b13] text-white">
      <header className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Vishnu Labs</h1>
        <Link to="/" className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl">
          <Home className="h-4 w-4" /> Home
        </Link>
      </header>

      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b13] to-[#0f0f1c]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <BookOpenText className="h-3.5 w-3.5" />
              Case Studies
            </div>
          </motion.div>
          <motion.h2 className="mt-6 max-w-3xl text-3xl font-bold md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            Explore our <GradientText>Data Science</GradientText> case studies
          </motion.h2>
          <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Deep dives into real projects, challenges, solutions, and measurable business outcomes.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {[1,2,3,4].map((i) => (
            <Card key={i}>
              <CardContent>
                <div className="flex items-center gap-3">
                  <BookOpenText className="h-6 w-6 text-indigo-400" />
                  <h3 className="text-lg font-semibold">Case Study {i}: Impactful DS Project</h3>
                </div>
                <p className="mt-2 text-white/70">How we applied modern machine learning to drive measurable ROI for a client. From data wrangling to model deployment.</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl">
                  Read more <ArrowRight className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}


