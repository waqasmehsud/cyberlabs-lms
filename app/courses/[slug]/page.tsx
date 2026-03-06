import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { Clock, Users, Star, BookOpen, ChevronDown, Award, ArrowLeft, Play, Check } from "lucide-react";

// Mock data — in real app this would come from params & DB
const course = {
    slug: "web-app-hacking",
    title: "Web Application Hacking",
    description: "Master the OWASP Top 10, SQL injection, Cross-Site Scripting (XSS), CSRF, authentication bypasses, and advanced web exploitation techniques using real-world vulnerable applications. You'll practice inside an isolated lab environment and build a complete methodology for web penetration testing.",
    category: "Web Security",
    level: "Intermediate",
    duration: "24h",
    students: 3200,
    rating: 4.9,
    reviews: 842,
    instructor: { name: "Dr. Alex Mercer", title: "Senior Penetration Tester", avatar: "AM" },
    skills: ["OWASP Top 10", "Burp Suite", "SQL Injection", "XSS", "CSRF", "IDOR", "API Security", "Reporting"],
    modules: [
        { title: "Module 1: Recon & Enumeration", lessons: ["Web Application Architecture", "Passive Recon with OSINT", "Active Scanning with Gobuster", "Lab: Target Enumeration"], completed: [true, true, true, true] },
        { title: "Module 2: Injection Attacks", lessons: ["SQL Injection Fundamentals", "Blind SQLi Techniques", "SQLMap Automation", "NoSQL Injection", "Lab: Flag the Database"], completed: [true, true, false, false, false] },
        { title: "Module 3: Cross-Site Attacks", lessons: ["Reflected & Stored XSS", "DOM-Based XSS", "CSRF Exploitation", "Lab: Cookie Theft"], completed: [false, false, false, false] },
        { title: "Module 4: Auth & Session Attacks", lessons: ["JWT Vulnerabilities", "Session Fixation", "Broken Auth Patterns", "Lab: Account Takeover"], completed: [false, false, false, false] },
        { title: "Module 5: Advanced Exploitation", lessons: ["SSRF & XXE Attacks", "IDOR Vulnerabilities", "API Security Testing", "Final Capstone Lab"], completed: [false, false, false, false] },
    ],
};

export default function CourseDetailPage() {
    const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
    const completedLessons = course.modules.reduce((a, m) => a + m.completed.filter(Boolean).length, 0);
    const progress = Math.round((completedLessons / totalLessons) * 100);

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 28px" }}>
            {/* Back */}
            <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 24 }}>
                <ArrowLeft size={14} /> Back to Courses
            </Link>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>
                {/* Left — course info */}
                <div>
                    {/* Hero */}
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

                        {/* Meta */}
                        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                            {[
                                { icon: Star, value: `${course.rating} (${course.reviews} reviews)`, color: "#fbbf24" },
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

                    {/* Instructor */}
                    <div className="glass-card" style={{ padding: 20, marginBottom: 24, display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #00f0ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: "white", flexShrink: 0 }}>
                            {course.instructor.avatar}
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 2 }}>YOUR INSTRUCTOR</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{course.instructor.name}</div>
                            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{course.instructor.title}</div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div style={{ marginBottom: 32 }}>
                        <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                            Skills You'll Learn
                        </h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {course.skills.map((s) => (
                                <span key={s} className="badge badge-cyan">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Curriculum */}
                    <div>
                        <h2 style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                            Course Curriculum
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {course.modules.map((mod, mi) => (
                                <details key={mi} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                                    <summary style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-primary)", fontWeight: 600, fontSize: 14, listStyle: "none" }}>
                                        <span>{mod.title}</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{mod.lessons.length} lessons</span>
                                            <ChevronDown size={16} color="var(--text-muted)" />
                                        </div>
                                    </summary>
                                    <div style={{ borderTop: "1px solid var(--border)" }}>
                                        {mod.lessons.map((lesson, li) => (
                                            <div key={li} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: li < mod.lessons.length - 1 ? "1px solid var(--border)" : "none" }}>
                                                <div style={{ width: 22, height: 22, borderRadius: "50%", background: mod.completed[li] ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${mod.completed[li] ? "rgba(34,197,94,0.3)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                    {mod.completed[li] ? <Check size={12} color="var(--green)" /> : <Play size={10} color="var(--text-muted)" />}
                                                </div>
                                                <span style={{ fontSize: 13, color: mod.completed[li] ? "var(--text-secondary)" : "var(--text-primary)", flex: 1 }}>{lesson}</span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — sticky enrollment card */}
                <div style={{ position: "sticky", top: "calc(var(--topbar-height) + 20px)" }}>
                    <div className="glass-card" style={{ padding: 28 }}>
                        {/* Course icon */}
                        <div style={{ width: "100%", height: 160, borderRadius: 12, background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(0,240,255,0.1) 100%)", border: "1px solid rgba(0,240,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 64 }}>
                            🌐
                        </div>

                        {progress > 0 ? (
                            <>
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                                        <span>{completedLessons}/{totalLessons} lessons</span>
                                        <span style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>{progress}%</span>
                                    </div>
                                    <ProgressBar value={progress} color="cyan" height={6} />
                                </div>
                                <Link href={`/courses/${course.slug}/learn`} className="btn-cyber btn-primary" style={{ display: "flex", width: "100%", padding: "13px" }}>
                                    <Play size={16} /> Continue Learning
                                </Link>
                            </>
                        ) : (
                            <Link href={`/courses/${course.slug}/learn`} className="btn-cyber btn-primary" style={{ display: "flex", width: "100%", padding: "14px" }}>
                                Enroll Now — Free
                            </Link>
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
