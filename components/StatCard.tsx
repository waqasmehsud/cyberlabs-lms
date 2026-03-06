import { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    change?: { value: number; positive: boolean };
    accentColor?: "cyan" | "purple" | "green" | "orange";
}

const colorConfig = {
    cyan: { border: "rgba(0,240,255,0.2)", bg: "rgba(0,240,255,0.06)", icon: "var(--cyan)", glow: "0 0 16px rgba(0,240,255,0.1)" },
    purple: { border: "rgba(124,58,237,0.25)", bg: "rgba(124,58,237,0.08)", icon: "#a78bfa", glow: "0 0 16px rgba(124,58,237,0.15)" },
    green: { border: "rgba(34,197,94,0.2)", bg: "rgba(34,197,94,0.06)", icon: "var(--green)", glow: "0 0 16px rgba(34,197,94,0.1)" },
    orange: { border: "rgba(249,115,22,0.2)", bg: "rgba(249,115,22,0.06)", icon: "var(--orange)", glow: "0 0 16px rgba(249,115,22,0.1)" },
};

export default function StatCard({ icon: Icon, label, value, change, accentColor = "cyan" }: StatCardProps) {
    const { border, bg, icon, glow } = colorConfig[accentColor];

    return (
        <div
            style={{
                background: "var(--bg-card)",
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: "20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                boxShadow: glow,
                transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = glow.replace("0.1)", "0.2)").replace("0.15)", "0.25)");
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = glow;
            }}
        >
            <div
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: bg,
                    border: `1px solid ${border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Icon size={20} color={icon} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
                    {label}
                </div>
                <div style={{ fontSize: 26, fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                    {value}
                </div>
                {change && (
                    <div style={{ fontSize: 12, marginTop: 6, color: change.positive ? "var(--green)" : "var(--red)", display: "flex", alignItems: "center", gap: 4 }}>
                        {change.positive ? "↑" : "↓"} {Math.abs(change.value)}% this week
                    </div>
                )}
            </div>
        </div>
    );
}
