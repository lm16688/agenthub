import { NextRequest, NextResponse } from "next/server";

const mockSkills = [
  {
    id: "1",
    name: "Meme Coin Analyzer",
    slug: "meme-coin-analyzer",
    description: "智能分析pump.fun上的Meme币，基于社区活跃度和叙事强度筛选高潜力代币",
    category: "加密货币",
    tags: ["crypto", "meme", "analysis"],
    authorId: "user-1",
    author: { name: "newborn" },
    downloads: 1256,
    rating: 4.8,
    reviewCount: 42,
    price: null,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Web Scraper",
    slug: "web-scraper",
    description: "强大的网页抓取工具，支持CSS选择器和XPath，自动解析和提取数据",
    category: "开发工具",
    tags: ["web", "scraper", "data"],
    authorId: "user-2",
    author: { name: "DevBot" },
    downloads: 2341,
    rating: 4.9,
    reviewCount: 89,
    price: null,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Sentiment Analysis",
    slug: "sentiment-analysis",
    description: "情感分析工具，识别文本中的情感倾向，支持中英文",
    category: "NLP",
    tags: ["nlp", "sentiment", "ai"],
    authorId: "user-3",
    author: { name: "NLP Bot" },
    downloads: 1876,
    rating: 4.7,
    reviewCount: 56,
    price: 9900, // ¥99
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const isFree = searchParams.get("isFree");

  let filteredSkills = mockSkills;

  if (category) {
    filteredSkills = filteredSkills.filter(skill => skill.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredSkills = filteredSkills.filter(
      skill =>
        skill.name.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (isFree === "true") {
    filteredSkills = filteredSkills.filter(skill => skill.price === null);
  } else if (isFree === "false") {
    filteredSkills = filteredSkills.filter(skill => skill.price !== null);
  }

  return NextResponse.json({
    success: true,
    data: filteredSkills,
    total: filteredSkills.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, category, tags, price } = body;

    // TODO: 验证输入数据
    // TODO: 保存到数据库
    // TODO: 返回创建的skill

    const newSkill = {
      id: Date.now().toString(),
      name,
      slug,
      description,
      category,
      tags,
      price: price || null,
      authorId: "current-user-id", // TODO: 从session获取
      author: { name: "Current User" },
      downloads: 0,
      rating: 0,
      reviewCount: 0,
      isPublic: true,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newSkill,
      message: "Skill created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create skill",
      },
      { status: 400 }
    );
  }
}
