
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '@/contexts/BookContext';
import { Button } from '@/components/ui/button';
import BookGrid from '@/components/books/BookGrid';
import { Book as BookType } from '@/types/book';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { books } = useBooks();
  
  // Get different book categories
  const recentBooks = [...books]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  
  const readingBooks = books
    .filter(book => book.status === 'reading')
    .slice(0, 5);
  
  const featuredBook = recentBooks[0];
  
  return (
    <div className="container py-8 space-y-12">
      {/* Hero Section with Featured Book */}
      {featuredBook && (
        <div className="animate-fade-in rounded-2xl overflow-hidden glass-card">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center p-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to StoryVerse
              </h1>
              <p className="mt-4 text-muted-foreground">
                Your personal reading library - track books you're reading, want to read, and have completed.
              </p>
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Featured Book</h2>
                <h3 className="mt-2 text-2xl font-bold text-primary">
                  {featuredBook.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {featuredBook.description.substring(0, 150)}...
                </p>
                <div className="mt-6 flex gap-4">
                  <Link to={`/books/${featuredBook.id}`}>
                    <Button>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/books">
                    <Button variant="outline">Browse Library</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-muted/30">
              <img 
                src={featuredBook.coverUrl}
                alt={featuredBook.title}
                className="max-h-[450px] w-auto object-cover shadow-xl rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Currently Reading Section */}
      <section className="animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Currently Reading</h2>
          <Link to="/books?status=reading" className="text-sm text-primary hover:underline">
            View All
          </Link>
        </div>
        <BookGrid 
          books={readingBooks} 
          emptyMessage="You're not currently reading any books. Start reading today!"
        />
      </section>

      {/* Recent Updates Section */}
      <section className="animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Updates</h2>
          <Link to="/books" className="text-sm text-primary hover:underline">
            View All Books
          </Link>
        </div>
        <BookGrid 
          books={recentBooks} 
          emptyMessage="No recent updates. Add some books to your library!"
        />
      </section>
    </div>
  );
};

export default HomePage;
