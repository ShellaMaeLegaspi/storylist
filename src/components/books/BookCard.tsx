
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types/book';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link to={`/books/${book.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img 
            src={book.coverUrl} 
            alt={`Cover of ${book.title}`} 
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="line-clamp-2 font-semibold text-balance">{book.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`${getStatusColor(book.status)} text-xs font-medium`}
            >
              {book.status.replace('-', ' ')}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(book.updatedAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
