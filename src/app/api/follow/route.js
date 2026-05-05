import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { followerId, followingId } = await req.json();
    const follow = await prisma.follow.create({
      data: { followerId, followingId },
    });
    return NextResponse.json(follow);
  } catch {
    return NextResponse.json({ error: "Already following" }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { followerId, followingId } = await req.json();
    await prisma.follow.delete({
      where: { followerId_followingId: { followerId, followingId } },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}