import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Activity, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center section-padding text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-6"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase">
            Algorithmic NASDAQ Trading
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-gradient">Precision at scale</span>
          <span className="text-muted-foreground">:</span>
          <br />
          <span className="text-foreground/80">managing high‑notional risk</span>
          <br />
          <span className="text-foreground/80">with </span>
          <span className="text-electric/80 text-glow-blue">deterministic logic</span>
          <span className="text-muted-foreground">.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex items-center gap-2 text-muted-foreground hover:text-electric transition-colors duration-500 cursor-pointer group"
        >
          <Link to="/logic" className="flex items-center gap-2 text-sm tracking-wide">
            Explore the logic
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-20 w-px h-20 bg-gradient-to-b from-transparent via-silver to-transparent origin-top"
        />
      </section>

      {/* Highlights */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          {[
            {
              icon: Activity,
              title: "Order Flow Analysis",
              desc: "Real-time NASDAQ microstructure analysis with sub-millisecond response to market imbalances.",
            },
            {
              icon: Shield,
              title: "Risk Architecture",
              desc: "Adaptive position sizing with deterministic drawdown boundaries. No probabilistic guesswork.",
            },
            {
              icon: Zap,
              title: "FIX Connectivity",
              desc: "Ultra-low-latency execution via FIX Protocol with direct market access infrastructure.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="group">
                <item.icon
                  size={20}
                  className="text-silver group-hover:text-electric transition-colors duration-500 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-medium tracking-wide mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="section-padding border-t border-border/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: "<0.1ms", label: "Execution Latency" },
            { value: "99.97%", label: "Uptime" },
            { value: "24/5", label: "Market Coverage" },
            { value: "0", label: "Predictive Models" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-light text-foreground font-mono">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground tracking-wide mt-2 uppercase">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24" />
    </Layout>
  );
};

export default Index;
