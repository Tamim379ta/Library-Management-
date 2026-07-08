import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative w-full h-52 overflow-hidden" style={{ backgroundColor: "#B1D3B9" }}>
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
        {/* Genre Badge */}
        <span
          className="absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full text-white"
          style={{ backgroundColor: "#659287" }}
        >
          {book.genre}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-base leading-tight line-clamp-2" style={{ color: "#659287" }}>
          {book.title}
        </h3>
        <p className="text-sm" style={{ color: "#88BDA4" }}>by {book.author}</p>

        {book.description && (
          <p className="text-xs text-gray-400 line-clamp-2 mt-1">{book.description}</p>
        )}

        {/* Availability */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t" style={{ borderColor: "#E6F2DD" }}>
          <span className="text-xs text-gray-400">
            Available
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: book.availableQuantity > 0 ? "#659287" : "#f87171" }}
          >
            {book.availableQuantity} / {book.totalQuantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;