import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if skill exists
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    // Check if already bookmarked
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        skillId: id,
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { message: "Already bookmarked" },
        { status: 200 }
      );
    }

    // Create bookmark
    await prisma.bookmark.create({
      data: {
        userId: user.id,
        skillId: id,
      },
    });

    return NextResponse.json({ message: "Bookmarked successfully" });
  } catch (error) {
    console.error("Error bookmarking skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find and delete bookmark
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        skillId: id,
      },
    });

    if (bookmark) {
      await prisma.bookmark.delete({
        where: { id: bookmark.id },
      });
    }

    return NextResponse.json({ message: "Unbookmarked successfully" });
  } catch (error) {
    console.error("Error unbookmarking skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
