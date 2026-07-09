import Link from "next/link";

const BookCard = ({ book }) => {
  const getAvailabilityStatus = () => {
    if (book.availableQuantity > 0) {
      return { label: `Available (${book.availableQuantity})`, color: "#659287" };
    }
    return { label: "Unavailable", color: "#f87171" };
  };

  const status = getAvailabilityStatus();

  return (
    <Link href={`/books/${book._id}`} className="no-underline">
      <div className="flex flex-col gap-2 cursor-pointer w-[140px]">
        {/* Cover */}
        <div
          className="w-full rounded-lg overflow-hidden flex-shrink-0"
          style={{ height: "200px", backgroundColor: "#B1D3B9" }}
        >
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              📚
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <p
            className="text-sm font-medium leading-tight truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {book.title}
          </p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {book.author}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: status.color }}
            />
            <span className="text-xs font-medium" style={{ color: status.color }}>
              {status.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;