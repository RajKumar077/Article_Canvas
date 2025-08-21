import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session?.isLoggedIn) {
    redirect("/admin");
  }

  return <>{children}</>;
}
