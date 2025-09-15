
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, MousePointer2, Rocket, Stars, PlayCircle, ArrowRight, ArrowDown, CheckCircle2, TrendingUp, BarChart3, DollarSign, ChevronDown, ShoppingCart } from "lucide-react";

const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = {
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-2xl",
  };
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-400 ring-offset-transparent",
    secondary: "bg-white/10 text-white hover:bg-white/20 ring-offset-transparent",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

// Magnetic component creates a magnetic effect on hover
// It tracks mouse position and applies subtle movement and rotation to child elements
const Magnetic = ({ strength = 0.3, children }) => {
  const ref = useRef(null);
  // State to track position and rotation values
  const [pos, setPos] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  
  // Handle mouse movement to calculate magnetic effect
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    // Calculate distance from center of element
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    // Apply strength multiplier and calculate rotation for 3D effect
    setPos({ x: x * strength, y: y * strength, rx: y * 0.02, ry: -x * 0.02 });
  };
  
  // Reset position when mouse leaves the element
  const onLeave = () => setPos({ x: 0, y: 0, rx: 0, ry: 0 });
  
  return (
    <div 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave} 
      className="inline-block will-change-transform" 
      style={{ transform: `translate(${pos.x}px, ${pos.y}px) rotateX(${pos.rx}deg) rotateY(${pos.ry}deg)` }}
    >
      {children}
    </div>
  );
};

// CursorGlow component creates a glowing effect that follows the mouse cursor
// It renders a radial gradient background that moves with the cursor position
const CursorGlow = () => {
  // State to track cursor position (initialized off-screen)
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  
  useEffect(() => {
    // Event listener to update cursor position
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[1]" 
      style={{ 
        background: `radial-gradient(240px 240px at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.25), transparent 60%)` 
      }} 
    />
  );
};

const Noise = () => (
  <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.06] mix-blend-soft-light" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'1200\\' height=\\'1200\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.65\\' numOctaves=\\'2\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.35\\'/></svg>')" }} />
);

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{children}</span>
);

const ParallaxBanner = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-60vh"]);
  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden">
      <motion.div style={{ y: y2 }} className="absolute inset-0 bg-gradient-to-b from-[#0b0b13] to-[#0f0f1c]" />
      <motion.div aria-hidden style={{ y: y1, backgroundImage: "radial-gradient(1000px 600px at 20% 10%, rgba(168,85,247,0.25), transparent), radial-gradient(800px 500px at 80% 40%, rgba(59,130,246,0.25), transparent)" }} className="absolute inset-0 opacity-30" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <Stars className="h-3.5 w-3.5" />
            Data Science Solutions
          </div>
        </motion.div>
        <motion.h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }} viewport={{ once: true }}>
          Transform Your Business with <GradientText>Data Science</GradientText>.
        </motion.h1>
                  <motion.p className="mt-4 max-w-2xl text-white/70" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}>
            Advanced analytics solutions including demand forecasting, regression analysis, and pricing optimization to drive your business growth.
          </motion.p>
        <div className="mt-8 flex items-center gap-3">
          <Magnetic>
            <Button size="lg" className="shadow-2xl shadow-indigo-500/20">
              <Rocket className="mr-2 h-5 w-5" /> Get Started
            </Button>
          </Magnetic>
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_115%,rgba(255,255,255,0.3),transparent)]" />
    </section>
  );
};

const Marquee = () => (
  <div className="relative isolate overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
    <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-[marquee_28s_linear_infinite] whitespace-nowrap py-3 text-sm text-white/60">
        <span className="mx-8">📊 Advanced Analytics</span>
        <span className="mx-8">🎯 Predictive Modeling</span>
        <span className="mx-8">🧠 Machine Learning</span>
        <span className="mx-8">📈 Demand Forecasting</span>
        <span className="mx-8">💰 Revenue Optimization</span>
        <span className="mx-8">🔍 Data Insights</span>
        <span className="mx-8">⚡ Real-time Processing</span>
        <span className="mx-8">🎯 Business Intelligence</span>
      </div>
    </div>
    <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
  </div>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
    <Card className="group relative h-full overflow-hidden p-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-blue-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <CardContent className="relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{desc}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Learn More</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// TiltCard component creates a 3D tilt effect on hover
// It tracks mouse position and applies rotation to create a realistic tilt effect
const TiltCard = ({ children }) => {
  const ref = useRef(null);
  // State to track rotation values for X and Y axes
  const [t, setT] = useState({ rx: 0, ry: 0 });
  
  // Handle mouse movement to calculate tilt effect
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    // Calculate distance from center of element
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    // Apply rotation based on mouse position relative to element size
    setT({ rx: (y / r.height) * -10, ry: (x / r.width) * 10 });
  };
  
  return (
    <div 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={() => setT({ rx: 0, ry: 0 })} 
      className="will-change-transform" 
      style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
    >
      {children}
    </div>
  );
};

const ImageReveal = ({ src, alt }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl bg-white/10">
      <img src={src} alt={alt} className="w-full" />
      <motion.div initial={{ clipPath: "inset(0% 0% 0% 0%)" }} animate={{ clipPath: inView ? "inset(0% 0% 0% 100%)" : "inset(0% 0% 0% 0%)" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 bg-[#0b0b13]" />
    </div>
  );
};

// Dropdown component for navigation
const Dropdown = ({ label, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-white transition-colors duration-200"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl z-50"
        >
          <div className="py-2">
            {React.Children.map(children, child => 
              React.cloneElement(child, { onItemClick: closeDropdown })
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const DropdownItem = ({ href, children, onItemClick }) => (
  <a
    href={href}
    onClick={onItemClick}
    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
  >
    {children}
  </a>
);

export default function StartupLandingPage() {
  const { scrollYProgress } = useScroll();
  const headerBg = useTransform(scrollYProgress, [0, 0.1], ["transparent", "rgba(11,11,19,0.7)"]);
  const headerBorder = useTransform(scrollYProgress, [0, 0.1], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);
  return (
    <div className="relative min-h-screen bg-[#0b0b13] text-white selection:bg-fuchsia-500/30">
      <CursorGlow />
      <Noise />
      <motion.header style={{ backgroundColor: headerBg, borderBottomColor: headerBorder }} className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-indigo-400" /><span className="font-semibold">Vishnu Labs</span></div>
          <nav className="hidden gap-6 md:flex text-white/80">
            <Dropdown label="Features">
              <DropdownItem href="/demand-forecasting">Demand Forecasting</DropdownItem>
              <DropdownItem href="/predictive-analytics">Regression Analytics</DropdownItem>
              <DropdownItem href="/pricing-promotion-analytics">Pricing Analytics</DropdownItem>
              <DropdownItem href="/classification-anomaly-detection">Classification & Detection</DropdownItem>
              <DropdownItem href="/computer-vision-nlp">Computer Vision & NLP</DropdownItem>
              <DropdownItem href="/generative-ai-llm">Generative AI & LLMs</DropdownItem>
              <DropdownItem href="/data-business-insights">Data & Business Insights</DropdownItem>
              <DropdownItem href="/ecommerce-analytics">E-commerce Analytics</DropdownItem>
            </Dropdown>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </motion.header>
      <ParallaxBanner />
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <Marquee />
      </section>
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Our <GradientText>Data Science</GradientText> Services</h2>
          <p className="mt-3 text-white/70">Comprehensive analytics solutions designed to unlock insights and drive business decisions.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <TiltCard>
            <a href="/demand-forecasting" className="block h-full">
              <Feature icon={TrendingUp} title="Demand Forecasting" desc="ARIMA, SARIMA, and Delphi models for accurate demand prediction and planning." />
            </a>
          </TiltCard>
          <TiltCard>
            <a href="/predictive-analytics" className="block h-full">
              <Feature icon={BarChart3} title="Regression Analytics" desc="Decision Trees, Light GBM, and XGBoost for advanced predictive modeling." />
            </a>
          </TiltCard>
          <TiltCard>
            <a href="/pricing-promotion-analytics" className="block h-full">
              <Feature icon={DollarSign} title="Pricing Analytics" desc="Dynamic pricing strategies and promotion optimization for revenue maximization." />
            </a>
          </TiltCard>
          <TiltCard>
            <a href="/classification-anomaly-detection" className="block h-full">
              <Feature icon={CheckCircle2} title="Classification & Detection" desc="Advanced ML models for pattern recognition, fraud detection, and outlier identification." />
            </a>
          </TiltCard>
          <TiltCard>
            <a href="/computer-vision-nlp" className="block h-full">
              <Feature icon={MousePointer2} title="Computer Vision & NLP" desc="AI solutions for image recognition, text analysis, and natural language understanding." />
            </a>
          </TiltCard>
          <TiltCard>
            <a href="/generative-ai-llm" className="block h-full">
              <Feature icon={Sparkles} title="Generative AI & LLMs" desc="Large Language Models and generative AI for content creation and automation." />
            </a>
          </TiltCard>
          <TiltCard>
            <a href="/data-business-insights" className="block h-full">
              <Feature icon={BarChart3} title="Data & Business Insights" desc="Transform raw data into actionable business insights with comprehensive analytics." />
            </a>
          </TiltCard>
          <TiltCard>
            <a href="/ecommerce-analytics" className="block h-full">
              <Feature icon={ShoppingCart} title="E-commerce Analytics" desc="Optimize your online store with advanced analytics and customer insights." />
            </a>
          </TiltCard>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">Case Study.</h3>
            <p className="mt-3 text-white/70">Check out our case study on data science projects and success stories.</p>
            <a href="/case-studies" className="mt-3 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300">
              
            </a>
            <ul className="mt-6 space-y-2 text-white/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Demand Forecasting</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Regression Analytics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Pricing Analytics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Classification & Detection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Computer Vision & NLP</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Generative AI & LLMs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Data & Business Insights</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> E-commerce Analytics</li>
            </ul>
          </div>
          <div className="relative group">
            <ImageReveal src="https://dummyimage.com/1200x800/1a1a2e/ffffff&text=Case+Studies+UI" alt="Case Studies UI" />
            <a href="/case-studies" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="lg" className="shadow-2xl shadow-indigo-500/20">
                <ArrowRight className="mr-2 h-5 w-5" /> Read more
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      <section id="pricing" className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-600/20 via-fuchsia-600/10 to-sky-600/20 px-6 py-16">
        <div className="absolute -inset-1 -z-10 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,0.20),transparent)]" />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to transform with <GradientText>Data Science</GradientText>?</h3>
          <p className="mt-3 text-white/70">Get started with our advanced analytics solutions and unlock the power of your data.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Magnetic>
              <a href="/contact">
                <Button size="lg" className="shadow-2xl shadow-indigo-500/20">
                  <Rocket className="mr-2 h-5 w-5" /> Contact
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="/case-studies">
                <Button variant="secondary" size="lg">
                  <ArrowRight className="mr-2 h-5 w-5" /> View Case Studies
                </Button>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
      <footer className="mx-auto mt-16 max-w-7xl px-6 pb-16 text-white/60">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-2 text-white/70"><Sparkles className="h-4 w-4 text-indigo-400" /> Vishnu Labs</div>
          <p className="text-sm">© {new Date().getFullYear()} Vishnu Labs. All rights reserved.</p>
        </div>
      </footer>
      <style>{`html,body,#root{background:#0b0b13}`}</style>
    </div>
  );
}