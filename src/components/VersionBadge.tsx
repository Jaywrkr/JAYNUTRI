const VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0";

export default function VersionBadge() {
  return (
    <div
      aria-hidden
      className="fixed bottom-4 left-4 z-40 pointer-events-none select-none rounded-lg border px-2 py-1 font-mono text-[10px] tracking-wide backdrop-blur-md"
      style={{
        background: "rgba(0, 0, 0, 0.55)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "rgba(255, 255, 255, 0.55)",
      }}
    >
      v{VERSION}
    </div>
  );
}
