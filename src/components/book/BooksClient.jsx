"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import BookCard from '@/components/shared/BookCard';
import { Pagination, Dropdown, Button, Label } from '@heroui/react';

export default function BooksClient({
  genres,
  books,
  total,
  totalPages,
  currentPage,
  currentSearch,
  currentCategory,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    // reset to page 1 on search/filter change
    if (updates.search !== undefined || updates.category !== undefined) {
      params.set('page', '1');
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [searchParams, pathname, router]);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className={isPending ? 'opacity-60 pointer-events-none transition-opacity' : ''}>

      {/* Search & Category Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search */}
        <div className="w-full max-w-sm relative">
          <input
            placeholder="Search by title or author..."
            defaultValue={currentSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateParams({ search: e.target.value });
            }}
            className="w-full px-4 py-2 rounded-xl text-sm outline-none border"
            style={{
              borderColor: "#88BDA4",
              backgroundColor: "#f0f7f0",
              color: "#2d4f48",
            }}
          />
        </div>

        {/* Category Dropdown */}
        <Dropdown>
          <Dropdown.Trigger
            className="px-4 py-2 rounded-xl text-sm font-medium border outline-none cursor-pointer"
            style={{
              backgroundColor: currentCategory ? '#2d4f48' : '#f0f7f0',
              color: currentCategory ? '#E6F2DD' : '#2d4f48',
              borderColor: '#88BDA4',
            }}
          >
            {currentCategory ? `Category: ${currentCategory}` : 'Select Category'}
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Menu aria-label="Filter by category">
              <Dropdown.Item onPress={() => updateParams({ category: '' })}>
                All Categories
              </Dropdown.Item>
              {genres.map((g) => (
                <Dropdown.Item key={g} onPress={() => updateParams({ category: g })}>
                  {g}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {/* Results count */}
      {(currentSearch || currentCategory) && (
        <p className="text-xs mb-4" style={{ color: "#88BDA4" }}>
          Showing {books.length} of {total} results
          {currentSearch && <> for <strong>{currentSearch}</strong></>}
          {currentCategory && <> in <strong>{currentCategory}</strong></>}
        </p>
      )}

      {/* Grid */}
      {books.length === 0 ? (
        <p className="text-center mt-20" style={{ color: "#88BDA4" }}>No books found.</p>
      ) : (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
        >
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination className="justify-center">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage === 1}
                  onPress={() => updateParams({ page: String(currentPage - 1) })}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                p === 'ellipsis' ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === currentPage}
                      onPress={() => updateParams({ page: String(p) })}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage === totalPages}
                  onPress={() => updateParams({ page: String(currentPage + 1) })}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}