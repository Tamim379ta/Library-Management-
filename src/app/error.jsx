"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center"
      style={{ background: "#f0f7f0" }}>

      {/* Error icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "#E6F2DD" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#659287" strokeWidth="1.5"/>
          <path d="M12 8v4" stroke="#2d4f48" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="1" fill="#2d4f48"/>
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold" style={{ color: "#2d4f48" }}>
          Something went wrong
        </h1>
        <p className="text-sm max-w-xs" style={{ color: "#659287" }}>
          {error?.message || "An unexpected error occurred. Try again or return home."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "#2d4f48", color: "#E6F2DD" }}
        >
          Try again
        </button>
        <a
          href="/"
          className="px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "#E6F2DD", color: "#2d4f48" }}
        >
          Go home
        </a>
      </div>
    </div>
  );
}