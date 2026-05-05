import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  try {
    const { userId, movieId, movieTitle, moviePoster } = await req.json();
    const item = await prisma.watchlist.create({
      data: { userId, movieId, movieTitle, moviePoster },
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: "Already in watchlist" },
      { status: 400 },
    );
  }
}

export async function DELETE(req) {
  try {
    const { userId, movieId } = await req.json();
    await prisma.watchlist.delete({
      where: { userId_movieId: { userId, movieId } },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

await prisma.activity.create({
  data: {
    userId,
    type: "WATCHLIST_ADD",
    movieId,
    movieTitle,
    moviePoster,
  },
});
