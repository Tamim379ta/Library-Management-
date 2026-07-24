import Marquee from "react-fast-marquee";
import FadeUp from "@/components/shared/FadeUp";

const testimonials = [
  {
    name: "Arif Hossain",
    role: "CSE — 3rd Year",
    text: "BookBridge saved me so much time. I reserved my textbook online and just picked it up — no waiting in line at all.",
    avatar: "AH",
  },
  {
    name: "Nusrat Jahan",
    role: "EEE — 2nd Year",
    text: "The due date reminders are a lifesaver. I never have to worry about late returns anymore.",
    avatar: "NJ",
  },
  {
    name: "Tanvir Ahmed",
    role: "BBA — 4th Year",
    text: "Found three books I needed for my thesis in under a minute. The search and filter is really well done.",
    avatar: "TA",
  },
  {
    name: "Sumaiya Akter",
    role: "English — 1st Year",
    text: "I love how clean the interface is. Borrowing a book feels effortless now.",
    avatar: "SA",
  },
  {
    name: "Mehedi Hasan",
    role: "Physics — 3rd Year",
    text: "Finally a library system that actually works. The borrow history page is really useful too.",
    avatar: "MH",
  },
  {
    name: "Fatema Tuz",
    role: "Chemistry — 2nd Year",
    text: "Super smooth experience from browsing to borrowing. Highly recommend to every student.",
    avatar: "FT",
  },
];

const TestimonialCard = ({ name, role, text, avatar }) => (
  <div
    className="mx-3 w-72 shrink-0 rounded-2xl px-6 py-5 flex flex-col gap-3"
    style={{ background: "#E6F2DD" }}
  >
    <p className="text-sm leading-relaxed" style={{ color: "#2d4f48" }}>
      {text}
    </p>
    <div className="flex items-center gap-3 mt-auto">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        style={{ background: "#2d4f48", color: "#E6F2DD" }}
      >
        {avatar}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: "#2d4f48" }}>
          {name}
        </p>
        <p className="text-xs" style={{ color: "#659287" }}>
          {role}
        </p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section
      className="w-full py-20 overflow-hidden"
      style={{ background: "#f0f7f0" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: "#B1D3B9", color: "#2d4f48" }}
            >
              Student voices
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight"
              style={{ color: "#2d4f48" }}
            >
              What Students Say
            </h2>
            <p
              className="text-sm mt-3 max-w-md mx-auto leading-relaxed"
              style={{ color: "#659287" }}
            >
              Thousands of students use BookBridge every semester — here's what they think.
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Marquee — full width, no px constraint */}
      <Marquee gradient={false} speed={40} pauseOnHover>
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </Marquee>
    </section>
  );
}