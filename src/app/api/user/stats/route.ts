import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        agentLikes: true,
        bookmarks: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Count liked agents and skills
    const likedAgents = user.agentLikes.filter((like) => like.agentId).length;
    const likedSkills = user.agentLikes.filter((like) => like.skillId).length;
    const bookmarkedAgents = user.bookmarks.filter(
      (bookmark) => bookmark.agentId
    ).length;
    const bookmarkedSkills = user.bookmarks.filter(
      (bookmark) => bookmark.skillId
    ).length;

    return NextResponse.json({
      likedAgents,
      bookmarkedAgents,
      likedSkills,
      bookmarkedSkills,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
