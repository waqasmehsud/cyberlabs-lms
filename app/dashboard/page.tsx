"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { BookOpen, Clock, Trophy, Flame, ChevronRight, Play, ArrowUpRight, Loader2 } from "lucide-react";

interface EnrolledCourse {
    slug: string;
    title: string;
    category: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    lastLesson: string;
}

interface DashboardData {
    user: { name: string; email: string };
    stats: {
        coursesEnrolled: number;
        labsCompleted: number;
        streak: number;
        hoursLearned: number;
    };
    enrolledCourses: EnrolledCourse[];
}

const activity = [
    { action: "Completed", item: "Lesson: XSS Fundamentals", time: "2h ago", icon: "✅" },
    { action: "Earned badge", item: "SQL Injection Master", time: "Yesterday", icon: "🏅" },
    { action: "Started", item: "Web Hacking — Lab 5", time: "2 days ago", icon: "🧪" },
    { action: "Joined", item: "CTF Competition: RedTeam Open", time: "3 days ago", icon: "🏴" },
];

const categoryIcon: Record<string, string> = {
    "Web Security": "⚔️", Pentesting: "⚔️", Network: "🔗", Malware: "🦠", Forensics: "🔍", Cryptography: "🔑", CTF: "🏴",
};

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((r) => r.json())
            .then((d) => {
                if (d.user) setData(d);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
                <Loader2 size={32} color="var(--cyan)" style={{ animation: "spin 1s linear infinite" }} />
            </div>
        );
    }

    const stats = data
        ? [
            { icon: BookOpen, label: "COURSES ENROLLED", value: data.stats.coursesEnrolled, accentColor: "cyan" as const, change: { value: 2, positive: true } },
            { icon: Clock, label: "HOURS LEARNED", value: `${data.stats.hoursLearned}h`, accentColor: "purple" as const, change: { value: 12, positive: true } },
            { icon: Trophy, label: "LABS COMPLETED", value: data.stats.labsCompleted, accentColor: "green" as const, change: { value: 8, positive: true } },
            { icon: Flame, label: "DAY STREAK", value: `${data.stats.streak}🔥`, accentColor: "orange" as const },
        ]
        : [];

    const enrolledCourses = data?.enrolledCourses ?? [];
    const userName = data?.user?.name ?? "Learner";

    return (
        <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.08em" }}>
                    WELCOME BACK
                </div>
                <h1 style={{ fontSize: 30, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                    Hey, {userName} 👋
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                    {data?.stats.streak ? `You're on a ${data.stats.streak}-day streak. Keep it up!` : "Start learning to build your streak!"}
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

                    {enrolledCourses.length === 0 ? (
                        <div className="glass-card" style={{ padding: 40, textAlign: "center" }}>
                            <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
                            <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>You haven't enrolled in any courses yet.</p>
                            <Link href="/courses" className="btn-cyber btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {enrolledCourses.map((c) => (
                                <div key={c.slug} className="glass-card" style={{ padding: 20, display: "flex", gap: 16, alignItems: "center" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
                                        {categoryIcon[c.category] ?? "📘"}
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
                                        style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0, transition: "all 0.15s" }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.18)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0,240,255,0.3)"; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                                    >
                                        <Play size={14} color="var(--cyan)" fill="var(--cyan)" style={{ marginLeft: 2 }} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right — Activity feed */}
                <div>
                    <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
                        Recent Activity
                    </h2>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {activity.map((a, i) => (
                                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none" }}>
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
                                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border)", textDecoration: "none", fontSize: 14, color: "var(--text-secondary)", transition: "all 0.15s" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
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
