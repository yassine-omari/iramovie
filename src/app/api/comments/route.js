import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  try {
    const { userId, movieId, content, userName } = await req.json();
    const comment = await prisma.comment.create({
      data: { userId, movieId, content, userName },
    });
    return NextResponse.json(comment);
  } catch {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const { commentId, userId } = await req.json();
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    await prisma.comment.delete({ where: { id: commentId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
