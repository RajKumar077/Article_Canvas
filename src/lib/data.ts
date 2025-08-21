import { Article } from './types';
import { calculateReadTime } from './utils';

// In-memory store for articles, simulating a database.
let articles: Article[] = [
  {
    id: '1',
    title: 'The Art of Digital Storytelling',
    shortDescription: 'Exploring how technology is changing the way we tell stories.',
    content: 'In the digital age, storytelling has transcended traditional mediums. With interactive narratives, virtual reality, and social media, we have new tools to create immersive experiences. This article delves into the techniques and technologies that are shaping the future of storytelling, from branching narratives in games to the use of data visualization to convey complex information. We will explore case studies of successful digital stories and provide insights for creators looking to innovate in this exciting field.',
    posterImage: 'https://placehold.co/600x400.png',
    images: ['https://placehold.co/1200x600.png', 'https://placehold.co/1200x600.png', 'https://placehold.co/1200x600.png'],
    createdAt: new Date('2023-10-26T10:00:00Z').toISOString(),
    readTimeMinutes: 5,
  },
  {
    id: '2',
    title: 'A Journey Through the Mountains',
    shortDescription: 'A personal account of a trek through breathtaking landscapes.',
    content: 'The air was crisp, and the silence was broken only by the crunch of our boots on the gravel path. This is a story of a five-day trek through the majestic Alps. We will cover the preparation, the challenges faced, and the sheer beauty of the untouched wilderness. From serene lakes to daunting peaks, each day brought a new perspective and a deeper appreciation for nature. This journey was not just a physical challenge but a mental one, teaching us about resilience, teamwork, and the power of the great outdoors.',
    posterImage: 'https://placehold.co/600x400.png',
    images: ['https://placehold.co/1200x600.png', 'https://placehold.co/1200x600.png'],
    createdAt: new Date('2023-11-15T14:30:00Z').toISOString(),
    readTimeMinutes: 8,
  },
  {
    id: '3',
    title: 'The Future of Remote Work',
    shortDescription: 'How the landscape of work is evolving and what to expect.',
    content: 'The COVID-19 pandemic accelerated a trend that was already underway: the shift to remote work. But what does the future hold? This article examines the long-term implications of distributed teams, the technologies enabling seamless collaboration, and the cultural shifts required for companies to thrive in this new environment. We will look at the pros and cons for both employees and employers, and discuss hybrid models that may become the new norm.',
    posterImage: 'https://placehold.co/600x400.png',
    images: ['https://placehold.co/1200x600.png'],
    createdAt: new Date('2023-12-01T09:00:00Z').toISOString(),
    readTimeMinutes: 6,
  },
];

// API-like functions to interact with the in-memory store
export const getArticles = async (): Promise<Article[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 50));
  return articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getArticleById = async (id: string): Promise<Article | undefined> => {
  await new Promise(res => setTimeout(res, 50));
  return articles.find(article => article.id === id);
};

export const createArticle = async (data: Omit<Article, 'id' | 'createdAt' | 'readTimeMinutes'>): Promise<Article> => {
  await new Promise(res => setTimeout(res, 50));
  const newArticle: Article = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString(),
    readTimeMinutes: calculateReadTime(data.content),
  };
  articles.push(newArticle);
  return newArticle;
};

export const updateArticle = async (id: string, data: Partial<Omit<Article, 'id'>>): Promise<Article | null> => {
  await new Promise(res => setTimeout(res, 50));
  const articleIndex = articles.findIndex(article => article.id === id);
  if (articleIndex === -1) {
    return null;
  }
  const originalArticle = articles[articleIndex];
  const updatedArticle = {
    ...originalArticle,
    ...data,
    readTimeMinutes: data.content ? calculateReadTime(data.content) : originalArticle.readTimeMinutes,
  };
  articles[articleIndex] = updatedArticle;
  return updatedArticle;
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  await new Promise(res => setTimeout(res, 50));
  const articleIndex = articles.findIndex(article => article.id === id);
  if (articleIndex === -1) {
    return false;
  }
  articles.splice(articleIndex, 1);
  return true;
};
