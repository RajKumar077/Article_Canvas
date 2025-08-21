import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_COOKIE_NAME = 'content-canvas-session'

// In a real app, use a library like `iron-session` or `next-auth` to encrypt the session data.
type SessionData = {
  isLoggedIn: boolean
  username: string
}

export async function createSession(username: string) {
  const sessionData: SessionData = { isLoggedIn: true, username }
  cookies().set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })
}

export async function getSession(): Promise<SessionData | null> {
  const cookie = cookies().get(SESSION_COOKIE_NAME)
  if (!cookie?.value) {
    return null
  }
  try {
    return JSON.parse(cookie.value) as SessionData
  } catch (error) {
    return null
  }
}

export async function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME)
  redirect('/admin/login');
}

export async function verifySession() {
  const session = await getSession();
  if (!session?.isLoggedIn) {
    redirect('/admin/login')
  }
  return { session };
}
