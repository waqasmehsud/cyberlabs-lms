"use client";

import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { Users, BookOpen, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";

const kpis = [
    { icon: Users, label: "TOTAL STUDENTS", value: "12,438", accentColor: "cyan" as const, change: { value: 18, positive: true } },
    { icon: BookOpen, label: "ACTIVE COURSES", value: 241, accentColor: "purple" as const, change: { value: 3, positive: true } },
    { icon: DollarSign, label: "REVENUE (USD)", value: "$48.2k", accentColor: "green" as const, change: { value: 22, positive: true } },
    { icon: TrendingUp, label: "COMPLETION RATE", value: "73%", accentColor: "orange" as const, change: { value: 5, positive: true } },
];

const topCourses = [
    { title: "Web Application Hacking", students: 3200, completion: 68, revenue: "$12,400" },
    { title: "CTF Starter Pack", students: 6800, completion: 84, revenue: "$8,200" },
    { title: "Bug Bounty Hunting Mastery", students: 4200, completion: 71, revenue: "$9,800" },
    { title: "Active Directory Attacks", students: 3400, completion: 62, revenue: "$11,200" },
    { title: "Malware Analysis Fundamentals", students: 5100, completion: 79, revenue: "$6,100" },
];

const recentEnrollments = [
    { name: "Sarah K.", course: "Web App Hacking", time: "5 min ago", avatar: "SK" },
    { name: "Marcus L.", course: "CTF Starter Pack", time: "12 min ago", avatar: "ML" },
    { name: "Fatima A.", course: "Bug Bounty Mastery", time: "28 min ago", avatar: "FA" },
    { name: "James W.", course: "AD Attacks", time: "1h ago", avatar: "JW" },
    { name: "Priya M.", course: "Malware Analysis", time: "2h ago", avatar: "PM" },
];

const avatarColors = ["#7c3aed", "#00c8d4", "#22c55e", "#f97316", "#ec4899"];

export default function AdminDashboardPage() {
    return (
        <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.08em" }}>ADMIN PANEL</div>
                <h1 style={{ fontSize: 30, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                    Platform <span style={{ color: "var(--cyan)" }}>Overview</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Real-time analytics for CYBERLABS platform</p>
            </div>

            {/* KPI cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 36 }}>
                {kpis.map((k) => <StatCard key={k.label} {...k} />)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
                {/* Top courses table */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)" }}>Top Performing Courses</h2>
                        <a href="/admin/courses" style={{ fontSize: 13, color: "var(--cyan)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                            Manage All <ArrowUpRight size={13} />
                        </a>
                    </div>
                    <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                    {["Course", "Students", "Completion", "Revenue"].map((h) => (
                                        <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {topCourses.map((c, i) => (
                                    <tr key={c.title} style={{ borderBottom: i < topCourses.length - 1 ? "1px solid var(--border)" : "none" }}>
                                        <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{c.title}</td>
                                        <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-secondary)" }}>{c.students.toLocaleString()}</td>
                                        <td style={{ padding: "14px 16px", minWidth: 120 }}>
                                            <ProgressBar value={c.completion} color="cyan" height={4} showLabel />
                                        </td>
                                        <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--green)", fontFamily: "var(--font-mono)" }}>{c.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent enrollments */}
                <div>
                    <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
                        Recent Enrollments
                    </h2>
                    <div className="glass-card" style={{ padding: 16 }}>
                        {recentEnrollments.map((e, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < recentEnrollments.length - 1 ? "1px solid var(--border)" : "none" }}>
                                <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColors[i % 5], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0 }}>
                                    {e.avatar}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{e.name}</div>
                                    <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Enrolled in {e.course}</div>
                                </div>
                                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{e.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
