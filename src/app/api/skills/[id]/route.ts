import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    let liked = false;
    let bookmarked = false;

    // If user is logged in, check if they liked/bookmarked
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        const [likeCheck, bookmarkCheck] = await Promise.all([
          prisma.like.findFirst({
            where: {
              userId: user.id,
              skillId: id,
            },
          }),
          prisma.bookmark.findFirst({
            where: {
              userId: user.id,
              skillId: id,
            },
          }),
        ]);

        liked = !!likeCheck;
    bookmarked = !!bookmarkCheck;
      }
    }

    // Get skill
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...skill,
      liked,
      bookmarked,
    });
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
