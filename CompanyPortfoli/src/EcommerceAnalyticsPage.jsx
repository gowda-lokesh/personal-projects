import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, CheckCircle2, ArrowRight, Target, Users, Brain, Zap } from "lucide-react";

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

      {/* Services Overview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Our <GradientText>E-commerce</GradientText> Solutions</h2>
          <p className="mt-3 text-white/70">Comprehensive analytics and insights to drive your online business growth and profitability.</p>
        </div>
        
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Feature 
            icon={ShoppingCart} 
            title="Customer Analytics" 
            desc="Deep insights into customer behavior, purchase patterns, and lifetime value to optimize your marketing strategies."
            features={[
              "Customer segmentation and profiling",
              "Purchase behavior analysis",
              "Lifetime value calculation",
              "Churn prediction and prevention"
            ]}
          />
          <Feature 
            icon={TrendingUp} 
            title="Sales Optimization" 
            desc="Advanced analytics to optimize product performance, pricing strategies, and conversion rates."
            features={[
              "Product performance analysis",
              "Dynamic pricing optimization",
              "Conversion rate optimization",
              "Inventory management insights"
            ]}
          />
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">E-commerce <GradientText>Dashboard</GradientText></h3>
          <p className="mt-3 text-white/70">Real-time metrics and insights to track your online store performance.</p>
        </div>
        
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-green-400" />
                <h4 className="text-lg font-semibold text-white">Revenue</h4>
              </div>
              <div className="text-3xl font-bold text-green-400">$127K</div>
              <p className="text-sm text-white/60 mt-2">+18% vs last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="h-6 w-6 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Orders</h4>
              </div>
              <div className="text-3xl font-bold text-blue-400">2,847</div>
              <p className="text-sm text-white/60 mt-2">+12% growth</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-yellow-400" />
                <h4 className="text-lg font-semibold text-white">Conversion Rate</h4>
              </div>
              <div className="text-3xl font-bold text-yellow-400">3.2%</div>
              <p className="text-sm text-white/60 mt-2">+0.5% improvement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-purple-400" />
                <h4 className="text-lg font-semibold text-white">Avg. Order Value</h4>
              </div>
              <div className="text-3xl font-bold text-purple-400">$89</div>
              <p className="text-sm text-white/60 mt-2">+$12 increase</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">Advanced <GradientText>E-commerce</GradientText> Features</h3>
            <p className="mt-3 text-white/70">Our comprehensive e-commerce analytics platform provides deep insights into your online business.</p>
            <ul className="mt-6 space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <Target className="h-5 w-5 text-green-400" />
                <span>Real-time sales and traffic monitoring</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-blue-400" />
                <span>Automated A/B testing and optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-purple-400" />
                <span>AI-powered product recommendations</span>
              </li>
              <li className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-yellow-400" />
                <span>Cart abandonment analysis and recovery</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent>
                <h4 className="text-lg font-semibold text-white">Analytics Coverage</h4>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Website traffic and user behavior</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Sales funnel and conversion tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Product performance and inventory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-white/70">Marketing campaign effectiveness</span>
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
          <h3 className="text-3xl font-bold">Ready to <GradientText>Optimize</GradientText> Your Store?</h3>
          <p className="mt-3 text-white/70">Get started with our e-commerce analytics to maximize your online business growth.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-colors">
              <ShoppingCart className="mr-2 h-5 w-5" /> Start Optimizing
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors">
              <ArrowRight className="mr-2 h-5 w-5" /> Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
