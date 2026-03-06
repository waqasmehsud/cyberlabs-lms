"use client";

import { useState } from "react";
import { Search, Bell, Menu, Sun, Moon } from "lucide-react";

interface TopbarProps {
    onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
    const [searchFocused, setSearchFocused] = useState(false);

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
            <button
                onClick={onMenuClick}
                className="lg:hidden btn-ghost"
                style={{ padding: "8px", borderRadius: 8, flexShrink: 0 }}
            >
                <Menu size={20} />
            </button>

            {/* Search */}
            <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
                <Search
                    size={16}
                    style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: searchFocused ? "var(--cyan)" : "var(--text-muted)",
                        transition: "color 0.2s",
                        pointerEvents: "none",
                    }}
                />
                <input
                    type="text"
                    placeholder="Search courses, labs, instructors…"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    style={{
                        width: "100%",
                        background: "rgba(13, 17, 23, 0.8)",
                        border: `1px solid ${searchFocused ? "var(--cyan)" : "var(--border)"}`,
                        borderRadius: 10,
                        padding: "9px 16px 9px 38px",
                        fontSize: 14,
                        color: "var(--text-primary)",
                        outline: "none",
                        boxShadow: searchFocused ? "0 0 0 3px var(--cyan-glow)" : "none",
                        transition: "all 0.2s",
                    }}
                />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
                {/* Notification bell */}
                <button
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        position: "relative",
                        transition: "all 0.15s",
                        color: "var(--text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-accent)";
                        e.currentTarget.style.color = "var(--cyan)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                >
                    <Bell size={17} />
                    <span
                        style={{
                            position: "absolute",
                            top: 7,
                            right: 7,
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--cyan)",
                            boxShadow: "0 0 6px var(--cyan)",
                        }}
                    />
                </button>

                {/* User avatar */}
                <div
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7c3aed, #00f0ff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "white",
                        cursor: "pointer",
                        border: "2px solid transparent",
                        boxShadow: "0 0 0 2px rgba(0,240,255,0.25)",
                    }}
                >
                    W
                </div>
            </div>
        </header>
    );
}
