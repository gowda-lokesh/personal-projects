import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, TreePine, Zap, ArrowRight, CheckCircle2, Target, Users, Brain, TrendingUp } from "lucide-react";

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

export default function PredictiveAnalyticsPage() {
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
              <BarChart3 className="h-3.5 w-3.5" />
              Machine Learning
            </div>
          </motion.div>
          <motion.h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            Advanced <GradientText>Predictive</GradientText> Analytics
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Unlock the power of machine learning with our cutting-edge predictive models for forecasting and pattern recognition.
          </motion.p>
        </div>
      </section>

      {/* Driving Value Across Industries */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Driving <GradientText>Value</GradientText> Across Industries</h2>
          <p className="mt-3 text-white/70">A robust predictive analytics framework equips businesses to adapt quickly, optimize resources, and stay ahead of market shifts. By combining data‑driven insights with tailored approaches, we deliver accurate predictions that solve real‑world challenges across industries.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <h4 className="text-lg font-semibold text-white">🛒 Retail & E‑Commerce</h4>
              <p className="mt-2 text-white/70 text-sm">Smarter inventory planning, fewer stockouts, better customer satisfaction.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="text-lg font-semibold text-white">🏭 Manufacturing</h4>
              <p className="mt-2 text-white/70 text-sm">Optimized production schedules, reduced waste, streamlined supply chain.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="text-lg font-semibold text-white">🧴 FMCG & Consumer Goods</h4>
              <p className="mt-2 text-white/70 text-sm">Right product availability, lower distribution costs, stronger brand loyalty.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="text-lg font-semibold text-white">🏥 Healthcare & Pharma</h4>
              <p className="mt-2 text-white/70 text-sm">Balanced drug/equipment supply, minimized shortages, improved patient care.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="text-lg font-semibold text-white">🚚 Logistics & Transportation</h4>
              <p className="mt-2 text-white/70 text-sm">Efficient fleet use, less idle time, reliable deliveries.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="text-lg font-semibold text-white">⚡ Energy & Utilities</h4>
              <p className="mt-2 text-white/70 text-sm">Demand‑supply balance, outage prevention, optimized grid operations.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="text-lg font-semibold text-white">💰 Finance & Insurance</h4>
              <p className="mt-2 text-white/70 text-sm">Better risk modeling, smarter resource allocation, compliance confidence.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">Why Choose Our <GradientText>US</GradientText> ?</h3>
            <p className="mt-3 text-white/70">Our advanced predictive analytics provides deep insights into your data patterns and relationships.</p>
            <ul className="mt-6 space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <Target className="h-5 w-5 text-green-400" />
                <span>High accuracy predictions with minimal overfitting</span>
              </li>
              <li className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span>Scalable solutions for large datasets</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-400" />
                <span>Expert model interpretation and feature analysis</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent>
                <h4 className="text-lg font-semibold text-white">Use Cases</h4>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Sales forecasting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Customer behavior prediction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Risk assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Price optimization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-sky-600/20 px-6 py-16">
        <div className="absolute -inset-1 -z-10 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,0.20),transparent)]" />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to <GradientText>Predict</GradientText> Your Future?</h3>
          <p className="mt-3 text-white/70">Get started with our advanced predictive analytics and unlock the hidden patterns in your data.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-colors">
              <BarChart3 className="mr-2 h-5 w-5" /> Start Analysis
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors">
              <ArrowRight className="mr-2 h-5 w-5" /> Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
