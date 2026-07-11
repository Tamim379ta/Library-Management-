import BorrowButton from '@/components/book/BorrowBtn';
import { getBookById } from '@/lib/api/book';
import { getBorrowedBooks } from '@/lib/api/borrow';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBookById(id);
  const borrowedBooks = await getBorrowedBooks();
  const user = await getUserSession();
  const userId = user?.id;
  const filteredBooks = borrowedBooks.filter((borrow) => borrow.userId === userId);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#E6F2DD" }}>
        <p style={{ color: "#88BDA4" }}>Book not found.</p>
      </div>
    );
  }

  const borrowed = book.totalQuantity - book.availableQuantity;
  const isAvailable = book.availableQuantity > 0;

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#E6F2DD" }}>
      <div
        className="max-w-4xl mx-auto rounded-2xl p-8"
        style={{ background: "white", border: "0.5px solid #B1D3B9" }}
      >
        {/* Back */}
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-sm mb-6"
          style={{ color: "#659287" }}
        >
          ← Back to books
        </Link>

        {/* Top section */}
        <div className="flex gap-8 items-start flex-wrap">

          {/* Cover */}
          <div
            className="rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-6xl"
            style={{ width: 180, height: 260, backgroundColor: "#B1D3B9" }}
          >
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            ) : "📚"}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-3">

            {/* Genre */}
            <span
              className="text-xs font-medium px-3 py-1 rounded-full w-fit"
              style={{ backgroundColor: "#B1D3B9", color: "#3a6458" }}
            >
              {book.genre}
            </span>

            <div>
              <h1 className="text-2xl font-semibold" style={{ color: "#2d4f48" }}>{book.title}</h1>
              <p className="text-sm mt-1" style={{ color: "#659287" }}>by {book.author}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-3 flex-wrap mt-1">
              {[
                { label: "Total copies", value: book.totalQuantity },
                { label: "Available", value: book.availableQuantity },
                { label: "Borrowed", value: borrowed },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg px-4 py-2.5 text-center min-w-[80px]"
                  style={{ background: "white", border: "0.5px solid #B1D3B9" }}
                >
                  <p className="text-xs" style={{ color: "#88BDA4" }}>{label}</p>
                  <p className="text-xl font-medium mt-1" style={{ color: "#659287" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Availability dot */}
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: isAvailable ? "#659287" : "#f87171" }}
              />
              <span className="text-sm font-medium" style={{ color: isAvailable ? "#659287" : "#f87171" }}>
                {isAvailable ? "Available to borrow" : "Currently unavailable"}
              </span>
            </div>


            {/* Actions */}
            <BorrowButton
              bookId={book._id}
              isAvailable={isAvailable}
              title={book.title}
              filteredBooks={filteredBooks}
              userId={userId}
            />
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <div
            className="mt-8 rounded-xl p-5"
            style={{ background: "white", border: "0.5px solid #B1D3B9" }}
          >
            <h2 className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "#659287" }}>
              About this book
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">{book.description}</p>
          </div>
        )}

        {/* Details grid */}
        <div
          className="mt-4 rounded-xl p-5"
          style={{ background: "white", border: "0.5px solid #B1D3B9" }}
        >
          <h2 className="text-xs font-medium uppercase tracking-wide mb-4" style={{ color: "#659287" }}>
            Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "ISBN", value: book.isbn },
              { label: "Publisher", value: book.publisher },
              { label: "Published", value: book.publishedYear },
              { label: "Pages", value: book.pages },
            ].filter(({ value }) => value).map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs" style={{ color: "#88BDA4" }}>{label}</p>
                <p className="text-sm mt-0.5" style={{ color: "#2d4f48" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookDetailsPage;