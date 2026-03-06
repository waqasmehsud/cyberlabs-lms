"use client";

import { Play, Pause, Volume2, Maximize2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
    title?: string;
    duration?: string;
}

export default function VideoPlayer({ title = "Introduction to Web Exploitation", duration = "12:34" }: VideoPlayerProps) {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(35);

    return (
        <div
            style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "#000",
                border: "1px solid var(--border)",
                position: "relative",
                aspectRatio: "16/9",
            }}
        >
            {/* Video area / placeholder */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, #050810 0%, #0d1a30 50%, #050810 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                }}
            >
                {/* Cyber grid overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Terminal-style text */}
                <div style={{ textAlign: "center", position: "relative" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cyan)", opacity: 0.6, marginBottom: 12 }}>
                        [VIDEO_STREAM_READY]
                    </div>
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            background: "rgba(0,240,255,0.08)",
                            border: "2px solid rgba(0,240,255,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            margin: "0 auto 12px",
                            transition: "all 0.2s",
                            boxShadow: "0 0 24px rgba(0,240,255,0.2)",
                        }}
                        onClick={() => setPlaying(!playing)}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.15)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,240,255,0.4)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.08)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(0,240,255,0.2)";
                        }}
                    >
                        {playing ? <Pause size={28} color="var(--cyan)" /> : <Play size={28} color="var(--cyan)" fill="var(--cyan)" style={{ marginLeft: 4 }} />}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: 14, fontWeight: 600 }}>{title}</div>
                </div>
            </div>

            {/* Controls overlay */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                    padding: "32px 16px 12px",
                }}
            >
                {/* Progress bar */}
                <div
                    style={{ height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 3, marginBottom: 10, cursor: "pointer" }}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = ((e.clientX - rect.left) / rect.width) * 100;
                        setProgress(Math.round(pct));
                    }}
                >
                    <div style={{ width: `${progress}%`, height: "100%", background: "var(--cyan)", borderRadius: 3, position: "relative" }}>
                        <div style={{ position: "absolute", right: -4, top: -4, width: 11, height: 11, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)" }} />
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                        onClick={() => setPlaying(!playing)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "white" }}
                    >
                        {playing ? <Pause size={18} /> : <Play size={18} fill="white" />}
                    </button>
                    <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.6)" }}>
                        {Math.floor((progress / 100) * 12)}:{String(Math.floor((progress / 100) * 34)).padStart(2, "0")} / {duration}
                    </span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                        <Volume2 size={16} color="rgba(255,255,255,0.6)" style={{ cursor: "pointer" }} />
                        <Maximize2 size={16} color="rgba(255,255,255,0.6)" style={{ cursor: "pointer" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
