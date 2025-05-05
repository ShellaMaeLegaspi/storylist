
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookFormData } from '@/types/book';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  coverUrl: z.string().url('Please enter a valid URL'),
  genre: z.array(z.string()).min(1, 'Please select at least one genre'),
  status: z.enum(['reading', 'completed', 'to-read']),
  rating: z.number().optional(),
});

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  isSubmitting?: boolean;
}

const GENRE_OPTIONS = [
  'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery',
  'Thriller', 'Romance', 'Historical Fiction', 'Biography', 'Self-Help',
  'Horror', 'Adventure', 'Poetry', 'Drama', 'Dystopian',
  'Young Adult', 'Children', 'Memoir', 'Contemporary', 'Classic'
];

const BookForm = ({ 
  initialData,
  onSubmit,
  isSubmitting = false
}: BookFormProps) => {
  const form = useForm<BookFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      author: '',
      description: '',
      coverUrl: '',
      genre: [],
      status: 'to-read',
    },
  });

  const handleSubmit = (data: BookFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write a brief description" 
                  className="min-h-32" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/cover.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reading Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="to-read">To Read</SelectItem>
                  <SelectItem value="reading">Currently Reading</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Genres</FormLabel>
          <div className="flex flex-wrap gap-2">
            {GENRE_OPTIONS.map((genre) => (
              <label key={genre} className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  value={genre}
                  onChange={(e) => {
                    const currentGenres = form.getValues('genre');
                    if (e.target.checked) {
                      form.setValue('genre', [...currentGenres, genre]);
                    } else {
                      form.setValue(
                        'genre',
                        currentGenres.filter((g) => g !== genre)
                      );
                    }
                  }}
                  checked={form.getValues('genre').includes(genre)}
                />
                <div className="rounded-full border border-border px-3 py-1 text-sm peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary-foreground transition-all">
                  {genre}
                </div>
              </label>
            ))}
          </div>
          {form.formState.errors.genre && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.genre.message}
            </p>
          )}
        </div>

        {form.getValues('status') === 'completed' && (
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1} 
                    max={5} 
                    step={1}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Book' : 'Add Book'}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
