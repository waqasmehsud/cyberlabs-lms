import Link from "next/link";
import ProgressBar from "./ProgressBar";
import { Star, Clock, Users, Lock } from "lucide-react";

interface CourseCardProps {
    slug: string;
    title: string;
    description: string;
    category: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    students: number;
    rating: number;
    progress?: number;
    isEnrolled?: boolean;
    isLocked?: boolean;
}

const levelColor: Record<string, string> = {
    Beginner: "badge-green",
    Intermediate: "badge-cyan",
    Advanced: "badge-purple",
};

const categoryIcons: Record<string, string> = {
    "Web Security": "🌐",
    "Network": "🔗",
    "Malware": "🦠",
    "Forensics": "🔍",
    "Cryptography": "🔐",
    "Pentesting": "⚔️",
    "CTF": "🏴",
};

export default function CourseCard({
    slug,
    title,
    description,
    category,
    level,
    duration,
    students,
    rating,
    progress,
    isEnrolled = false,
    isLocked = false,
}: CourseCardProps) {
    const icon = categoryIcons[category] ?? "📚";

    return (
        <Link
            href={isLocked ? "#" : `/courses/${slug}`}
            style={{ textDecoration: "none", display: "block" }}
        >
            <div
                className="glass-card"
                style={{
                    padding: "20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    opacity: isLocked ? 0.55 : 1,
                    position: "relative",
                    overflow: "hidden",
                    cursor: isLocked ? "not-allowed" : "pointer",
                }}
            >
                {isLocked && (
                    <div
                        style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "rgba(0,0,0,0.6)",
                            borderRadius: 8,
                            padding: "4px 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            color: "var(--text-muted)",
                        }}
                    >
                        <Lock size={12} /> Locked
                    </div>
                )}

                {/* Course icon & category */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
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
                            fontSize: 22,
                            flexShrink: 0,
                        }}
                    >
                        {icon}
                    </div>
                    <span className={`badge ${levelColor[level] ?? "badge-cyan"}`}>{level}</span>
                </div>

                {/* Title & description */}
                <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.3 }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {description}
                    </p>
                </div>

                {/* Meta row */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: "var(--text-muted)", marginTop: "auto" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={12} /> {duration}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Users size={12} /> {students.toLocaleString()}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#fbbf24", marginLeft: "auto" }}>
                        <Star size={12} fill="#fbbf24" /> {rating.toFixed(1)}
                    </span>
                </div>

                {/* Progress */}
                {isEnrolled && progress !== undefined && (
                    <div>
                        <ProgressBar value={progress} color="cyan" height={4} showLabel />
                    </div>
                )}

                {/* Category tag */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        {category}
                    </span>
                </div>
            </div>
        </Link>
    );
}
