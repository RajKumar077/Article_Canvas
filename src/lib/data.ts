
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Article } from './types';
import { calculateReadTime } from './utils';

const articlesCollection = collection(db, 'articles');

// Helper to convert Firestore doc to Article
const fromFirestore = (docSnap: any): Article => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    shortDescription: data.shortDescription,
    content: data.content,
    posterImage: data.posterImage,
    images: data.images || [],
    tags: data.tags || [],
    // Convert Firestore Timestamp to ISO string
    createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
    readTimeMinutes: data.readTimeMinutes,
  };
};


// API-like functions to interact with Firestore
export const getArticles = async (): Promise<Article[]> => {
  const q = query(articlesCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(fromFirestore);
};

export const getArticleById = async (id: string): Promise<Article | undefined> => {
  const docRef = doc(db, 'articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return fromFirestore(docSnap);
  }
  return undefined;
};

export const createArticle = async (data: Omit<Article, 'id' | 'createdAt' | 'readTimeMinutes'>): Promise<Article> => {
  const newArticleData = {
    ...data,
    createdAt: new Date(),
    readTimeMinutes: calculateReadTime(data.content),
  };
  const docRef = await addDoc(articlesCollection, newArticleData);
  return {
    id: docRef.id,
    ...data,
    createdAt: newArticleData.createdAt.toISOString(),
    readTimeMinutes: newArticleData.readTimeMinutes
  };
};

export const updateArticle = async (id: string, data: Partial<Omit<Article, 'id'>>): Promise<Article | null> => {
    const docRef = doc(db, 'articles', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    const currentData = docSnap.data() as Article;
    
    const readTimeMinutes = data.content ? calculateReadTime(data.content) : currentData.readTimeMinutes;
    const updateData = {
        ...data,
        readTimeMinutes
    }
    await updateDoc(docRef, updateData);

    const updatedDoc = await getDoc(docRef);
    return fromFirestore(updatedDoc);
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  const docRef = doc(db, 'articles', id);
  await deleteDoc(docRef);
  return true;
};
