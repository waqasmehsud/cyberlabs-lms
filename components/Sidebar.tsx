"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    FlaskConical,
    Trophy,
    Settings,
    Shield,
    ChevronRight,
    X,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/courses", icon: BookOpen, label: "Courses" },
    { href: "/my-learning", icon: GraduationCap, label: "My Learning" },
    { href: "/labs", icon: FlaskConical, label: "Labs" },
    { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { href: "/settings", icon: Settings, label: "Settings" },
];

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                style={{
                    width: "var(--sidebar-width)",
                    background: "var(--bg-sidebar)",
                    borderRight: "1px solid var(--border)",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 40,
                    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transform: open ? "translateX(0)" : "",
                }}
                className={`${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Logo */}
                <div
                    style={{
                        height: "var(--topbar-height)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                        borderBottom: "1px solid var(--border)",
                    }}
                >
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #7c3aed, #00f0ff)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 16px rgba(0,240,255,0.3)",
                            }}
                        >
                            <Shield size={20} color="white" />
                        </div>
                        <div>
                            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--cyan)", letterSpacing: "0.04em" }}>
                                CYBERLABS
                            </div>
                            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", fontFamily: "var(--font-mono)" }}>
                                LEARNING PLATFORM
                            </div>
                        </div>
                    </Link>
                    <button onClick={onClose} className="lg:hidden btn-ghost p-1 rounded-lg">
                        <X size={18} color="var(--text-secondary)" />
                    </button>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
                    <div style={{ marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.1em", padding: "0 8px" }}>
                            NAVIGATION
                        </span>
                    </div>
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const active = pathname === href || pathname.startsWith(href + "/");
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={onClose}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    marginBottom: 2,
                                    textDecoration: "none",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: active ? 600 : 400,
                                    fontSize: 14,
                                    color: active ? "var(--cyan)" : "var(--text-secondary)",
                                    background: active ? "rgba(0,240,255,0.08)" : "transparent",
                                    border: active ? "1px solid rgba(0,240,255,0.15)" : "1px solid transparent",
                                    transition: "all 0.15s",
                                    position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                        e.currentTarget.style.color = "var(--text-primary)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    }
                                }}
                            >
                                <Icon size={18} />
                                <span style={{ flex: 1 }}>{label}</span>
                                {active && <ChevronRight size={14} />}
                            </Link>
                        );
                    })}

                    {/* Admin section */}
                    <div style={{ marginTop: 24, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.1em", padding: "0 8px" }}>
                            ADMIN
                        </span>
                    </div>
                    {[
                        { href: "/admin", label: "Dashboard" },
                        { href: "/admin/courses", label: "Course Manager" },
                    ].map(({ href, label }) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={onClose}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    marginBottom: 2,
                                    textDecoration: "none",
                                    fontSize: 14,
                                    color: active ? "#a78bfa" : "var(--text-muted)",
                                    background: active ? "rgba(124,58,237,0.1)" : "transparent",
                                    border: active ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent",
                                    transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "var(--text-muted)";
                                    }
                                }}
                            >
                                <Shield size={16} />
                                <span>{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User profile at bottom */}
                <div
                    style={{
                        padding: "12px 16px",
                        borderTop: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #7c3aed, #00f0ff)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "white",
                            flexShrink: 0,
                        }}
                    >
                        W
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            Waqas
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Student</div>
                    </div>
                    <span className="badge badge-purple" style={{ fontSize: 10 }}>PRO</span>
                </div>
            </aside>
        </>
    );
}
