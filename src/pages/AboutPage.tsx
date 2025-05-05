
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About StoryVerse</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <p>
          StoryVerse is your personal reading companion, designed to help you organize and track your reading journey. 
          Whether you're an avid reader or just starting your literary adventure, our platform provides a beautiful and 
          eye-friendly way to manage your book collection.
        </p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Features</h2>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and manage your personal reading list</li>
          <li>Track books you're currently reading, want to read, or have completed</li>
          <li>Add details like genres, descriptions, and personal ratings</li>
          <li>Search and filter your collection</li>
          <li>Dark mode design that's easy on the eyes</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">How to Use</h2>
        
        <p>
          Browse your collection on the <strong>Library</strong> page, where you can filter by status, genre, or search for specific titles.
          Click on any book to view its full details, or use the <strong>Add Book</strong> button to add new titles to your collection.
          You can edit or remove books from your library at any time.
        </p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">About the Design</h2>
        
        <p>
          StoryVerse features a dark theme designed specifically to reduce eye strain during extended reading or browsing sessions.
          We've carefully selected colors and contrast levels to ensure readability while maintaining a modern, elegant look.
        </p>
        
        <div className="pt-8 border-t border-border/40 mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} StoryVerse. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
