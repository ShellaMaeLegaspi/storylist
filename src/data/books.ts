
import { Book } from "../types/book";

// Mock data representing books in our reading list
export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change.",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    genre: ["Fiction", "Fantasy", "Contemporary"],
    status: "reading",
    rating: 4,
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2024-05-01T15:45:00Z"
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
    coverUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1170&auto=format&fit=crop",
    genre: ["Science Fiction", "Space", "Adventure"],
    status: "completed",
    rating: 5,
    createdAt: "2023-08-20T09:15:00Z",
    updatedAt: "2024-04-10T11:20:00Z"
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1176&auto=format&fit=crop",
    genre: ["Self-Help", "Personal Development", "Psychology"],
    status: "to-read",
    createdAt: "2024-01-05T14:20:00Z",
    updatedAt: "2024-01-05T14:20:00Z"
  },
  {
    id: "4",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    description: "A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat that brilliantly reimagines Homer's enduring masterwork, The Iliad. An action-packed adventure, an epic love story, Miller's debut novel has captivated readers from its initial publication.",
    coverUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=690&auto=format&fit=crop",
    genre: ["Historical Fiction", "Fantasy", "LGBTQ+"],
    status: "completed",
    rating: 5,
    createdAt: "2023-05-12T08:40:00Z",
    updatedAt: "2023-09-22T16:30:00Z"
  },
  {
    id: "5",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    description: "From the bestselling and Booker Prize winning author of Never Let Me Go and The Remains of the Day, a stunning new novel that asks, what does it mean to love?",
    coverUrl: "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1169&auto=format&fit=crop",
    genre: ["Science Fiction", "Literary Fiction", "Dystopian"],
    status: "to-read",
    createdAt: "2024-03-18T12:10:00Z",
    updatedAt: "2024-03-18T12:10:00Z"
  }
];
