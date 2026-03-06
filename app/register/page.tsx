"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const perks = [
    "Access 240+ security courses",
    "1,500+ hands-on lab challenges",
    "Live cyber range environment",
    "Industry-recognized certificates",
];

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
    const strengthColors = ["", "#ef4444", "#f97316", "#22c55e"];
    const strengthLabels = ["", "Weak", "Medium", "Strong"];

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
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 900, width: "100%", position: "relative" }}>
                {/* Left — benefits */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>
                    <div>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #7c3aed, #00f0ff)", boxShadow: "0 0 24px rgba(0,240,255,0.25)", marginBottom: 20 }}>
                            <Shield size={28} color="white" />
                        </div>
                        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 36, fontWeight: 800, color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.15 }}>
                            Join the<br />
                            <span style={{ color: "var(--cyan)" }}>CYBERLABS</span> Community
                        </h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.6 }}>
                            Free access to 100+ courses and labs. No credit card required.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {perks.map((p) => (
                            <div key={p} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <Check size={14} color="var(--green)" />
                                </div>
                                <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{p}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — form */}
                <div className="glass-card" style={{ padding: 36 }}>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 24 }}>
                        Create your account
                    </h2>

                    <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, display: "block" }}>Full Name</label>
                            <div style={{ position: "relative" }}>
                                <User size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="input-cyber" style={{ paddingLeft: 38 }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, display: "block" }}>Email Address</label>
                            <div style={{ position: "relative" }}>
                                <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-cyber" style={{ paddingLeft: 38 }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, display: "block" }}>Password</label>
                            <div style={{ position: "relative" }}>
                                <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className="input-cyber" style={{ paddingLeft: 38, paddingRight: 40 }} />
                                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0, display: "flex" }}>
                                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {password.length > 0 && (
                                <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i <= strength ? strengthColors[strength] : "var(--bg-card)" }} />
                                    ))}
                                    <span style={{ fontSize: 11, color: strengthColors[strength], fontFamily: "var(--font-mono)", marginLeft: 4 }}>{strengthLabels[strength]}</span>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn-cyber btn-primary" style={{ marginTop: 8, width: "100%", padding: "13px" }}>
                            Create Account <ArrowRight size={16} />
                        </button>
                    </form>

                    <p style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--text-muted)" }}>
                        Already have an account?{" "}
                        <Link href="/login" style={{ color: "var(--cyan)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
                    </p>
                    <p style={{ marginTop: 12, textAlign: "center", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
                        By creating an account you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
