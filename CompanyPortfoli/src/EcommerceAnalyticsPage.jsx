import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

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

export default function EcommerceAnalyticsPage() {
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
              <ShoppingCart className="h-3.5 w-3.5" />
              E-commerce Analytics
            </div>
          </motion.div>
          <motion.h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            E-commerce <GradientText>Analytics</GradientText>
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Optimize your online store with advanced analytics, customer insights, and data-driven strategies for maximum growth.
          </motion.p>
        </div>
      </section>

      {/* Verticals Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">How <GradientText>E‑commerce Analytics</GradientText> Drives Value Across Verticals</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Feature title="Retail & Fashion" points={["Predict demand trends", "Optimize assortments", "Reduce stockouts"]} />
          <Feature title="Consumer Electronics" points={["Track product performance", "Dynamic pricing", "Improve upsell/cross‑sell"]} />
          <Feature title="Food & Grocery" points={["Manage inventory freshness", "Optimize delivery routes", "Forecast demand"]} />
          <Feature title="Digital Products & Subscriptions" points={["Reduce churn", "Personalize offers", "Maximize recurring revenue"]} />
          <Feature title="Health & Wellness" points={["Tailored campaigns", "Compliance‑ready reporting", "Loyalty tracking"]} />
          <Feature title="Marketplaces & Platforms" points={["Seller performance insights", "Buyer segmentation", "Fraud detection"]} />
        </div>
      </section>

      

      
      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">Why <GradientText>Choose Us</GradientText>?</h3>
          <div className="mt-6 grid gap-3 text-left md:grid-cols-2">
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Deep Customer Understanding – Hidden patterns in behavior, purchases, and retention.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Profit‑Driven Optimization – Improve conversion, sales, and lifetime value.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Scalable Frameworks – Flexible analytics that grow with your store.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Real‑Time Metrics – Dashboards for instant decisions and performance tracking.</span></div>
            <div className="flex items-start gap-3 text-white/80 md:col-span-2"><span className="text-indigo-400">⚡</span><span>End‑to‑End Coverage – From acquisition to retention, we optimize every step.</span></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-sky-600/20 px-6 py-16">
        <div className="absolute -inset-1 -z-10 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,0.20),transparent)]" />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to <GradientText>Optimize</GradientText> Your Store?</h3>
          <p className="mt-3 text-white/70">Get started with our e-commerce analytics to maximize your online business growth.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-colors">
              <ShoppingCart className="mr-2 h-5 w-5" /> Start Optimizing
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
