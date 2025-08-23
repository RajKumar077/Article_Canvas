
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import * as data from "@/lib/data";

const ArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot be more than 100 characters"),
  shortDescription: z
    .string()
    .min(1, "Short description is required")
    .max(100, "Short description cannot be more than 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content cannot be more than 500 characters"),
  posterImage: z.string().url("Must be a valid URL"),
  images: z
    .string()
    .transform((str) => str.split("\n").filter((url) => url.trim() !== "")),
});

export async function createArticle(formData: FormData) {
  const validatedFields = ArticleSchema.safeParse({
    title: formData.get("title"),
    shortDescription: formData.get("shortDescription"),
    content: formData.get("content"),
    posterImage: formData.get("posterImage"),
    images: formData.get("images"),
  });

  if (!validatedFields.success) {
    // Handle error - for now, just log it
    console.error(validatedFields.error);
    return;
  }
  
  await data.createArticle(validatedFields.data);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateArticle(id: string, formData: FormData) {
  const validatedFields = ArticleSchema.safeParse({
    title: formData.get("title"),
    shortDescription: formData.get("shortDescription"),
    content: formData.get("content"),
    posterImage: formData.get("posterImage"),
    images: formData.get("images"),
  });

  if (!validatedFields.success) {
    // Handle error
    console.error(validatedFields.error);
    return;
  }
  
  await data.updateArticle(id, validatedFields.data);

  revalidatePath("/");
  revalidatePath(`/articles/${id}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteArticle(id: string) {
  await data.deleteArticle(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
