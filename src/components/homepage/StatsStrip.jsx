import FadeUp from "@/components/shared/FadeUp";

const stats = [
  { value: "500+", label: "Books Available" },
  { value: "200+", label: "Active Students" },
  { value: "50+", label: "Genres Covered" },
  { value: "14", label: "Day Borrow Window" },
];

export default function StatsStrip() {
  return (
    <section
      className="w-full py-14 px-6"
      style={{ background: "#2d4f48" }}
    >
      <FadeUp>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span
                className="text-4xl font-extrabold"
                style={{ color: "#E6F2DD" }}
              >
                {stat.value}
              </span>
              <span
                className="text-sm mt-1"
                style={{ color: "#88BDA4" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}