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
  await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: { email: user.email },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar user={user} />
      {children}
    </div>
  );
}
