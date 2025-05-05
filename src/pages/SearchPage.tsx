
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooks } from '@/contexts/BookContext';
import { Book } from '@/types/book';
import BookGrid from '@/components/books/BookGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

const SearchPage = () => {
  const { books } = useBooks();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<Book[]>([]);
  
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  
  const performSearch = (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    
    const searchTerm = q.toLowerCase();
    const filtered = books.filter(
      book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm) ||
        book.genre.some(g => g.toLowerCase().includes(searchTerm))
    );
    
    setResults(filtered);
  };
  
  // Initial search based on URL parameter
  useEffect(() => {
    performSearch(query);
  }, [query, books]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    setResults([]);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Search Books</h1>
      
      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books by title, author, or genre..."
              className="pl-9 pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={clearSearch}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>
      
      {/* Search results */}
      {query ? (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {results.length > 0 
                ? `Found ${results.length} ${results.length === 1 ? 'result' : 'results'}` 
                : 'No results found'}
            </h2>
          </div>
          
          <BookGrid 
            books={results}
            emptyMessage={`No books found matching "${query}". Try a different search term.`}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Enter a search term to find books in your library.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
