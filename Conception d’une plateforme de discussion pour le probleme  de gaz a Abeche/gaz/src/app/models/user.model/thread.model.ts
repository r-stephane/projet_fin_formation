export interface Thread {
  id: number;
  title: string;
  content: string; // <-- Très important!
  author: string;  // <-- Très important!
  date: Date;      // <-- Très important!
  likes: number;
  comments: number;
}