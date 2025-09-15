import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Bot, CheckCircle2, ArrowRight, Target, Users, Brain, Zap } from "lucide-react";

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

export default function GenerativeAILLMPage() {
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
              <Sparkles className="h-3.5 w-3.5" />
              Generative AI
            </div>
          </motion.div>
          <motion.h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            Generative AI & <GradientText>LLMs</GradientText>
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Harness the power of Large Language Models and generative AI to create, automate, and transform your business processes.
          </motion.p>
        </div>
      </section>

      {/* Transform Your Business (moved up) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">Generative AI & <GradientText>LLMs</GradientText> Transform Your Business</h3>
          <p className="mt-3 text-white/70">From automation to creativity, modern language models unlock new ways to build, operate, and scale with measurable impact.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Bot className="h-6 w-6 text-green-400" />
                <h4 className="text-lg font-semibold text-white">Customer Support</h4>
              </div>
              <p className="text-white/70 text-sm">Intelligent chatbots and automated responses for 24/7 customer service.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Content Marketing</h4>
              </div>
              <p className="text-white/70 text-sm">Automated blog posts, social media content, and marketing copy generation.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-purple-400" />
                <h4 className="text-lg font-semibold text-white">Code Development</h4>
              </div>
              <p className="text-white/70 text-sm">AI-assisted coding, code review, and automated testing solutions.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-yellow-400" />
                <h4 className="text-lg font-semibold text-white">Data Analysis</h4>
              </div>
              <p className="text-white/70 text-sm">Natural language queries and automated insights from your data.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-red-400" />
                <h4 className="text-lg font-semibold text-white">Training & Education</h4>
              </div>
              <p className="text-white/70 text-sm">Personalized learning experiences and automated training content.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-indigo-400" />
                <h4 className="text-lg font-semibold text-white">Process Automation</h4>
              </div>
              <p className="text-white/70 text-sm">Intelligent workflow automation and decision-making systems.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">Why <GradientText>Choose Us</GradientText>?</h3>
          <div className="mt-6 grid gap-3 text-left md:grid-cols-2">
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Tailored Solutions – We translate diverse business use cases into high‑performing Generative AI & LLM frameworks.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Robust & Scalable – Built to handle complex data, technical challenges, and real‑world scale.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>High Accuracy – Advanced fine‑tuning for precise, business‑relevant outputs.</span></div>
            <div className="flex items-start gap-3 text-white/80"><span className="text-indigo-400">⚡</span><span>Measurable ROI – Frameworks designed to directly impact business KPIs.</span></div>
            <div className="flex items-start gap-3 text-white/80 md:col-span-2"><span className="text-indigo-400">⚡</span><span>Adaptive & Secure – Continuous improvement with safe, ethical, and human‑in‑the‑loop workflows.</span></div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-sky-600/20 px-6 py-16">
        <div className="absolute -inset-1 -z-10 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,0.20),transparent)]" />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to <GradientText>Generate</GradientText> the Future?</h3>
          <p className="mt-3 text-white/70">Get started with our generative AI and LLM solutions to transform your business.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-colors">
              <Sparkles className="mr-2 h-5 w-5" /> Start Generating
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
