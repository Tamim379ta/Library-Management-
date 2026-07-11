import BooksClient from '@/components/book/BooksClient';
import { getAllBooks } from '@/lib/api/book';
import { Suspense } from 'react';

const genres = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery",
  "Thriller", "Romance", "Horror", "Biography", "History",
  "Science", "Technology", "Self-Help", "Children", "Other",
];

const AllBooksPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  const search = resolvedParams?.search || '';
  const category = resolvedParams?.category || '';
  const page = parseInt(resolvedParams?.page || '1');

  const { books, total, limit } = await getAllBooks({ search, category, page });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#E6F2DD" }}>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#659287" }}>All Books</h1>
        <p className="text-sm mt-1" style={{ color: "#88BDA4" }}>
          {total} books in the library
        </p>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ backgroundColor: "#88BDA4" }} />
      </div>

      {/* Search + Filter (client island) */}
      <Suspense fallback={null}>
        <BooksClient
          genres={genres}
          books={books}
          total={total}
          totalPages={totalPages}
          currentPage={page}
          currentSearch={search}
          currentCategory={category}
        />
      </Suspense>
    </div>
  );
};

export default AllBooksPage;