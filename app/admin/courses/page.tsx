"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical } from "lucide-react";

const courses = [
    { id: 1, title: "Web Application Hacking", category: "Web Security", level: "Intermediate", students: 3200, status: "Published", revenue: "$12,400", slug: "web-app-hacking" },
    { id: 2, title: "Network Intrusion Detection", category: "Network", level: "Advanced", students: 1800, status: "Published", revenue: "$8,100", slug: "network-intrusion" },
    { id: 3, title: "Malware Analysis Fundamentals", category: "Malware", level: "Beginner", students: 5100, status: "Published", revenue: "$6,100", slug: "malware-fundamentals" },
    { id: 4, title: "Cryptography & PKI Deep Dive", category: "Cryptography", level: "Advanced", students: 2400, status: "Draft", revenue: "$0", slug: "crypto-pki" },
    { id: 5, title: "Bug Bounty Hunting Mastery", category: "Web Security", level: "Intermediate", students: 4200, status: "Published", revenue: "$9,800", slug: "bug-bounty" },
    { id: 6, title: "Digital Forensics & IR", category: "Forensics", level: "Intermediate", students: 2100, status: "Published", revenue: "$7,200", slug: "digital-forensics" },
    { id: 7, title: "Active Directory Attacks", category: "Pentesting", level: "Advanced", students: 3400, status: "Published", revenue: "$11,200", slug: "active-directory" },
    { id: 8, title: "Cloud Security Fundamentals", category: "Network", level: "Intermediate", students: 2900, status: "Review", revenue: "$0", slug: "cloud-security" },
];

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
    Published: { bg: "rgba(34,197,94,0.1)", color: "var(--green)", border: "rgba(34,197,94,0.25)" },
    Draft: { bg: "rgba(255,255,255,0.04)", color: "var(--text-muted)", border: "var(--border)" },
    Review: { bg: "rgba(249,115,22,0.1)", color: "var(--orange)", border: "rgba(249,115,22,0.25)" },
};

export default function AdminCoursesPage() {
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
                <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.08em" }}>ADMIN PANEL</div>
                    <h1 style={{ fontSize: 30, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                        Course <span style={{ color: "var(--cyan)" }}>Manager</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>{courses.length} total courses in the platform</p>
                </div>
                <button className="btn-cyber btn-primary" style={{ padding: "11px 22px" }}>
                    <Plus size={16} /> Create Course
                </button>
            </div>

            {/* Filters row */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
                    <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                    <input
                        type="text"
                        placeholder="Search by title or category…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-cyber"
                        style={{ paddingLeft: 36 }}
                    />
                </div>
                {["All", "Published", "Draft", "Review"].map((s) => (
                    <button key={s} className="btn-cyber btn-ghost" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "9px 16px", fontSize: 13 }}>
                        {s}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="glass-card" style={{ overflow: "hidden", padding: 0 }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                {["Course Title", "Category", "Level", "Students", "Revenue", "Status", "Actions"].map((h) => (
                                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((c, i) => {
                                const ss = statusStyle[c.status];
                                return (
                                    <tr
                                        key={c.id}
                                        style={{
                                            borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                                            transition: "background 0.15s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                        <td style={{ padding: "14px 16px" }}>
                                            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{c.title}</div>
                                        </td>
                                        <td style={{ padding: "14px 16px" }}>
                                            <span className="badge badge-cyan" style={{ fontSize: 11 }}>{c.category}</span>
                                        </td>
                                        <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-secondary)" }}>{c.level}</td>
                                        <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                                            {c.students.toLocaleString()}
                                        </td>
                                        <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--green)", fontFamily: "var(--font-mono)" }}>{c.revenue}</td>
                                        <td style={{ padding: "14px 16px" }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontFamily: "var(--font-mono)", background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "14px 16px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                <Link
                                                    href={`/courses/${c.slug}`}
                                                    style={{ width: 30, height: 30, borderRadius: 8, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", cursor: "pointer", textDecoration: "none", transition: "all 0.15s" }}
                                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                                                >
                                                    <Eye size={13} />
                                                </Link>
                                                <button style={{ width: 30, height: 30, borderRadius: 8, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", cursor: "pointer", transition: "all 0.15s" }}
                                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#a78bfa"; (e.currentTarget as HTMLElement).style.color = "#a78bfa"; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                                                    <Edit2 size={13} />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(c.id === deleteId ? null : c.id)}
                                                    style={{ width: 30, height: 30, borderRadius: 8, background: "var(--bg-card)", border: `1px solid ${deleteId === c.id ? "rgba(239,68,68,0.4)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: deleteId === c.id ? "var(--red)" : "var(--text-muted)", cursor: "pointer", transition: "all 0.15s" }}
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div style={{ padding: "48px", textAlign: "center", color: "var(--text-muted)" }}>
                        No courses match your search.
                    </div>
                )}

                {/* Table footer */}
                <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        SHOWING {filtered.length} / {courses.length} COURSES
                    </span>
                    <div style={{ display: "flex", gap: 6 }}>
                        {[1, 2, 3].map((p) => (
                            <button key={p} style={{ width: 28, height: 28, borderRadius: 6, background: p === 1 ? "rgba(0,240,255,0.08)" : "transparent", border: `1px solid ${p === 1 ? "var(--border-accent)" : "var(--border)"}`, color: p === 1 ? "var(--cyan)" : "var(--text-muted)", fontSize: 12, cursor: "pointer" }}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
