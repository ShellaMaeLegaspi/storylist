
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Book, BookFormData } from '../types/book';
import { books as initialBooks } from '../data/books';
import { generateId } from '../lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface BookContextType {
  books: Book[];
  loading: boolean;
  addBook: (book: BookFormData) => void;
  updateBook: (id: string, book: BookFormData) => void;
  deleteBook: (id: string) => void;
  getBookById: (id: string) => Book | undefined;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addBook = (bookData: BookFormData) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newBook: Book = {
        ...bookData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setBooks([newBook, ...books]);
      setLoading(false);
      toast({
        title: "Book added",
        description: `"${bookData.title}" has been added to your reading list.`
      });
    }, 500);
  };

  const updateBook = (id: string, bookData: BookFormData) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setBooks(books.map(book => 
        book.id === id 
          ? { ...book, ...bookData, updatedAt: new Date().toISOString() } 
          : book
      ));
      setLoading(false);
      toast({
        title: "Book updated",
        description: `"${bookData.title}" has been updated.`
      });
    }, 500);
  };

  const deleteBook = (id: string) => {
    const bookToDelete = books.find(book => book.id === id);
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setBooks(books.filter(book => book.id !== id));
      setLoading(false);
      toast({
        title: "Book removed",
        description: bookToDelete ? `"${bookToDelete.title}" has been removed.` : "Book has been removed."
      });
    }, 500);
  };

  const getBookById = (id: string) => {
    return books.find(book => book.id === id);
  };

  return (
    <BookContext.Provider value={{ books, loading, addBook, updateBook, deleteBook, getBookById }}>
      {children}
    </BookContext.Provider>
  );
};
