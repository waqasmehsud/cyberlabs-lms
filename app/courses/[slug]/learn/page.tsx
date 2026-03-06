"use client";

import { useState } from "react";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import ProgressBar from "@/components/ProgressBar";
import { ArrowLeft, Check, Play, ChevronDown, ChevronRight, BookOpen, Clock, Award } from "lucide-react";

const modules = [
    {
        title: "Module 1: Recon & Enumeration", completed: true, lessons: [
            { title: "Web Application Architecture", duration: "12:30", done: true },
            { title: "Passive Recon with OSINT", duration: "18:45", done: true },
            { title: "Active Scanning with Gobuster", duration: "22:10", done: true },
            { title: "Lab: Target Enumeration", duration: "35:00", done: true },
        ]
    },
    {
        title: "Module 2: Injection Attacks", completed: false, lessons: [
            { title: "SQL Injection Fundamentals", duration: "24:15", done: true },
            { title: "Blind SQLi Techniques", duration: "19:50", done: true },
            { title: "SQLMap Automation", duration: "15:30", done: false },
            { title: "NoSQL Injection", duration: "14:20", done: false },
            { title: "Lab: Flag the Database", duration: "45:00", done: false },
        ]
    },
    {
        title: "Module 3: Cross-Site Attacks", completed: false, lessons: [
            { title: "Reflected & Stored XSS", duration: "21:15", done: false },
            { title: "DOM-Based XSS", duration: "17:40", done: false },
            { title: "CSRF Exploitation", duration: "13:50", done: false },
            { title: "Lab: Cookie Theft", duration: "40:00", done: false },
        ]
    },
];

const currentLesson = { title: "SQLMap Automation", duration: "15:30", module: "Module 2: Injection Attacks" };

export default function LearnPage() {
    const [openModule, setOpenModule] = useState(1);
    const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
    const doneLessons = modules.reduce((a, m) => a + m.lessons.filter((l) => l.done).length, 0);
    const progress = Math.round((doneLessons / totalLessons) * 100);

    return (
        <div style={{ display: "flex", height: "calc(100vh - var(--topbar-height))", overflow: "hidden" }}>
            {/* Lesson sidebar */}
            <aside
                style={{
                    width: 320,
                    background: "var(--bg-sidebar)",
                    borderRight: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                    overflowY: "auto",
                }}
            >
                {/* Header */}
                <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)" }}>
                    <Link href="/courses/web-app-hacking" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)", textDecoration: "none", marginBottom: 10 }}>
                        <ArrowLeft size={12} /> Back to course
                    </Link>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10, lineHeight: 1.3 }}>
                        Web Application Hacking
                    </div>
                    <ProgressBar value={progress} color="cyan" height={4} showLabel />
                </div>

                {/* Modules */}
                <div style={{ flex: 1, padding: "8px 0" }}>
                    {modules.map((mod, mi) => (
                        <div key={mi}>
                            <button
                                onClick={() => setOpenModule(openModule === mi ? -1 : mi)}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "12px 16px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "var(--text-primary)",
                                    fontWeight: 600,
                                    fontSize: 13,
                                    textAlign: "left",
                                }}
                            >
                                <div style={{ width: 20, height: 20, borderRadius: "50%", background: mod.completed ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${mod.completed ? "rgba(34,197,94,0.3)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    {mod.completed ? <Check size={11} color="var(--green)" /> : <span style={{ fontSize: 9, color: "var(--text-muted)" }}>{mi + 1}</span>}
                                </div>
                                <span style={{ flex: 1 }}>{mod.title}</span>
                                {openModule === mi ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>

                            {openModule === mi && (
                                <div>
                                    {mod.lessons.map((lesson, li) => {
                                        const isActive = lesson.title === currentLesson.title;
                                        return (
                                            <div
                                                key={li}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 10,
                                                    padding: "10px 16px 10px 46px",
                                                    background: isActive ? "rgba(0,240,255,0.06)" : "transparent",
                                                    borderLeft: isActive ? "2px solid var(--cyan)" : "2px solid transparent",
                                                    cursor: "pointer",
                                                    transition: "all 0.15s",
                                                }}
                                            >
                                                <div style={{ width: 18, height: 18, borderRadius: "50%", background: lesson.done ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${lesson.done ? "rgba(34,197,94,0.25)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                    {lesson.done ? <Check size={10} color="var(--green)" /> : <Play size={8} color="var(--text-muted)" />}
                                                </div>
                                                <span style={{ flex: 1, fontSize: 12, color: isActive ? "var(--cyan)" : lesson.done ? "var(--text-secondary)" : "var(--text-primary)" }}>
                                                    {lesson.title}
                                                </span>
                                                <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{lesson.duration}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    {/* Breadcrumb */}
                    <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 16 }}>
                        {currentLesson.module} › {currentLesson.title}
                    </div>

                    {/* Video */}
                    <VideoPlayer title={currentLesson.title} duration={currentLesson.duration} />

                    {/* Lesson info */}
                    <div style={{ marginTop: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
                        <h1 style={{ fontSize: 24, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
                            {currentLesson.title}
                        </h1>
                        <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--text-muted)" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={13} /> {currentLesson.duration}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><BookOpen size={13} /> Lesson 14 of {totalLessons}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginTop: 24, marginBottom: 24 }}>
                        <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>About This Lesson</h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7 }}>
                            In this lesson, you'll learn how to use SQLMap, the industry-standard automated SQL injection tool. We'll cover scanning targets, bypassing WAFs, dumping databases, and writing custom tamper scripts. By the end, you'll be able to automate large-scale SQL injection assessments efficiently.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                        <button className="btn-cyber btn-ghost" style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "10px 20px" }}>
                            ← Previous Lesson
                        </button>
                        <button className="btn-cyber btn-primary" style={{ padding: "10px 24px" }}>
                            Mark Complete & Next →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
