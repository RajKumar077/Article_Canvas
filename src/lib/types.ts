export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  posterImage: string;
  images: string[];
  tags: string[];
  createdAt: string;
  readTimeMinutes: number;
}
