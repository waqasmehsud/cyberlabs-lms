"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { Clock, Users, Star, BookOpen, ChevronDown, ArrowLeft, Play, Check, Loader2 } from "lucide-react";

interface Lesson {
    id: string;
    title: string;
    order: number;
    duration: string;
    completed: boolean;
}

interface CourseData {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    students: number;
    rating: number;
    isEnrolled: boolean;
    progress: number;
    lessons: Lesson[];
}

const categoryEmoji: Record<string, string> = {
    "Web Security": "🌐", Pentesting: "⚔️", Network: "🔗", Malware: "🦠",
    Forensics: "🔍", Cryptography: "🔑", CTF: "🏴",
};

export default function CourseDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        fetch(`/api/courses/${slug}`)
            .then((r) => r.json())
            .then((d) => { if (d.course) setCourse(d.course); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [slug]);

    async function handleEnroll() {
        setEnrolling(true);
        try {
            const res = await fetch(`/api/courses/${slug}/enroll`, { method: "POST" });
            if (res.ok) {
                setCourse((prev) => prev ? { ...prev, isEnrolled: true } : prev);
            } else if (res.status === 401) {
                window.location.href = "/login";
            }
        } catch (e) {
            console.error(e);
        } finally {
            setEnrolling(false);
        }
    }

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
                <Loader2 size={32} color="var(--cyan)" style={{ animation: "spin 1s linear infinite" }} />
            </div>
        );
    }

    if (!course) {
        return (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
                <p style={{ color: "var(--text-secondary)" }}>Course not found.</p>
                <Link href="/courses" className="btn-cyber btn-outline" style={{ marginTop: 20, padding: "10px 24px" }}>Back to Courses</Link>
            </div>
        );
    }

    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter((l) => l.completed).length;

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 28px" }}>
            <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 24 }}>
                <ArrowLeft size={14} /> Back to Courses
            </Link>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>
                {/* Left — course info */}
                <div>
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                            <span className="badge badge-cyan">{course.category}</span>
                            <span className="badge badge-purple">{course.level}</span>
                        </div>
                        <h1 style={{ fontSize: 34, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 16, lineHeight: 1.2 }}>
                            {course.title}
                        </h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                            {course.description}
                        </p>
                        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                            {[
                                { icon: Star, value: `${course.rating} rating`, color: "#fbbf24" },
                                { icon: Users, value: `${course.students.toLocaleString()} students`, color: "var(--text-muted)" },
                                { icon: Clock, value: course.duration, color: "var(--text-muted)" },
                                { icon: BookOpen, value: `${totalLessons} lessons`, color: "var(--text-muted)" },
                            ].map(({ icon: Icon, value, color }) => (
                                <div key={value} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color }}>
                                    <Icon size={15} fill={color === "#fbbf24" ? "#fbbf24" : "none"} />
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Curriculum */}
                    <div>
                        <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                            Course Curriculum
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {course.lessons.map((lesson, i) => (
                                <div
                                    key={lesson.id}
                                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10 }}
                                >
                                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: lesson.completed ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${lesson.completed ? "rgba(34,197,94,0.3)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        {lesson.completed ? <Check size={13} color="var(--green)" /> : <Play size={11} color="var(--text-muted)" />}
                                    </div>
                                    <span style={{ fontSize: 13, color: lesson.completed ? "var(--text-secondary)" : "var(--text-primary)", flex: 1 }}>
                                        {lesson.order}. {lesson.title}
                                    </span>
                                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{lesson.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — sticky enrollment card */}
                <div style={{ position: "sticky", top: "calc(var(--topbar-height) + 20px)" }}>
                    <div className="glass-card" style={{ padding: 28 }}>
                        <div style={{ width: "100%", height: 160, borderRadius: 12, background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(0,240,255,0.1) 100%)", border: "1px solid rgba(0,240,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 64 }}>
                            {categoryEmoji[course.category] ?? "📘"}
                        </div>

                        {course.isEnrolled ? (
                            <>
                                {course.progress > 0 && (
                                    <div style={{ marginBottom: 16 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                                            <span>{completedLessons}/{totalLessons} lessons</span>
                                            <span style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>{course.progress}%</span>
                                        </div>
                                        <ProgressBar value={course.progress} color="cyan" height={6} />
                                    </div>
                                )}
                                <Link href={`/courses/${course.slug}/learn`} className="btn-cyber btn-primary" style={{ display: "flex", width: "100%", padding: "13px", justifyContent: "center", alignItems: "center", gap: 8 }}>
                                    <Play size={16} /> {course.progress > 0 ? "Continue Learning" : "Start Course"}
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleEnroll}
                                className="btn-cyber btn-primary"
                                style={{ width: "100%", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                                disabled={enrolling}
                            >
                                {enrolling ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : null}
                                {enrolling ? "Enrolling…" : "Enroll Now — Free"}
                            </button>
                        )}

                        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                                { icon: "🏆", text: "Certificate of completion" },
                                { icon: "♾️", text: "Lifetime access" },
                                { icon: "🧪", text: "Hands-on lab environment" },
                                { icon: "💬", text: "Community forum access" },
                            ].map((p) => (
                                <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text-secondary)" }}>
                                    <span>{p.icon}</span> {p.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
