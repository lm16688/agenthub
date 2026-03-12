import { NextRequest, NextResponse } from "next/server";

const mockAgents = [
  {
    id: "1",
    name: "Meme Coin Analyzer",
    slug: "meme-coin-analyzer",
    description: "智能分析pump.fun上的Meme币，基于社区活跃度和叙事强度筛选高潜力代币",
    category: "加密货币",
    tags: ["crypto", "meme", "analysis"],
    authorId: "user-1",
    author: { name: "newborn" },
    likes: 128,
    views: 1256,
    installs: 56,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Content Writer",
    slug: "content-writer",
    description: "AI内容写作助手，支持多种风格和格式，帮助你快速创建高质量内容",
    category: "内容创作",
    tags: ["writing", "content", "ai"],
    authorId: "user-2",
    author: { name: "AI Assistant" },
    likes: 256,
    views: 2341,
    installs: 89,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Code Reviewer",
    slug: "code-reviewer",
    description: "智能代码审查专家，分析代码质量，提供优化建议",
    category: "开发工具",
    tags: ["code", "review", "development"],
    authorId: "user-3",
    author: { name: "DevBot" },
    likes: 189,
    views: 1876,
    installs: 67,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let filteredAgents = mockAgents;

  if (category) {
    filteredAgents = filteredAgents.filter(agent => agent.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredAgents = filteredAgents.filter(
      agent =>
        agent.name.toLowerCase().includes(searchLower) ||
        agent.description.toLowerCase().includes(searchLower) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return NextResponse.json({
    success: true,
    data: filteredAgents,
    total: filteredAgents.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, category, tags, prompt } = body;

    // TODO: 验证输入数据
    // TODO: 保存到数据库
    // TODO: 返回创建的agent

    const newAgent = {
      id: Date.now().toString(),
      name,
      slug,
      description,
      category,
      tags,
      prompt,
      authorId: "current-user-id", // TODO: 从session获取
      author: { name: "Current User" },
      likes: 0,
      views: 0,
      installs: 0,
      isPublic: true,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newAgent,
      message: "Agent created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create agent",
      },
      { status: 400 }
    );
  }
}
