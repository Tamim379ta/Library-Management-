'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { borrowBook, returnBook } from '@/lib/action/borrow';
import toast from 'react-hot-toast';

const BorrowButton = ({ bookId, isAvailable, title, filteredBooks = [] }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Find if user already borrowed this book and it's still active
  const activeBorrow = filteredBooks.find(
    (b) => b.bookId?.toString() === bookId?.toString() && b.status === 'borrowed'
  );

  const isDueDateOver = activeBorrow
    ? new Date() > new Date(activeBorrow.dueDate)
    : false;

  const handleBorrow = async () => {
    setLoading(true);
    try {
      const res = await borrowBook(bookId, title);
      if (!res || !res.success) throw new Error(res?.error || 'Failed to borrow');
      setOpen(false);
      toast.success('Book borrowed successfully!');
      router.refresh();
    } catch (err) {
      toast.error(err.message || 'Failed to borrow book.');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    setLoading(true);
    try {
      const res = await returnBook(activeBorrow._id);
      if (!res || !res.success) throw new Error(res?.error || 'Failed to return');
      toast.success('Book returned successfully!');
      router.refresh();
    } catch (err) {
      toast.error(err.message || 'Failed to return book.');
    } finally {
      setLoading(false);
    }
  };

  // Already borrowed and due date not over — show Return button
  if (activeBorrow && !isDueDateOver) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={handleReturn}
          disabled={loading}
          className="px-5 py-2 rounded-lg text-sm font-medium text-white w-fit"
          style={{ backgroundColor: "#659287" }}
        >
          {loading ? 'Returning...' : 'Return book'}
        </button>
        <p className="text-xs" style={{ color: "#88BDA4" }}>
          Due: {new Date(activeBorrow.dueDate).toLocaleDateString()}
        </p>
      </div>
    );
  }

  // Due date over — can borrow again
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={!isAvailable}
        className="px-5 py-2 rounded-lg text-sm font-medium text-white w-fit"
        style={{
          backgroundColor: isAvailable ? "#659287" : "#B1D3B9",
          cursor: isAvailable ? "pointer" : "not-allowed",
        }}
      >
        Borrow book
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm mx-4"
            style={{ background: "white", border: "0.5px solid #B1D3B9" }}
          >
            <h2 className="text-base font-semibold mb-1" style={{ color: "#2d4f48" }}>
              Confirm borrow
            </h2>
            <p className="text-sm mb-6" style={{ color: "#88BDA4" }}>
              You'll have 14 days to return this book. Are you sure you want to borrow it?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ border: "0.5px solid #B1D3B9", color: "#659287", background: "white" }}
              >
                Cancel
              </button>
              <button
                onClick={handleBorrow}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: "#659287" }}
              >
                {loading ? 'Borrowing...' : 'Yes, borrow'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowButton;