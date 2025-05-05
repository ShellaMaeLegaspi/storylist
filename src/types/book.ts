
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genre: string[];
  status: 'reading' | 'completed' | 'to-read';
  rating?: number;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookFormData = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
