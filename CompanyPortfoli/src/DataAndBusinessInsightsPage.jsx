import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, ArrowRight, Home } from "lucide-react";

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{children}</span>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Feature = ({ title, points }) => (
  <Card>
    <CardContent>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <ul className="mt-3 space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function DataBusinessInsightPage() {
  return (
    <div className="relative min-h-screen bg-[#0b0b13] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b13] to-[#0f0f1c]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(1000px 600px at 20% 10%, rgba(168,85,247,0.25), transparent), radial-gradient(800px 500px at 80% 40%, rgba(59,130,246,0.25), transparent)" }} />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <div className="absolute top-6 left-6">
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"><Home className="h-4 w-4" /> Home</Link>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <BarChart3 className="h-3.5 w-3.5" />
              Data & Business Insights
            </div>
          </motion.div>
          <motion.h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            Data & <GradientText>Business</GradientText> Insights
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Turn raw data into executive-ready insights and decision support.
          </motion.p>
        </div>
      </section>

      

      {/* Value Across Verticals */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">How <GradientText>Data & Business Insights</GradientText> Drive Value Across Verticals</h3>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Feature title="Finance & Banking" points={["Real-time risk dashboards", "Fraud detection insights", "Portfolio performance tracking"]} />
          <Feature title="Retail & E‑commerce" points={["Customer behavior analytics", "Sales trend monitoring", "Demand signals"]} />
          <Feature title="Healthcare" points={["Patient outcome dashboards", "Operational efficiency tracking", "Compliance analytics"]} />
          <Feature title="Manufacturing & Supply Chain" points={["Production KPIs", "Downtime analysis", "Supplier performance insights"]} />
          <Feature title="Marketing & Media" points={["Campaign effectiveness", "Audience segmentation", "ROI analytics"]} />
          <Feature title="Public Sector & Education" points={["Policy impact measurement", "Resource allocation insights", "Transparency reporting"]} />
        </div>
      </section>

      {/* Why Choose Us (moved below verticals) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">Why <GradientText>Choose Us</GradientText>?</h3>
          <div className="mt-6 grid gap-3 text-left md:grid-cols-2">
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Holistic Approach – From raw data pipelines to executive‑ready dashboards, we build the full stack.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Custom Fit – Tailored insights aligned with diverse business contexts and KPIs.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Trust & Accuracy – Rigorous quality checks, governance, and scalable architectures.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Actionable Outcomes – Insights engineered to directly drive strategic decisions.</span></div>
            <div className="flex items-start gap-3 text-white/80 md:col-span-2"><span className="text-indigo-400">⚡</span><span>Future‑Ready – Adaptive frameworks that evolve with new data and business priorities.</span></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-sky-600/20 px-6 py-16">
        <div className="absolute -inset-1 -z-10 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,0.20),transparent)]" />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to <GradientText>Unlock</GradientText> Insights?</h3>
          <p className="mt-3 text-white/70">Partner with us to build a metrics-driven culture and better decisions.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-colors">
              <BarChart3 className="mr-2 h-5 w-5" /> Get Started
            </Link>
            <Link to="/case-studies" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors">
              <ArrowRight className="mr-2 h-5 w-5" /> Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}



