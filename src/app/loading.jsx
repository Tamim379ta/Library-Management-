export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "#f0f7f0" }}>
      
      {/* Animated book icon */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "#659287" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        {/* Pulse ring */}
        <span
          className="absolute w-16 h-16 rounded-2xl animate-ping opacity-30"
          style={{ background: "#659287" }}
        />
      </div>

      {/* Loading bar */}
      <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: "#B1D3B9" }}>
        <div
          className="h-full rounded-full animate-pulse"
          style={{ background: "#2d4f48", width: "60%" }}
        />
      </div>

      <p className="text-sm tracking-wide" style={{ color: "#2d4f48", opacity: 0.6 }}>
        Loading BookBridge…
      </p>
    </div>
  );
}