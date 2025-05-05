
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '@/contexts/BookContext';
import BookForm from '@/components/books/BookForm';
import { BookFormData } from '@/types/book';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById, updateBook, loading } = useBooks();
  
  const book = getBookById(id || '');
  
  if (!book) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The book you're trying to edit doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/books">Back to Library</a>
          </Button>
        </div>
      </div>
    );
  }
  
  // Extract form data from book
  const bookFormData: BookFormData = {
    title: book.title,
    author: book.author,
    description: book.description,
    coverUrl: book.coverUrl,
    genre: book.genre,
    status: book.status,
    rating: book.rating,
  };
  
  const handleUpdateBook = (data: BookFormData) => {
    updateBook(book.id, data);
    navigate(`/books/${book.id}`);
  };
  
  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Edit Book</h1>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <BookForm 
            initialData={bookFormData}
            onSubmit={handleUpdateBook}
            isSubmitting={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
