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

    // Check if already liked
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: user.id,
        skillId: id,
      },
    });

    if (existingLike) {
      return NextResponse.json({ message: "Already liked" }, { status: 200 });
    }

    // Create like
    await prisma.like.create({
      data: {
        userId: user.id,
        skillId: id,
      },
    });

    // Increment skill like count
    await prisma.skill.update({
      where: { id },
      data: { likesCount: { increment: 1 } },
    });

    return NextResponse.json({ message: "Liked successfully" });
  } catch (error) {
    console.error("Error liking skill:", error);
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

    // Find and delete like
    const like = await prisma.like.findFirst({
      where: {
        userId: user.id,
        skillId: id,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: { id: like.id },
      });

      // Decrement skill like count
      await prisma.skill.update({
        where: { id },
        data: { likesCount: { decrement: 1 } },
      });
    }

    return NextResponse.json({ message: "Unliked successfully" });
  } catch (error) {
    console.error("Error unliking skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
