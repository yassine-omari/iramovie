import React from "react";
import { createClient } from "../../../../lib/server";
import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();
  if (!supabaseUser) redirect("/login");

  const prismaUsers = await prisma.user.findMany();
  console.log(prismaUsers);

  return <div>page</div>;
};

export default page;
