"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopbarProps {
    onMenuClick: () => void;
}

interface User {
    name: string;
    email: string;
    role: string;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
    const router = useRouter();
    const [searchFocused, setSearchFocused] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((d) => { if (d.user) setUser(d.user); })
            .catch(() => { });
    }, []);

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        router.push("/login");
        router.refresh();
    }

    const initials = user?.name
        ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
        : "?";

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "var(--topbar-height)",
                background: "rgba(8, 11, 18, 0.85)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                gap: 16,
                zIndex: 20,
                paddingLeft: "calc(var(--sidebar-width) + 20px)",
            }}
            className="hidden-sidebar-on-mobile"
        >
            {/* Mobile menu button */}
            <button onClick={onMenuClick} className="lg:hidden btn-ghost" style={{ padding: "8px", borderRadius: 8, flexShrink: 0 }}>
                <Menu size={20} />
            </button>

            {/* Search */}
            <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? "var(--cyan)" : "var(--text-muted)", transition: "color 0.2s", pointerEvents: "none" }} />
                <input
                    type="text"
                    placeholder="Search courses, labs, instructors…"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    style={{ width: "100%", background: "rgba(13, 17, 23, 0.8)", border: `1px solid ${searchFocused ? "var(--cyan)" : "var(--border)"}`, borderRadius: 10, padding: "9px 16px 9px 38px", fontSize: 14, color: "var(--text-primary)", outline: "none", boxShadow: searchFocused ? "0 0 0 3px var(--cyan-glow)" : "none", transition: "all 0.2s" }}
                />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
                {/* Notification bell */}
                <button
                    style={{ width: 38, height: 38, borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", transition: "all 0.15s", color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-accent)"; e.currentTarget.style.color = "var(--cyan)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                    <Bell size={17} />
                    <span style={{ position: "absolute", top: 7, right: 7, width: 8, height: 8, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan)" }} />
                </button>

                {/* User avatar + dropdown */}
                <div style={{ position: "relative" }}>
                    <div
                        onClick={() => setShowMenu((p) => !p)}
                        style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #00f0ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer", border: "2px solid transparent", boxShadow: "0 0 0 2px rgba(0,240,255,0.25)", userSelect: "none" }}
                    >
                        {initials}
                    </div>

                    {showMenu && (
                        <div
                            style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.4)", zIndex: 100, overflow: "hidden" }}
                        >
                            {user ? (
                                <>
                                    <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{user.name}</div>
                                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, fontFamily: "var(--font-mono)" }}>{user.email}</div>
                                        <div style={{ marginTop: 6 }}>
                                            <span className={`badge ${user.role === "ADMIN" ? "badge-purple" : "badge-cyan"}`} style={{ fontSize: 9 }}>{user.role}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#f87171", textAlign: "left" }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
                                    >
                                        <LogOut size={14} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <a href="/login" style={{ display: "block", padding: "12px 16px", fontSize: 13, color: "var(--cyan)", textDecoration: "none" }}>Sign In</a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
