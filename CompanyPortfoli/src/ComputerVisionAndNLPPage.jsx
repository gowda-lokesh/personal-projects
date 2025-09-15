import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MousePointer2, CheckCircle2, ArrowRight, Home } from "lucide-react";

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

export default function ComputerVisionNLPPage() {
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
              <MousePointer2 className="h-3.5 w-3.5" />
              Computer Vision & NLP
            </div>
          </motion.div>
          <motion.h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            Computer <GradientText>Vision</GradientText> & <GradientText>NLP</GradientText>
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            AI solutions for image understanding, text analysis, and natural language interfaces tailored to your business.
          </motion.p>
        </div>
      </section>

      {/* Business Value Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">How <GradientText>CV & NLP</GradientText> Drive Business Value</h2>
          <p className="mt-3 text-white/70">A strong CV and NLP framework empowers businesses to tackle complex challenges, adapt to diverse use cases, and deliver scalable, accurate, and resilient solutions. By combining visual intelligence with language understanding, organizations can unlock new opportunities across industries.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Retail & E‑commerce"
            points={[
              "CV: Automated product tagging, visual search, quality inspection.",
              "NLP: Personalized recommendations, smarter search, AI chatbots."
            ]}
          />
          <Feature
            title="Healthcare"
            points={[
              "CV: Medical image analysis for diagnostics and anomaly detection.",
              "NLP: Patient data summarization, clinical notes, virtual assistants."
            ]}
          />
          <Feature
            title="Manufacturing"
            points={[
              "CV: Defect detection, predictive maintenance, real-time monitoring.",
              "NLP: Smart documentation workflows and compliance reporting."
            ]}
          />
          <Feature
            title="Financial Services"
            points={[
              "CV: Identity verification via document and facial recognition.",
              "NLP: Fraud detection, automated service, risk from unstructured data."
            ]}
          />
          <Feature
            title="Media & Entertainment"
            points={[
              "CV: Content moderation and tagging at scale.",
              "NLP: Captioning, summarization, personalized recommendations."
            ]}
          />
          <Feature
            title="Enterprise & Knowledge Work"
            points={[
              "CV: OCR and document digitization for unstructured archives.",
              "NLP: Knowledge retrieval, semantic search, AI copilots."
            ]}
          />
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-sky-600/20 px-6 py-16">
        <div className="absolute -inset-1 -z-10 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,0.20),transparent)]" />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to <GradientText>Deploy</GradientText> CV/NLP?</h3>
          <p className="mt-3 text-white/70">Kick off your project with a discovery session and roadmap.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-colors">
              <MousePointer2 className="mr-2 h-5 w-5" /> Start Now
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