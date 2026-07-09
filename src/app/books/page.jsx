// src/app/dashboard/admin/books/page.jsx
import BookCard from '@/components/shared/BookCard';
import { getAllBooks } from '@/lib/api/book';

const AllBooksPage = async () => {
  const allBooks = await getAllBooks();

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#E6F2DD" }}>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#659287" }}>All Books</h1>
        <p className="text-sm mt-1" style={{ color: "#88BDA4" }}>
          {allBooks?.length} books in the library
        </p>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ backgroundColor: "#88BDA4" }} />
      </div>

      {/* Grid */}
      {allBooks?.length === 0 ? (
        <p className="text-center mt-20" style={{ color: "#88BDA4" }}>No books found.</p>
      ) : (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
        >
          {allBooks?.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

    </div>
  );
};

export default AllBooksPage;