"use client";

import Link from "next/link";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { BookOpen, Clock, Trophy, Flame, ChevronRight, Play, ArrowUpRight } from "lucide-react";

const stats = [
    { icon: BookOpen, label: "COURSES ENROLLED", value: 7, accentColor: "cyan" as const, change: { value: 2, positive: true } },
    { icon: Clock, label: "HOURS LEARNED", value: "148h", accentColor: "purple" as const, change: { value: 12, positive: true } },
    { icon: Trophy, label: "LABS COMPLETED", value: 43, accentColor: "green" as const, change: { value: 8, positive: true } },
    { icon: Flame, label: "DAY STREAK", value: "12🔥", accentColor: "orange" as const },
];

const enrolledCourses = [
    { title: "Web Application Hacking", progress: 68, category: "Pentesting", slug: "web-app-hacking", lastLesson: "Lesson 14: SQL Injection" },
    { title: "Network Intrusion Detection", progress: 32, category: "Network", slug: "network-intrusion", lastLesson: "Lesson 7: Packet Analysis" },
    { title: "Malware Analysis Fundamentals", progress: 91, category: "Malware", slug: "malware-fundamentals", lastLesson: "Lesson 19: Sandbox Evasion" },
    { title: "Digital Forensics & IR", progress: 15, category: "Forensics", slug: "digital-forensics", lastLesson: "Lesson 3: Evidence Collection" },
];

const activity = [
    { action: "Completed", item: "Lesson 13: XSS Fundamentals", time: "2h ago", icon: "✅" },
    { action: "Earned badge", item: "SQL Injection Master", time: "Yesterday", icon: "🏅" },
    { action: "Started", item: "Web Application Hacking — Lab 5", time: "2 days ago", icon: "🧪" },
    { action: "Joined", item: "CTF Competition: RedTeam Open", time: "3 days ago", icon: "🏴" },
];

export default function DashboardPage() {
    return (
        <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.08em" }}>
                    WELCOME BACK
                </div>
                <h1 style={{ fontSize: 30, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                    Hey, Waqas 👋
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                    You're on a 12-day streak. Keep it up!
                </p>
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 36 }}>
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* Main grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
                {/* Left — courses */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)" }}>Continue Learning</h2>
                        <Link href="/courses" style={{ fontSize: 13, color: "var(--cyan)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                            All Courses <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {enrolledCourses.map((c) => (
                            <div key={c.slug} className="glass-card" style={{ padding: 20, display: "flex", gap: 16, alignItems: "center" }}>
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 12,
                                        background: "rgba(0,240,255,0.06)",
                                        border: "1px solid rgba(0,240,255,0.12)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        fontSize: 20,
                                    }}
                                >
                                    {c.category === "Pentesting" ? "⚔️" : c.category === "Network" ? "🔗" : c.category === "Malware" ? "🦠" : "🔍"}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "75%" }}>
                                            {c.title}
                                        </h3>
                                        <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--cyan)", flexShrink: 0 }}>{c.progress}%</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10, fontFamily: "var(--font-mono)" }}>
                                        {c.lastLesson}
                                    </div>
                                    <ProgressBar value={c.progress} color="cyan" height={4} />
                                </div>
                                <Link
                                    href={`/courses/${c.slug}/learn`}
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: "rgba(0,240,255,0.08)",
                                        border: "1px solid rgba(0,240,255,0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textDecoration: "none",
                                        flexShrink: 0,
                                        transition: "all 0.15s",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.18)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0,240,255,0.3)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.08)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                    }}
                                >
                                    <Play size={14} color="var(--cyan)" fill="var(--cyan)" style={{ marginLeft: 2 }} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Activity feed */}
                <div>
                    <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
                        Recent Activity
                    </h2>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {activity.map((a, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        gap: 14,
                                        padding: "14px 0",
                                        borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none",
                                    }}
                                >
                                    <div style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{a.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>
                                            <span style={{ color: "var(--text-secondary)" }}>{a.action}: </span>{a.item}
                                        </div>
                                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3, fontFamily: "var(--font-mono)" }}>{a.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="#" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--cyan)", textDecoration: "none", marginTop: 12 }}>
                            View full activity <ArrowUpRight size={12} />
                        </Link>
                    </div>

                    {/* Quick links */}
                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            { label: "🏆 Leaderboard", href: "/leaderboard" },
                            { label: "🧪 Open Labs", href: "/labs" },
                            { label: "📋 My Certificates", href: "#" },
                        ].map((l) => (
                            <Link
                                key={l.label}
                                href={l.href}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "12px 16px",
                                    borderRadius: 10,
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border)",
                                    textDecoration: "none",
                                    fontSize: 14,
                                    color: "var(--text-secondary)",
                                    transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                                }}
                            >
                                {l.label}
                                <ChevronRight size={14} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
