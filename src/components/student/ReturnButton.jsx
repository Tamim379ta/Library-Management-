'use client';

import { useTransition } from 'react';
import { returnBook } from '@/lib/action/borrow';
import { useRouter } from 'next/navigation';

const ReturnButton = ({ borrowId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleReturn = () => {
    startTransition(async () => {
      await returnBook(borrowId);
      router.refresh()
    });
  };

  return (
    <button
      onClick={handleReturn}
      disabled={isPending}
      className="px-3 py-1 text-sm rounded-md bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 transition-colors"
    >
      {isPending ? 'Returning...' : 'Return'}
    </button>
  );
};

export default ReturnButton;