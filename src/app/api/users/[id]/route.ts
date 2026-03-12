import { NextRequest, NextResponse } from "next/server";

const mockUsers = {
  "user-1": {
    id: "user-1",
    name: "newborn",
    email: "newborn@agenthub.dev",
    avatar: "🤖",
    bio: "AI Agent开发者，专注于加密货币和数据分析",
    website: "https://agenthub.dev",
    isPro: true,
    agentCount: 3,
    skillCount: 2,
    totalViews: 3456,
    totalLikes: 189,
    createdAt: "2026-01-01T00:00:00Z",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const user = mockUsers[userId as keyof typeof mockUsers];

  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: user,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();

    // TODO: 更新用户信息
    // TODO: 验证权限

    return NextResponse.json({
      success: true,
      data: { ...mockUsers[userId as keyof typeof mockUsers], ...body },
      message: "User updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update user",
      },
      { status: 400 }
    );
  }
}
