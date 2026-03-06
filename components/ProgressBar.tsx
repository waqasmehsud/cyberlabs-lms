interface ProgressBarProps {
    value: number; // 0-100
    color?: "cyan" | "purple" | "green" | "orange";
    height?: number;
    showLabel?: boolean;
    animated?: boolean;
}

const colorMap = {
    cyan: { bg: "rgba(0,240,255,0.1)", fill: "linear-gradient(90deg, #00c8d4, #00f0ff)", glow: "0 0 8px rgba(0,240,255,0.4)" },
    purple: { bg: "rgba(124,58,237,0.1)", fill: "linear-gradient(90deg, #6d28d9, #7c3aed)", glow: "0 0 8px rgba(124,58,237,0.4)" },
    green: { bg: "rgba(34,197,94,0.1)", fill: "linear-gradient(90deg, #16a34a, #22c55e)", glow: "0 0 8px rgba(34,197,94,0.4)" },
    orange: { bg: "rgba(249,115,22,0.1)", fill: "linear-gradient(90deg, #ea580c, #f97316)", glow: "0 0 8px rgba(249,115,22,0.4)" },
};

export default function ProgressBar({
    value,
    color = "cyan",
    height = 6,
    showLabel = false,
    animated = true,
}: ProgressBarProps) {
    const clampedValue = Math.min(100, Math.max(0, value));
    const { bg, fill, glow } = colorMap[color];

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
                style={{
                    flex: 1,
                    height,
                    borderRadius: height,
                    background: bg,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${clampedValue}%`,
                        background: fill,
                        borderRadius: height,
                        boxShadow: glow,
                        transition: animated ? "width 1s cubic-bezier(0.4, 0, 0.2, 1)" : undefined,
                    }}
                />
            </div>
            {showLabel && (
                <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", minWidth: 32, textAlign: "right" }}>
                    {clampedValue}%
                </span>
            )}
        </div>
    );
}
