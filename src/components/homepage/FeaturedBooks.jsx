import { getFeaturedBook } from '@/lib/api/book';
import Link from 'next/link';
import BookCard from "@/components/shared/BookCard";
import FadeUp from "@/components/shared/FadeUp";

const FeaturedBooks = async () => {
  const featuredBooks = await getFeaturedBook();

  return (
    <section
      className="w-full py-20 px-6"
      style={{ background: "linear-gradient(180deg, #E6F2DD 0%, #f0f7f0 100%)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span
                className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ background: "#B1D3B9", color: "#2d4f48" }}
              >
                Handpicked for you ✨
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight"
                style={{ color: "#2d4f48" }}
              >
                Featured Books
              </h2>
              <p
                className="text-sm mt-2 max-w-md leading-relaxed"
                style={{ color: "#659287" }}
              >
                A curated selection of must-reads from across every genre — whether
                you're here to study, explore, or simply get lost in a good story.
              </p>
            </div>

            <Link
              href="/books"
              className="self-start sm:self-auto shrink-0 font-semibold text-sm px-6 py-2.5 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{ borderColor: "#659287", color: "#659287" }}
            >
              Browse all →
            </Link>
          </div>
        </FadeUp>

        {/* Divider */}
        <div
          className="h-px w-full mb-10 rounded-full"
          style={{ background: "linear-gradient(90deg, #88BDA4, transparent)" }}
        />

        {/* Books grid */}
        {!featuredBooks?.length ? (
          <p className="text-center py-20 text-sm" style={{ color: "#88BDA4" }}>
            No featured books at the moment.
          </p>
        ) : (
          <div
            className="grid gap-x-5 gap-y-8"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
          >
            {featuredBooks.map((book, i) => (
              <FadeUp key={book._id} delay={i * 0.08}>
                <BookCard book={book} />
              </FadeUp>
            ))}
          </div>
        )}

        {/* Bottom CTA strip */}
        <FadeUp>
          <div
            className="mt-14 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "#2d4f48" }}
          >
            <div>
              <p className="font-bold text-lg" style={{ color: "#E6F2DD" }}>
                Looking for something specific?
              </p>
              <p className="text-sm mt-0.5" style={{ color: "#88BDA4" }}>
                Search by title, author, or genre across our full collection.
              </p>
            </div>
            <Link
              href="/books"
              className="shrink-0 font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{ background: "#659287", color: "#E6F2DD" }}
            >
              Explore the library
            </Link>
          </div>
        </FadeUp>

      </div>
    </section>
  );
};

export default FeaturedBooks;