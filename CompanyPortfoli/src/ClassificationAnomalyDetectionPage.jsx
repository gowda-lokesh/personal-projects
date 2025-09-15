import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle2, ArrowRight, Target, Users, Brain, Zap } from "lucide-react";

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{children}</span>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Feature = ({ icon: Icon, title, desc, features }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
    <Card className="group relative h-full overflow-hidden p-0">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-blue-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <CardContent className="relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{desc}</p>
        {features && (
          <ul className="mt-4 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-xs text-white/60">
                <CheckCircle2 className="h-3 w-3 text-green-400" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default function ClassificationAnomalyDetectionPage() {
  return (
    <div className="relative min-h-screen bg-[#0b0b13] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b13] to-[#0f0f1c]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(1000px 600px at 20% 10%, rgba(168,85,247,0.25), transparent), radial-gradient(800px 500px at 80% 40%, rgba(59,130,246,0.25), transparent)" }} />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <div className="absolute top-6 left-6">
            <Link to="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">Home</Link>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <Shield className="h-3.5 w-3.5" />
              Machine Learning
            </div>
          </motion.div>
          <motion.h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            Classification & <GradientText>Anomaly Detection</GradientText>
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Advanced machine learning models for pattern recognition, fraud detection, and identifying outliers in your data.
          </motion.p>
        </div>
      </section>

      {/* Framework Capabilities */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Framework <GradientText>Capabilities</GradientText></h2>
          <p className="mt-3 text-white/70">Built for accuracy, adaptability, and clarity across complex datasets and evolving needs.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-white">Custom Classification & Detection Pipelines</h3>
              <p className="mt-2 text-white/70 text-sm">Tailored pipelines designed to fit unique business use cases, ensuring high accuracy and adaptability.</p>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>✔ Handles complex datasets</li>
                <li>✔ Dynamic & scalable framework</li>
                <li>✔ High interpretability with precision</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-white">Robust Detection Architecture</h3>
              <p className="mt-2 text-white/70 text-sm">Resilient designs that account for seasonality, external variables, and real‑world uncertainties.</p>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>✔ Multi‑industry applicability</li>
                <li>✔ Advanced error correction</li>
                <li>✔ Data‑driven decision support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Real-World Industry Impact */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">Real‑World <GradientText>Industry Impact</GradientText></h3>
          <p className="mt-3 text-white/70">Our solutions empower smarter decision‑making across sectors.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card><CardContent><h4 className="text-lg font-semibold text-white">🛒 Retail & E‑Commerce</h4><p className="mt-2 text-white/70 text-sm">Smarter inventory planning, fewer stockouts, higher customer satisfaction.</p></CardContent></Card>
          <Card><CardContent><h4 className="text-lg font-semibold text-white">🏭 Manufacturing</h4><p className="mt-2 text-white/70 text-sm">Optimized production runs, reduced waste, efficient supply chains.</p></CardContent></Card>
          <Card><CardContent><h4 className="text-lg font-semibold text-white">🧴 FMCG & Consumer Goods</h4><p className="mt-2 text-white/70 text-sm">Improved product availability, reduced costs, stronger brand loyalty.</p></CardContent></Card>
          <Card><CardContent><h4 className="text-lg font-semibold text-white">🏥 Healthcare & Pharma</h4><p className="mt-2 text-white/70 text-sm">Optimized medicine/equipment supply, reduced shortages, better patient care.</p></CardContent></Card>
          <Card><CardContent><h4 className="text-lg font-semibold text-white">🚚 Logistics & Transportation</h4><p className="mt-2 text-white/70 text-sm">Better fleet utilization, reduced idle time, reliable deliveries.</p></CardContent></Card>
          <Card><CardContent><h4 className="text-lg font-semibold text-white">⚡ Energy & Utilities</h4><p className="mt-2 text-white/70 text-sm">Balanced demand–supply, outage prevention, optimized grid operations.</p></CardContent></Card>
          <Card><CardContent><h4 className="text-lg font-semibold text-white">💰 Finance & Insurance</h4><p className="mt-2 text-white/70 text-sm">Smarter risk modeling, improved capital allocation, regulatory compliance.</p></CardContent></Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-sky-600/20 px-6 py-16">
        <div className="absolute -inset-1 -z-10 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,0.20),transparent)]" />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to <GradientText>Detect</GradientText> Patterns?</h3>
          <p className="mt-3 text-white/70">Get started with our classification and anomaly detection solutions to secure your business.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-colors">
              <Shield className="mr-2 h-5 w-5" /> Start Detection
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
