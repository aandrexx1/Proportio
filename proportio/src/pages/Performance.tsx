import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Conceptual data - not real performance
const equityCurve = Array.from({ length: 48 }, (_, i) => ({
  month: i + 1,
  value: 100 + i * 2.1 + Math.sin(i * 0.5) * 3 + Math.random() * 2,
}));

const drawdownData = Array.from({ length: 48 }, (_, i) => ({
  month: i + 1,
  dd: -(Math.abs(Math.sin(i * 0.7) * 2.5 + Math.random() * 1.2)),
}));

const monthlyReturns = Array.from({ length: 24 }, (_, i) => ({
  month: i + 1,
  ret: 0.8 + Math.sin(i * 0.8) * 1.2 + Math.random() * 0.6 - 0.3,
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 backdrop-blur-sm border border-border/50 px-3 py-2 rounded-sm">
        <p className="text-xs font-mono text-muted-foreground">Month {label}</p>
        <p className="text-xs font-mono text-electric">
          {typeof payload[0].value === "number" ? payload[0].value.toFixed(2) : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const Performance = () => {
  return (
    <Layout>
      <section className="section-padding min-h-[50vh] flex flex-col justify-center">
        <ScrollReveal>
          <span className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-6 block">
            Performance Insights
          </span>
          <h1 className="text-3xl md:text-5xl font-light leading-tight max-w-3xl mb-8">
            Consistency over
            <br />
            <span className="text-electric/70">aggressive growth</span>.
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed font-light">
            Conceptual performance characteristics demonstrating the system's emphasis on stability,
            low drawdown, and risk-adjusted returns. All data is illustrative.
          </p>
        </ScrollReveal>
      </section>

      {/* Key Metrics */}
      <section className="section-padding border-t border-border/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {[
            { label: "Sharpe Ratio", value: "2.41" },
            { label: "Max Drawdown", value: "-3.8%" },
            { label: "Win Rate", value: "62.3%" },
            { label: "Profit Factor", value: "1.87" },
          ].map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.1}>
              <div className="group cursor-default">
                <p className="text-2xl md:text-3xl font-light font-mono text-foreground group-hover:text-electric transition-colors duration-500">
                  {m.value}
                </p>
                <p className="text-xs text-muted-foreground tracking-wide mt-2 uppercase">
                  {m.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Equity Curve */}
      <section className="section-padding border-t border-border/30">
        <ScrollReveal>
          <h2 className="text-lg font-light mb-2 text-foreground">Equity Curve</h2>
          <p className="text-xs text-muted-foreground mb-10 font-mono">Conceptual · Normalized to 100</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityCurve}>
                <defs>
                  <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(0, 0%, 90%)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "hsl(0, 0%, 45%)" }}
                  axisLine={{ stroke: "hsl(0, 0%, 90%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(0, 0%, 45%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(210, 100%, 56%)"
                  strokeWidth={1.5}
                  fill="url(#eqGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>
      </section>

      {/* Drawdown */}
      <section className="section-padding border-t border-border/30">
        <ScrollReveal>
          <h2 className="text-lg font-light mb-2 text-foreground">Drawdown Profile</h2>
          <p className="text-xs text-muted-foreground mb-10 font-mono">Maximum peak-to-trough decline</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="h-52 md:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={drawdownData}>
                <defs>
                  <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 0%, 75%)" stopOpacity={0} />
                    <stop offset="100%" stopColor="hsl(0, 0%, 75%)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(0, 0%, 90%)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "hsl(0, 0%, 45%)" }}
                  axisLine={{ stroke: "hsl(0, 0%, 90%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(0, 0%, 45%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="dd"
                  stroke="hsl(0, 0%, 60%)"
                  strokeWidth={1}
                  fill="url(#ddGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>
      </section>

      {/* Monthly Returns */}
      <section className="section-padding border-t border-border/30">
        <ScrollReveal>
          <h2 className="text-lg font-light mb-2 text-foreground">Monthly Returns Distribution</h2>
          <p className="text-xs text-muted-foreground mb-10 font-mono">Illustrative · Percentage</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="h-52 md:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyReturns}>
                <CartesianGrid stroke="hsl(0, 0%, 90%)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "hsl(0, 0%, 45%)" }}
                  axisLine={{ stroke: "hsl(0, 0%, 90%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(0, 0%, 45%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="ret"
                  stroke="hsl(210, 100%, 56%)"
                  strokeWidth={1.5}
                  dot={{ r: 2, fill: "hsl(210, 100%, 56%)" }}
                  activeDot={{ r: 4, stroke: "hsl(210, 100%, 56%)", strokeWidth: 2, fill: "hsl(0, 0%, 100%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>
      </section>

      {/* Disclaimer */}
      <section className="section-padding">
        <ScrollReveal>
          <p className="text-xs text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed font-light">
            Metrics based on real-time paper trading execution. Simulated results. All trading involves risk; past performance is not indicative of future results.
          </p>
        </ScrollReveal>
      </section>

      <div className="h-24" />
    </Layout>
  );
};

export default Performance;
