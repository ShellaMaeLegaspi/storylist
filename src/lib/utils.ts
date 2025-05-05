
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a unique ID for new books
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Format date to a readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
}

// Get status badge color
export function getStatusColor(status: 'reading' | 'completed' | 'to-read'): string {
  switch (status) {
    case 'reading':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'completed':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'to-read':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
}
