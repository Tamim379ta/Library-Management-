import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center"
      style={{ background: "#f0f7f0" }}>

      {/* Big 404 */}
      <div className="relative">
        <p className="text-9xl font-black select-none" style={{ color: "#E6F2DD" }}>
          404
        </p>
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#659287" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#659287" strokeWidth="1.5"/>
            <path d="M9 7h6M9 11h4" stroke="#659287" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold" style={{ color: "#2d4f48" }}>
          Page not found
        </h1>
        <p className="text-sm max-w-xs" style={{ color: "#659287" }}>
          This page doesn't exist in our library. Check the URL or head back home.
        </p>
      </div>

      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
        style={{ background: "#2d4f48", color: "#E6F2DD" }}
      >
        Back to Home
      </Link>
    </div>
  );
}