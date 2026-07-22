import { manageBooks } from '@/lib/api/book';
import { getBorrowedBooks } from '@/lib/api/borrow';
import { getAllUser } from '@/lib/api/user';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';
import { BookOpen, Users, BookMarked, AlertCircle } from 'lucide-react';

const AdminDashboardPage = async () => {
const users = await getAllUser();
const borrows = await getBorrowedBooks();
const books = await manageBooks()


  const totalBooks = books.length;
  const totalMembers = users.filter((u) => u.role !== "admin").length;
  const activeBorrows = borrows.filter((b) => b.status === "borrowed").length;
  const overdueBorrows = borrows.filter((b) => {
    return b.status === "borrowed" && new Date(b.dueDate) < new Date();
  }).length;

  const stats = [
    { label: "Total Books", value: totalBooks, icon: BookOpen, color: "bg-indigo-50 text-indigo-600" },
    { label: "Total Members", value: totalMembers, icon: Users, color: "bg-violet-50 text-violet-600" },
    { label: "Active Borrows", value: activeBorrows, icon: BookMarked, color: "bg-purple-50 text-purple-600" },
    { label: "Overdue", value: overdueBorrows, icon: AlertCircle, color: "bg-red-50 text-red-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Library overview and analytics</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AnalyticsCharts books={books} borrows={borrows} />
    </div>
  );
};

export default AdminDashboardPage;