"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { Search, SlidersHorizontal } from "lucide-react";

const courses = [
    { slug: "web-app-hacking", title: "Web Application Hacking", description: "Master OWASP Top 10, SQL injection, XSS, CSRF, and advanced web exploitation using real-world vulnerable apps.", category: "Web Security", level: "Intermediate" as const, duration: "24h", students: 3200, rating: 4.9, isEnrolled: true, progress: 68 },
    { slug: "network-intrusion", title: "Network Intrusion Detection", description: "Learn to detect and respond to network attacks using Wireshark, Suricata, Snort, and custom IDS rules.", category: "Network", level: "Advanced" as const, duration: "32h", students: 1800, rating: 4.8, isEnrolled: true, progress: 32 },
    { slug: "malware-fundamentals", title: "Malware Analysis Fundamentals", description: "Reverse-engineer and analyze Windows malware using static and dynamic analysis techniques with IDA Pro.", category: "Malware", level: "Beginner" as const, duration: "18h", students: 5100, rating: 4.7, isEnrolled: true, progress: 91 },
    { slug: "crypto-pki", title: "Cryptography & PKI Deep Dive", description: "Deep dive into symmetric/asymmetric encryption, PKI infrastructure, TLS internals, and common crypto attacks.", category: "Cryptography", level: "Advanced" as const, duration: "28h", students: 2400, rating: 4.9 },
    { slug: "bug-bounty", title: "Bug Bounty Hunting Mastery", description: "Learn how to find and report vulnerabilities on HackerOne and Bugcrowd platforms for real financial rewards.", category: "Web Security", level: "Intermediate" as const, duration: "20h", students: 4200, rating: 4.8 },
    { slug: "digital-forensics", title: "Digital Forensics & IR", description: "Gain hands-on experience in incident response, memory forensics, disk imaging, and chain-of-custody procedures.", category: "Forensics", level: "Intermediate" as const, duration: "26h", students: 2100, rating: 4.7, isEnrolled: true, progress: 15 },
    { slug: "active-directory", title: "Active Directory Attacks", description: "Compromise Windows domains using Kerberoasting, Pass-the-Hash, BloodHound, and lateral movement techniques.", category: "Pentesting", level: "Advanced" as const, duration: "36h", students: 3400, rating: 4.9 },
    { slug: "cloud-security", title: "Cloud Security Fundamentals", description: "Identify and exploit misconfigurations in AWS, Azure, and GCP environments — plus cloud-native defenses.", category: "Network", level: "Intermediate" as const, duration: "22h", students: 2900, rating: 4.6 },
    { slug: "ctf-basics", title: "CTF Starter Pack", description: "Start competing in Capture the Flag competitions with guided walkthroughs of rev, crypto, pwn, and web challenges.", category: "CTF", level: "Beginner" as const, duration: "12h", students: 6800, rating: 4.8 },
];

const categories = ["All", "Web Security", "Network", "Malware", "Forensics", "Cryptography", "Pentesting", "CTF"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("All");
    const [level, setLevel] = useState("All");

    const filtered = courses.filter((c) => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
        const matchCat = cat === "All" || c.category === cat;
        const matchLevel = level === "All" || c.level === level;
        return matchSearch && matchCat && matchLevel;
    });

    return (
        <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.08em" }}>LEARNING LIBRARY</div>
                <h1 style={{ fontSize: 30, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                    Security <span style={{ color: "var(--cyan)" }}>Course Catalog</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>240+ expert-led courses across all security domains</p>
            </div>

            {/* Filters */}
            <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Search */}
                <div style={{ position: "relative", maxWidth: 480 }}>
                    <Search size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                    <input
                        type="text"
                        placeholder="Search courses…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-cyber"
                        style={{ paddingLeft: 40 }}
                    />
                </div>

                {/* Category pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCat(c)}
                            style={{
                                padding: "6px 16px",
                                borderRadius: 99,
                                fontSize: 13,
                                fontFamily: "var(--font-mono)",
                                border: `1px solid ${cat === c ? "var(--cyan)" : "var(--border)"}`,
                                background: cat === c ? "rgba(0,240,255,0.08)" : "transparent",
                                color: cat === c ? "var(--cyan)" : "var(--text-secondary)",
                                cursor: "pointer",
                                transition: "all 0.15s",
                            }}
                        >
                            {c}
                        </button>
                    ))}
                    <div style={{ width: 1, background: "var(--border)", margin: "0 8px" }} />
                    {levels.map((l) => (
                        <button
                            key={l}
                            onClick={() => setLevel(l)}
                            style={{
                                padding: "6px 16px",
                                borderRadius: 99,
                                fontSize: 13,
                                fontFamily: "var(--font-mono)",
                                border: `1px solid ${level === l ? "#a78bfa" : "var(--border)"}`,
                                background: level === l ? "rgba(124,58,237,0.08)" : "transparent",
                                color: level === l ? "#a78bfa" : "var(--text-secondary)",
                                cursor: "pointer",
                                transition: "all 0.15s",
                            }}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <div style={{ marginBottom: 20, fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                SHOWING {filtered.length} OF {courses.length} COURSES
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {filtered.map((c) => (
                    <CourseCard key={c.slug} {...c} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-muted)" }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
                    <div style={{ fontSize: 16, color: "var(--text-secondary)" }}>No courses found matching your filters</div>
                </div>
            )}
        </div>
    );
}
