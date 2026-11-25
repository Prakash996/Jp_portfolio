import { twMerge } from "tailwind-merge";

export default function BorderBottomLine({
  className = "",
  children,
}) {
  return (
    <div
      className={twMerge(
        "relative flex h-9 items-center justify-between px-5 mt-10 mb-10 text-[8px] uppercase tracking-[0.25em] sm:px-8",
        className,
      )}
      style={{ color: "var(--muted)" }}
    >
        {children}
        {/* Emerald gradient line */}
        <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.03) 0%, rgba(16,185,129,0.3) 25%, #10b981 50%, rgba(16,185,129,0.3) 75%, rgba(16,185,129,0.03) 90%, transparent 100%)",
                boxShadow: "0 0 0px rgba(16,185,129,0.3)",
            }}
        />
    </div>
  );
}
