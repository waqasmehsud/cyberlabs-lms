"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Github, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? "Login failed");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                minHeight: "calc(100vh - var(--topbar-height))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 24px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* BG orbs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "30%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)" }} />
                <div style={{ position: "absolute", bottom: "20%", right: "25%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
            </div>

            <div style={{ width: "100%", maxWidth: 440, position: "relative" }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg, #7c3aed, #00f0ff)", boxShadow: "0 0 32px rgba(0,240,255,0.3)", marginBottom: 16 }}>
                        <Shield size={32} color="white" />
                    </div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                        Sign into your CYBERLABS account
                    </p>
                </div>

                {/* Card */}
                <div className="glass-card" style={{ padding: 36 }}>
                    {/* OAuth */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                        {[{ icon: "G", label: "Google" }, { icon: <Github size={16} />, label: "GitHub" }].map((o) => (
                            <button key={o.label} className="btn-cyber btn-ghost" style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "10px", fontSize: 13, gap: 8, flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontWeight: 700 }}>{o.icon}</span> {o.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                        <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", marginBottom: 16, fontSize: 13, color: "#f87171" }}>
                            <AlertCircle size={14} />
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, display: "block" }}>Email Address</label>
                            <div style={{ position: "relative" }}>
                                <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="input-cyber"
                                    style={{ paddingLeft: 38 }}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>Password</label>
                                <Link href="#" style={{ fontSize: 12, color: "var(--cyan)", textDecoration: "none" }}>Forgot password?</Link>
                            </div>
                            <div style={{ position: "relative" }}>
                                <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                                <input
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input-cyber"
                                    style={{ paddingLeft: 38, paddingRight: 40 }}
                                    required
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0, display: "flex" }}>
                                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Demo credentials hint */}
                        <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(0,240,255,0.04)", border: "1px solid rgba(0,240,255,0.12)", fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                            Demo: student@cyberlabs.io / student123
                        </div>

                        <button
                            type="submit"
                            className="btn-cyber btn-primary"
                            style={{ marginTop: 8, width: "100%", padding: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                            disabled={loading}
                        >
                            {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : null}
                            {loading ? "Signing in…" : "Sign In"}
                            {!loading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <p style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "var(--text-muted)" }}>
                        Don't have an account?{" "}
                        <Link href="/register" style={{ color: "var(--cyan)", textDecoration: "none", fontWeight: 600 }}>
                            Create one
                        </Link>
                    </p>
                </div>

                <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "var(--text-muted)" }}>
                    Protected by CYBERLABS security infrastructure
                </p>
            </div>
        </div>
    );
}
