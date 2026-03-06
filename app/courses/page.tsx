"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import { Search, Loader2 } from "lucide-react";

interface Course {
    slug: string;
    title: string;
    description: string;
    category: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    students: number;
    rating: number;
    isEnrolled: boolean;
    progress?: number;
}

const categories = ["All", "Web Security", "Network", "Malware", "Forensics", "Cryptography", "Pentesting", "CTF"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("All");
    const [level, setLevel] = useState("All");

    useEffect(() => {
        fetch("/api/courses")
            .then((r) => r.json())
            .then((d) => { if (d.courses) setCourses(d.courses); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

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

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {categories.map((c) => (
                        <button key={c} onClick={() => setCat(c)} style={{ padding: "6px 16px", borderRadius: 99, fontSize: 13, fontFamily: "var(--font-mono)", border: `1px solid ${cat === c ? "var(--cyan)" : "var(--border)"}`, background: cat === c ? "rgba(0,240,255,0.08)" : "transparent", color: cat === c ? "var(--cyan)" : "var(--text-secondary)", cursor: "pointer", transition: "all 0.15s" }}>
                            {c}
                        </button>
                    ))}
                    <div style={{ width: 1, background: "var(--border)", margin: "0 8px" }} />
                    {levels.map((l) => (
                        <button key={l} onClick={() => setLevel(l)} style={{ padding: "6px 16px", borderRadius: 99, fontSize: 13, fontFamily: "var(--font-mono)", border: `1px solid ${level === l ? "#a78bfa" : "var(--border)"}`, background: level === l ? "rgba(124,58,237,0.08)" : "transparent", color: level === l ? "#a78bfa" : "var(--text-secondary)", cursor: "pointer", transition: "all 0.15s" }}>
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
                    <Loader2 size={32} color="var(--cyan)" style={{ animation: "spin 1s linear infinite" }} />
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: 20, fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        SHOWING {filtered.length} OF {courses.length} COURSES
                    </div>

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
                </>
            )}
        </div>
    );
}
