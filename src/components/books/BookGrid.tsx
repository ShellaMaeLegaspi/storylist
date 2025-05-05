
import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/types/book';

interface BookGridProps {
  books: Book[];
  emptyMessage?: string;
}

const BookGrid = ({ books, emptyMessage = "No books found" }: BookGridProps) => {
  if (books.length === 0) {
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
