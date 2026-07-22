"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#4f46e5"];

export default function AnalyticsCharts({ books, borrows }) {
  // Genre distribution
  const genreMap = {};
  for (const book of books) {
    genreMap[book.genre] = (genreMap[book.genre] || 0) + 1;
  }
  const genreData = Object.entries(genreMap).map(([name, value]) => ({ name, value }));

  // Top borrowed books
  const borrowCountMap = {};
  for (const borrow of borrows) {
    borrowCountMap[borrow.title] = (borrowCountMap[borrow.title] || 0) + 1;
  }
  const topBorrowedData = Object.entries(borrowCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([title, count]) => ({
      title: title.length > 20 ? title.slice(0, 18) + "…" : title,
      count,
    }));

  // Borrow activity by month
  const monthMap = {};
  for (const borrow of borrows) {
    const date = new Date(borrow.borrowDate);
    const key = date.toLocaleString("default", { month: "short", year: "2-digit" });
    monthMap[key] = (monthMap[key] || 0) + 1;
  }
  const borrowTrendData = Object.entries(monthMap).map(([month, borrows]) => ({ month, borrows }));

  // Book availability (first 8)
  const availabilityData = books.slice(0, 8).map((book) => ({
    title: book.title.length > 16 ? book.title.slice(0, 14) + "…" : book.title,
    available: book.availableQuantity,
    borrowed: book.totalQuantity - book.availableQuantity,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Borrow Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Borrow Activity Over Time
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={borrowTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
            <Line type="monotone" dataKey="borrows" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Genre Distribution */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Books by Genre
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={genreData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
              {genreData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
            <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: 12, color: "#64748b" }}>{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Borrowed Books */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Most Borrowed Books
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topBorrowedData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#94a3b8" }} allowDecimals={false} />
            <YAxis dataKey="title" type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={100} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Book Availability */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Book Availability
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={availabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="title" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
            <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: 12, color: "#64748b" }}>{value}</span>} />
            <Bar dataKey="available" fill="#6366f1" radius={[4, 4, 0, 0]} name="Available" />
            <Bar dataKey="borrowed" fill="#c4b5fd" radius={[4, 4, 0, 0]} name="Borrowed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}