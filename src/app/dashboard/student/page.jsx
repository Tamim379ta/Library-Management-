import React from 'react';
import { getBorrowedBooks } from '@/lib/api/borrow';
import { getUserSession } from '@/lib/core/session';
import { BookOpen, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const StudentDashBoardPage = async () => {
  const borrowedBooks = await getBorrowedBooks();
  const user = await getUserSession();
  const userId = user?.id;

  const filteredBooks = borrowedBooks.filter((borrow) => borrow.userId === userId);

  const total = filteredBooks.length;
  const active = filteredBooks.filter((b) => b.status === 'borrowed').length;
  const returned = filteredBooks.filter((b) => b.status === 'returned').length;
  const overdue = filteredBooks.filter(
    (b) => b.status === 'borrowed' && new Date(b.dueDate) < new Date()
  ).length;

  const stats = [
    {
      label: 'Total Borrowed',
      value: total,
      icon: BookOpen,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Currently Borrowed',
      value: active,
      icon: Clock,
      bg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
    },
    {
      label: 'Returned',
      value: returned,
      icon: CheckCircle,
      bg: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      label: 'Overdue',
      value: overdue,
      icon: AlertTriangle,
      bg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">Welcome back, {user?.name} 👋</h2>
        <p className="mt-1 text-teal-100 text-sm">
          Every book you read is a step closer to who you want to become.
        </p>
        <p className="text-teal-200 text-xs mt-1">
          Keep exploring, keep growing.
        </p>
      </div>

      {/* Stats Cards */}
      <div>
        <h1 className="text-lg font-semibold text-gray-700 mb-4">Your Overview</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl p-5 flex flex-col gap-3`}
            >
              <stat.icon className={`${stat.iconColor} w-6 h-6`} />
              <div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StudentDashBoardPage;