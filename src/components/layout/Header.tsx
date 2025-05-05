
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Book className="h-6 w-6" />
          <span>StoryVerse</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Search books</span>
            </Button>
          </Link>
          <Link to="/books/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
