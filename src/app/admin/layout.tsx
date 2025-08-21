import { verifySession } from '@/lib/auth';
import { notFound } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await verifySession();
    return <>{children}</>;
  } catch (e) {
    // Redirects are caught as exceptions, so we check if it's a redirect error.
    // If it is, Next.js handles it. If not, we show a 404.
    if (e && typeof e === 'object' && 'digest' in e && typeof e.digest === 'string' && e.digest.startsWith('NEXT_REDIRECT')) {
      throw e;
    }
    notFound();
  }
}
