import Link from "next/link";
import { Shield, Zap, Trophy, BookOpen, ArrowRight, ChevronRight, Star, Users, Clock, Terminal } from "lucide-react";

const features = [
  { icon: Shield, title: "Security-First Curriculum", description: "Hands-on offensive and defensive security labs built by industry experts.", color: "cyan" },
  { icon: Zap, title: "Interactive Labs", description: "Real vulnerable machines you can attack in a safe, isolated environment.", color: "purple" },
  { icon: Trophy, title: "CTF Challenges", description: "Compete with learners worldwide and earn badges for your skill tree.", color: "green" },
  { icon: Terminal, title: "Live Cyber Range", description: "Practice against live simulated networks with guided attack scenarios.", color: "orange" },
];

const stats = [
  { value: "12,400+", label: "Active Learners" },
  { value: "240+", label: "Security Courses" },
  { value: "1,500+", label: "Lab Challenges" },
  { value: "98%", label: "Satisfaction Rate" },
];

const courses = [
  { title: "Web Application Hacking", category: "Pentesting", level: "Intermediate", rating: 4.9, students: 3200, duration: "24h", slug: "web-app-hacking" },
  { title: "Network Intrusion Detection", category: "Network", level: "Advanced", rating: 4.8, students: 1800, duration: "32h", slug: "network-intrusion" },
  { title: "Malware Analysis Fundamentals", category: "Malware", level: "Beginner", rating: 4.7, students: 5100, duration: "18h", slug: "malware-fundamentals" },
  { title: "Cryptography & PKI Deep Dive", category: "Cryptography", level: "Advanced", rating: 4.9, students: 2400, duration: "28h", slug: "crypto-pki" },
  { title: "Bug Bounty Hunting Mastery", category: "Web Security", level: "Intermediate", rating: 4.8, students: 4200, duration: "20h", slug: "bug-bounty" },
  { title: "Digital Forensics & IR", category: "Forensics", level: "Intermediate", rating: 4.7, students: 2100, duration: "26h", slug: "digital-forensics" },
];

const levelColor: Record<string, string> = {
  Beginner: "badge-green",
  Intermediate: "badge-cyan",
  Advanced: "badge-purple",
};

export default function LandingPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── Hero ─────────────────────────────────────── */}
      <section
        style={{
          minHeight: "calc(100vh - var(--topbar-height))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
          {/* Cyber grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,240,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <div className="badge badge-cyan animate-fadeup" style={{ marginBottom: 24 }}>
            🛡️ &nbsp; CYBERSECURITY LEARNING PLATFORM
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 24,
            }}
            className="animate-fadeup"
          >
            Master{" "}
            <span style={{ color: "var(--cyan)", textShadow: "0 0 32px rgba(0,240,255,0.4)" }}>
              Cyber Security
            </span>
            <br /> Through Real{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #7c3aed, #00f0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Attack Labs
            </span>
          </h1>

          <p style={{ fontSize: 18, color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }} className="animate-fadeup">
            Learn by hacking. CYBERLABS gives you real vulnerable environments, expert-led courses, and live CTF competitions to build job-ready security skills.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }} className="animate-fadeup">
            <Link href="/register" className="btn-cyber btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>
              Start Learning Free <ArrowRight size={16} />
            </Link>
            <Link href="/courses" className="btn-cyber btn-outline" style={{ fontSize: 15, padding: "14px 32px" }}>
              Browse Courses
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: 40, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {[{ icon: "🏆", text: "Top Security Platform 2025" }, { icon: "⭐", text: "4.9/5 Student Rating" }, { icon: "🔐", text: "Industry Certified Labs" }].map((b) => (
              <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-muted)" }}>
                <span>{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(13,17,23,0.8)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 32, color: "var(--cyan)", textShadow: "0 0 16px rgba(0,240,255,0.3)" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ─────────────────────────────────── */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--text-primary)", marginBottom: 16 }}>
              Why{" "}
              <span style={{ color: "var(--cyan)" }}>CYBERLABS</span>?
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto", fontSize: 16 }}>
              Everything you need to go from beginner to professional penetration tester.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {features.map(({ icon: Icon, title, description, color }) => (
              <div key={title} className="glass-card" style={{ padding: 28 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: color === "cyan" ? "rgba(0,240,255,0.08)" : color === "purple" ? "rgba(124,58,237,0.1)" : color === "green" ? "rgba(34,197,94,0.08)" : "rgba(249,115,22,0.08)",
                    border: `1px solid ${color === "cyan" ? "rgba(0,240,255,0.2)" : color === "purple" ? "rgba(124,58,237,0.25)" : color === "green" ? "rgba(34,197,94,0.2)" : "rgba(249,115,22,0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon size={24} color={color === "cyan" ? "var(--cyan)" : color === "purple" ? "#a78bfa" : color === "green" ? "var(--green)" : "var(--orange)"} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Preview ────────────────────────────── */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--text-primary)", marginBottom: 8 }}>
                Featured <span style={{ color: "var(--cyan)" }}>Courses</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Start your journey with our most popular security tracks.</p>
            </div>
            <Link href="/courses" className="btn-cyber btn-outline" style={{ padding: "10px 22px", fontSize: 13 }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {courses.map((c) => (
              <Link key={c.slug} href={`/courses/${c.slug}`} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span className="badge badge-cyan" style={{ fontSize: 10 }}>{c.category}</span>
                    <span className={`badge ${levelColor[c.level]}`} style={{ fontSize: 10 }}>{c.level}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{c.title}</h3>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--text-muted)", marginTop: "auto" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {c.duration}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={12} /> {c.students.toLocaleString()}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#fbbf24", marginLeft: "auto" }}><Star size={12} fill="#fbbf24" /> {c.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            padding: "64px 40px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(0,240,255,0.08) 100%)",
            border: "1px solid rgba(0,240,255,0.15)",
            boxShadow: "0 0 60px rgba(0,240,255,0.06)",
          }}
        >
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "var(--text-primary)", marginBottom: 16 }}>
            Ready to Start Hacking?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            Join 12,400+ security professionals learning hands-on skills that employers actually value.
          </p>
          <Link href="/register" className="btn-cyber btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
            Get Started — It's Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
