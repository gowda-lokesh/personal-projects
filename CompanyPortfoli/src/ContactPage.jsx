import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Home, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{children}</span>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  // API endpoint: use Vercel/Railway provided base URL
  const API_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/api/contact`;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const company = (formData.company || '').trim();
    const message = formData.message.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name) errors.name = "Name is required";
    else if (name.length < 2 || name.length > 100) errors.name = "Name must be 2-100 characters";

    if (!email) errors.email = "Email is required";
    else if (!emailOk || email.length > 254) errors.email = "Enter a valid email";

    if (company && company.length > 150) errors.company = "Company is too long";

    if (!message) errors.message = "Message is required";
    else if (message.length < 10 || message.length > 5000) errors.message = "Message must be 10-5000 characters";

    setFieldErrors(errors);
    return Object.keys(errors).length ? "Please fix the highlighted fields." : "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ state: "error", message: err });
      return;
    }
    setStatus({ state: "submitting", message: "" });
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const data = await res.json();
      
      if (!res.ok) {
        setFieldErrors({});
        if (data && data.error) {
          throw new Error(data.error);
        }
        throw new Error("Failed to send. Please try again.");
      }
      
      setStatus({ state: "success", message: "Thank you for your request. Our team will get in touch with you shortly" });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      if (error.name === 'AbortError') {
        setStatus({ state: "error", message: "Request timed out. Please try again." });
      } else {
        setStatus({ state: "error", message: error.message || "Something went wrong. Please try again." });
      }
    }
  };

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
          <motion.h2 className="mt-2 max-w-3xl text-3xl font-bold md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Tell us about your <GradientText>project</GradientText>
          </motion.h2>
          <motion.p className="mt-3 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>
            We typically respond within one business day. Attach as much detail as you can.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <Card>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <label className="block text-sm text-white/70 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input name="name" value={formData.name} onChange={onChange} placeholder="Jane Doe" className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400" aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'name-error' : undefined} />
                  {fieldErrors.name && <div id="name-error" className="mt-1 text-xs text-red-400">{fieldErrors.name}</div>}
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm text-white/70 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input name="email" type="email" value={formData.email} onChange={onChange} placeholder="jane@company.com" className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'email-error' : undefined} />
                  {fieldErrors.email && <div id="email-error" className="mt-1 text-xs text-red-400">{fieldErrors.email}</div>}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/70 mb-2">Company (optional)</label>
                <input name="company" value={formData.company} onChange={onChange} placeholder="Acme Inc." className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400" aria-invalid={!!fieldErrors.company} aria-describedby={fieldErrors.company ? 'company-error' : undefined} />
                {fieldErrors.company && <div id="company-error" className="mt-1 text-xs text-red-400">{fieldErrors.company}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/70 mb-2">Project Details</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <textarea name="message" value={formData.message} onChange={onChange} rows={6} placeholder="Scope, goals, timeline, budget, links..." className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400" aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? 'message-error' : undefined} />
                  {fieldErrors.message && <div id="message-error" className="mt-1 text-xs text-red-400">{fieldErrors.message}</div>}
                </div>
              </div>
              <div className="md:col-span-2 flex items-center justify-between gap-3 flex-wrap">
                <div className="text-xs text-white/60">By submitting, you agree to our processing of your information for contact purposes.</div>
                <button type="submit" disabled={status.state === "submitting"} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl text-sm disabled:opacity-60">
                  {status.state === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>) : (<>Send Request</>)}
                </button>
              </div>
              {status.state === "success" && (
                <div className="md:col-span-2 flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="h-4 w-4" /> {status.message}
                </div>
              )}
              {status.state === "error" && (
                <div className="md:col-span-2 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" /> {status.message}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


