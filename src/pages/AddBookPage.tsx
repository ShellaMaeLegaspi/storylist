
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '@/contexts/BookContext';
import BookForm from '@/components/books/BookForm';
import { BookFormData } from '@/types/book';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AddBookPage = () => {
  const navigate = useNavigate();
  const { addBook, loading } = useBooks();
  
  const handleAddBook = (data: BookFormData) => {
    addBook(data);
    // Navigate back to the books page after adding
    navigate('/books');
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
        <h1 className="text-3xl font-bold mb-8">Add New Book</h1>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <BookForm 
            onSubmit={handleAddBook}
            isSubmitting={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
