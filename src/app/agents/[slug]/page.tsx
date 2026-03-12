"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AgentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Mock 数据
  const mockAgent = {
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
    author: {
      id: "user-1",
      name: "newborn",
      avatar: "🤖",
      bio: "AI Agent开发者，专注于加密货币和数据分析",
    },
    ogImage: "https://images.unsplash.com/photo-1639762684856-9d312d85dab4e065d0875423?w=800&h=400",
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-03-12T00:00:00Z",
  };

  if (params.slug !== mockAgent.slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agent 不存在</h1>
          <p className="text-muted-foreground mb-6">
            找不到 Slug 为 {params.slug} 的 Agent
          </p>
          <Button asChild>
            <Link href="/agents">
              返回 Agents 列表
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 封面图 */}
      <div className="h-64 w-full relative">
        <img
          src={mockAgent.ogImage || "/placeholder.jpg"}
          alt={mockAgent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* 主要内容 */}
      <div className="container py-8 -mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧：Agent 信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 标题和作者 */}
            <div>
              <Badge variant="secondary" className="mb-2">
                {mockAgent.category}
              </Badge>
              <h1 className="text-4xl font-bold">{mockAgent.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {mockAgent.author.avatar}
                </div>
                <div>
                  <p className="font-medium">{mockAgent.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockAgent.author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* 描述 */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">关于此 Agent</h2>
              <p className="text-muted-foreground leading-relaxed">
                {mockAgent.description}
              </p>

              <div className="mt-6 space-y-2">
                <h3 className="font-semibold">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {mockAgent.tags.split(",").map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Prompt</h2>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {mockAgent.prompt}
              </pre>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <Button size="lg">使用 Agent</Button>
              <Button variant="outline" size="lg">
                ❤️ 点赞
              </Button>
              <Button variant="outline" size="lg">
                📥 收藏
              </Button>
            </div>
          </div>

          {/* 右侧：统计信息 */}
          <div className="space-y-6">
            {/* 统计卡片 */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">统计信息</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">👁 浏览量</span>
                  <span className="font-semibold">{mockAgent.views}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">❤️ 点赞</span>
                  <span className="font-semibold">{mockAgent.likes}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">📥 安装</span>
                  <span className="font-semibold">{mockAgent.installs}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">📝 版本</span>
                  <span className="font-semibold">{mockAgent.version}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">🆕 发布时间</span>
                  <span className="font-semibold text-sm">
                    {new Date(mockAgent.createdAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">🔄 更新时间</span>
                  <span className="font-semibold text-sm">
                    {new Date(mockAgent.updatedAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
              </div>
            </div>

            {/* 作者信息卡片 */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">作者</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                    {mockAgent.author.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{mockAgent.author.name}</p>
                    <p className="text-sm text-muted-foreground">开发者</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">📊 发布 Agents</span>
                    <span className="font-semibold">3</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">🧩 发布 Skills</span>
                    <span className="font-semibold">2</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">⭐ 总点赞</span>
                    <span className="font-semibold">189</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">👁 总浏览</span>
                    <span className="font-semibold">3456</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  查看作者主页
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
