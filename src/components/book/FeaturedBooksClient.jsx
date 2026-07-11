"use client";

import { motion } from "framer-motion";
import BookCard from "@/components/shared/BookCard";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturedBooksClient({ books }) {
  if (!books?.length) {
    return (
      <p className="text-center py-20 text-sm" style={{ color: "#88BDA4" }}>
        No featured books at the moment.
      </p>
    );
  }

  return (
    <motion.div
      className="grid gap-x-5 gap-y-8"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {books.map((book) => (
        <motion.div key={book._id} variants={cardVariants}>
          <BookCard book={book} />
        </motion.div>
      ))}
    </motion.div>
  );
}
