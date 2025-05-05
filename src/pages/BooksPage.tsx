
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooks } from '@/contexts/BookContext';
import { Book } from '@/types/book';
import BookGrid from '@/components/books/BookGrid';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Edit,
  Trash, 
  Eye 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Link } from 'react-router-dom';

const BooksPage = () => {
  const { books, deleteBook } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || 'all';
  const genre = searchParams.get('genre') || 'all';
  
  // Extract unique genres from books
  const allGenres = [...new Set(books.flatMap(book => book.genre))].sort();

  // Filter books based on search parameters
  useEffect(() => {
    let result = [...books];
    
    // Filter by search query
    if (query) {
      const searchQuery = query.toLowerCase();
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery) ||
          book.description.toLowerCase().includes(searchQuery)
      );
    }
    
    // Filter by status
    if (status && status !== 'all') {
      result = result.filter(book => book.status === status);
    }
    
    // Filter by genre
    if (genre && genre !== 'all') {
      result = result.filter(book => book.genre.includes(genre));
    }
    
    // Sort by updated date (most recent first)
    result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    setFilteredBooks(result);
  }, [books, query, status, genre]);

  // Update search parameters
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('query', e.target.value);
    } else {
      newParams.delete('query');
    }
    setSearchParams(newParams);
  };

  const handleStatusChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== 'all') {
      newParams.set('status', value);
    } else {
      newParams.delete('status');
    }
    setSearchParams(newParams);
  };

  const handleGenreChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== 'all') {
      newParams.set('genre', value);
    } else {
      newParams.delete('genre');
    }
    setSearchParams(newParams);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Book Management</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('table')}
          >
            <List className="h-5 w-5" />
          </Button>
          <Button asChild className="ml-2">
            <Link to="/books/new">Add New Book</Link>
          </Button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            className="pl-9"
            value={query}
            onChange={handleSearch}
          />
        </div>
        <div>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="to-read">To Read</SelectItem>
              <SelectItem value="reading">Currently Reading</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={genre} onValueChange={handleGenreChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          {query && ` for "${query}"`}
          {status !== 'all' && ` with status "${status}"`}
          {genre !== 'all' && ` in genre "${genre}"`}
        </p>
      </div>
      
      {/* Books display */}
      {viewMode === 'grid' ? (
        <BookGrid 
          books={filteredBooks} 
          emptyMessage="No books found matching your filters."
        />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Genres</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No books found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(book.status)}
                      >
                        {book.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {book.genre.slice(0, 2).map(g => (
                          <Badge key={g} variant="secondary" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                        {book.genre.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{book.genre.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(book.updatedAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="icon" variant="ghost">
                          <Link to={`/books/${book.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild size="icon" variant="ghost">
                          <Link to={`/books/${book.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
