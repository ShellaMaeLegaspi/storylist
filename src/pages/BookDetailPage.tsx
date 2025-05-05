
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooks } from '@/contexts/BookContext';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash, ArrowLeft, Calendar, Clock, FileText } from 'lucide-react';

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 'medium': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
    default: return '';
  }
};

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById, deleteBook, loading } = useBooks();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const book = getBookById(id || '');
  
  if (!book) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleDelete = () => {
    deleteBook(book.id);
    setIsDeleteDialogOpen(false);
    navigate('/books');
  };
  
  return (
    <div className="container py-8">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid gap-8 md:grid-cols-3">
        {/* Book cover */}
        <div className="flex justify-center">
          <div className="relative aspect-[3/4] max-w-xs w-full rounded-lg overflow-hidden shadow-xl">
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        
        {/* Book details */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-xl text-muted-foreground">
              by {book.author}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className={`${getStatusColor(book.status)}`}
            >
              {book.status.replace('-', ' ')}
            </Badge>
            
            {book.priority && (
              <Badge 
                variant="outline" 
                className={getPriorityColor(book.priority)}
              >
                Priority: {book.priority}
              </Badge>
            )}
            
            {book.rating && (
              <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                Rating: {book.rating}/5
              </Badge>
            )}
            
            {book.genre.map(g => (
              <Badge key={g} variant="secondary">
                {g}
              </Badge>
            ))}
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p>{book.description}</p>
          </div>

          {/* Notes section */}
          {book.notes && (
            <div className="mt-6 p-4 border border-border rounded-lg bg-card/50">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <FileText className="h-4 w-4" />
                <h3 className="font-medium">Notes</h3>
              </div>
              <p className="text-muted-foreground">{book.notes}</p>
            </div>
          )}
          
          {/* Metadata */}
          <div className="pt-4 text-sm text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p>Added: {formatDate(book.createdAt)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p>Last updated: {formatDate(book.updatedAt)}</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <Button asChild>
              <Link to={`/books/${book.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{book.title}" from your library.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
