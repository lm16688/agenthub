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

    // Check if agent exists
    const agent = await prisma.agent.findUnique({
      where: { id },
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Check if already bookmarked
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        agentId: id,
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
        agentId: id,
      },
    });

    return NextResponse.json({ message: "Bookmarked successfully" });
  } catch (error) {
    console.error("Error bookmarking agent:", error);
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
        agentId: id,
      },
    });

    if (bookmark) {
      await prisma.bookmark.delete({
        where: { id: bookmark.id },
      });
    }

    return NextResponse.json({ message: "Unbookmarked successfully" });
  } catch (error) {
    console.error("Error unbookmarking agent:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
