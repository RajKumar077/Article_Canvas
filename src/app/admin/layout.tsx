import { verifySession } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await verifySession();
  return <>{children}</>;
}
