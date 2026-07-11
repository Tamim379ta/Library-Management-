import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "linear-gradient(180deg, #E6F2DD 0%, #f0f7f0 100%)" }}
    >

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        style={{ background: "#2d4f48" }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="#E6F2DD" strokeWidth="1.5"/>
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="#E6F2DD" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="1.5" fill="#88BDA4"/>
        </svg>
      </div>

      {/* Badge */}
      <span
        className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
        style={{ background: "#B1D3B9", color: "#2d4f48" }}
      >
        Access Denied
      </span>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: "#2d4f48" }}>
        You're not authorized
      </h1>

      {/* Description */}
      <p className="text-sm max-w-sm leading-relaxed mb-8" style={{ color: "#659287" }}>
        You don't have permission to view this page. If you think this is a mistake,
        please contact your library administrator.
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
          style={{ background: "#2d4f48", color: "#E6F2DD" }}
        >
          Back to Home
        </Link>
        <Link
          href="/signin"
          className="px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all hover:-translate-y-0.5 active:scale-95"
          style={{ borderColor: "#659287", color: "#659287" }}
        >
          Sign In
        </Link>
      </div>

    </div>
  );
};

export default UnauthorizedPage;