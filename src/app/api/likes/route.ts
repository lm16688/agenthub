import { NextRequest, NextResponse } from "next/server";

const mockLikes: Record<string, any> = {
  "like-1": {
    id: "like-1",
    userId: "user-1",
    agentId: "1",
    createdAt: "2026-03-10T10:00:00Z",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, agentId } = body;

    if (!userId || !agentId) {
      return NextResponse.json(
        { success: false, error: "userId and agentId are required" },
        { status: 400 }
      );
    }

    // TODO: 检查是否已点赞
    // TODO: 创建点赞记录
    // TODO: 更新agent的likes计数

    const newLike = {
      id: `like-${Date.now()}`,
      userId,
      agentId,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newLike,
      message: "Agent liked successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to like agent",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, agentId } = body;

    if (!userId || !agentId) {
      return NextResponse.json(
        { success: false, error: "userId and agentId are required" },
        { status: 400 }
      );
    }

    // TODO: 删除点赞记录
    // TODO: 更新agent的likes计数

    return NextResponse.json({
      success: true,
      message: "Like removed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to remove like",
      },
      { status: 400 }
    );
  }
}
