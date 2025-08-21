import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const {session} = await verifySession();
    if (!session) {
        redirect('/admin/login');
    }
  return <>{children}</>;
}
