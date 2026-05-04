import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, movieId, movieTitle, moviePoster } = await req.json();
    const item = await prisma.watchLater.create({
      data: { userId, movieId, movieTitle, moviePoster },
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: "Already in watch later" },
      { status: 400 },
    );
  }
}

export async function DELETE(req) {
  try {
    const { userId, movieId } = await req.json();
    await prisma.watchLater.delete({
      where: { userId_movieId: { userId, movieId } },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
