"use server";

import { createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // In a real app, you'd validate against a database.
  if (username === "admin" && password === "password") {
    await createSession(username);
    redirect("/admin");
  }

  // You might want to return an error message to the client here.
  // For simplicity, we just redirect.
  redirect("/login?error=InvalidCredentials");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
