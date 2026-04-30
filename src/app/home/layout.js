import Navbar from "../components/navbar";
import { createClient } from "../../../lib/server";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar user={user} />
      {children}
    </div>
  );
}
