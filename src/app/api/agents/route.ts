import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

// Mock 数据用于演示
const mockAgents = [
  {
    id: "agent-1",
    name: "Meme Coin Analyzer",
    slug: "meme-coin-analyzer",
    description: "分析 Meme 币的市场趋势、社区活跃度和价格走势",
    category: "crypto",
    tags: "crypto, meme, analysis, trading",
    prompt: `分析任务：Meme 币市场分析

步骤1：获取市场数据
- 从 pump.fun 获取最新的 Meme 币列表
- 查询价格数据（如有）
- 查取社交媒体热度（X/Twitter）

步骤2：数据分析
- 评估市场热度（交易量、价格波动）
- 分析社区活跃度（发帖数量、互动率）
- 识别潜在风险

步骤3：生成报告
- 按市场热度排序
- 提供买入/卖出建议
- 标注风险等级

输出要求：
- 格式：JSON 或 Markdown 表格
- 内容：包含排名、价格、市值、建议
- 风险：高/中/低风险分类`,
    version: "1.0.0",
    isPublic: true,
    views: 1234,
    likes: 89,
    installs: 45,
    authorId: "user-1",
    ogImage: "https://images.unsplash.com/photo-1639762684856-9d312d85dab4e065d0875423?w=800&h=400",
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-03-12T00:00:00Z",
  },
  {
    id: "agent-2",
    name: "小红书文案生成器",
    slug: "xiaohongshu-writer",
    description: "根据输入的主题和风格，自动生成小红书爆款文案",
    category: "content",
    tags: "xiaohongshu, content, ai, writing",
    prompt: `文案生成任务

步骤1：理解需求
- 确定目标受众（宝妈、职场人、学生）
- 确定内容类型（种草、测评、分享）
- 确定风格（活泼、专业、温馨）

步骤2：内容创作
- 创作吸引人的标题
- 撰写有价值的内容
- 添加适当的表情符号

步骤3：优化输出
- 优化关键词布局
- 调整段落结构
- 添加引导互动的结尾

输出要求：
- 格式：小红书笔记格式
- 内容：标题、正文、标签
- 风格：符合小红书社区规范`,
    version: "1.2.0",
    isPublic: true,
    views: 2341,
    likes: 156,
    installs: 234,
    authorId: "user-1",
    createdAt: "2026-03-05T00:00:00Z",
    updatedAt: "2026-03-10T00:00:00Z",
  },
];

// GET /api/agents - 获取所有 Agents
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  
  try {
    // TODO: 从数据库读取
    let agents = mockAgents;
    
    // 分类筛选
    if (category) {
      agents = agents.filter(agent => agent.category === category);
    }
    
    // 搜索筛选
    if (search) {
      agents = agents.filter(agent => 
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: agents,
      total: agents.length,
    });
  } catch (error) {
    console.error("获取 Agents 错误:", error);
    return NextResponse.json(
      {
        success: false,
        error: "获取失败",
      },
      { status: 500 }
    );
  }
}

// POST /api/agents - 创建新 Agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.name || !body.slug || !body.description || !body.prompt) {
      return NextResponse.json(
        { success: false, error: "名称、URL标识、描述和 Prompt 必填" },
        { status: 400 }
      );
    }

    // TODO: 保存到数据库
    const newAgent = {
      id: `agent-${Date.now()}`,
      ...body,
      version: "1.0.0",
      isPublic: body.isPublic ?? true,
      views: 0,
      likes: 0,
      installs: 0,
      authorId: "user-1", // TODO: 从 session 获取
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newAgent,
        message: "Agent 发布成功！",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("创建 Agent 错误:", error);
    return NextResponse.json(
      {
        success: false,
        error: "创建失败",
      },
      { status: 500 }
    );
  }
}
