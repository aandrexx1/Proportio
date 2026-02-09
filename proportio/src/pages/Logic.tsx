import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const flowSteps = [
  { id: "market", label: "Market Data Feed", sub: "NASDAQ L2/L3 · Tick-by-tick" },
  { id: "ingest", label: "Data Ingestion", sub: "FIX Protocol · Sub-ms latency" },
  { id: "analyze", label: "Imbalance Detection", sub: "Order Flow · VWAP deviation" },
  { id: "risk", label: "Risk Engine", sub: "Position sizing · Exposure limits" },
  { id: "execute", label: "Execution", sub: "Deterministic routing · Smart order" },
];

const Logic = () => {
  return (
    <Layout>
      <section className="section-padding min-h-[60vh] flex flex-col justify-center">
        <ScrollReveal>
          <span className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-6 block">
            Deterministic Logic
          </span>
          <h1 className="text-3xl md:text-5xl font-light leading-tight max-w-3xl mb-8">
            Reacting to what <span className="text-electric/70">is</span>,
            <br />not predicting what <span className="text-muted-foreground">might be</span>.
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-sm font-light">
            Proportio operates on a strictly deterministic framework. It identifies precise market
            imbalances in NASDAQ order flow—VWAP deviations, volume anomalies, and specific
            volatility triggers—and responds with predefined, rigorously tested logic. No neural
            networks. No sentiment analysis. No prediction.
          </p>
        </ScrollReveal>
      </section>

      {/* Decision Engine Diagram */}
      <section className="section-padding border-t border-border/30">
        <ScrollReveal>
          <h2 className="text-xl font-light mb-16 text-center text-muted-foreground">
            Data Flow Architecture
          </h2>
        </ScrollReveal>

        <div className="max-w-lg mx-auto space-y-0">
          {flowSteps.map((step, i) => (
            <ScrollReveal key={step.id} delay={i * 0.1}>
              <div className="flex flex-col items-center">
                <div className="group w-full border border-border/50 rounded-sm px-6 py-5 hover:border-electric/30 transition-all duration-500 bg-background/50 backdrop-blur-sm cursor-default">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{step.sub}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-silver group-hover:bg-electric transition-colors duration-500" />
                  </div>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="py-2">
                    <ArrowDown size={14} className="text-silver/50" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Risk Management */}
      <section className="section-padding border-t border-border/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <ScrollReveal>
            <span className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-6 block">
              Risk Framework
            </span>
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              High‑Notional Risk Management
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8">
              Position sizing adapts in real-time to current market conditions—volatility regime,
              liquidity depth, and correlation shifts. Hard limits are enforced at every layer:
              per-trade, per-sector, and portfolio-wide. No overrides. No manual intervention.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              {[
                { label: "Max Drawdown Threshold", value: "Deterministic" },
                { label: "Position Sizing", value: "Adaptive / Real-time" },
                { label: "Exposure Limits", value: "Multi-layered" },
                { label: "Correlation Monitoring", value: "Continuous" },
                { label: "Kill Switch", value: "Hardware-level" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center border-b border-border/30 pb-3 group">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="text-xs font-mono text-electric/70">{item.value}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-24" />
    </Layout>
  );
};

export default Logic;
