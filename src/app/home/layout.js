import Navbar from "../components/navbar";
import { createClient } from "../../../lib/server";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export default async function HomeLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const name =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email.split("@")[0];

  // Upsert user with name
  await prisma.user.upsert({
    where: { email: user.email },
    update: { name },
    create: { email: user.email, name },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar user={user} />
      {children}
    </div>
  );
}
