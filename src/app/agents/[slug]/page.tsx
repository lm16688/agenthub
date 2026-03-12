import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockAgents: Record<string, any> = {
  "meme-coin-analyzer": {
    id: "1",
    name: "Meme Coin Analyzer",
    slug: "meme-coin-analyzer",
    description: "智能分析pump.fun上的Meme币，基于社区活跃度和叙事强度筛选高潜力代币。支持实时数据抓取、社区热度追踪、风险评估等功能。",
    category: "加密货币",
    tags: ["crypto", "meme", "analysis", "trading"],
    prompt: `分析pump.fun上的Meme币：

1. 数据收集
   - 获取代币基本信息
   - 抓取社交媒体讨论
   - 分析社区活跃度

2. 叙事分析
   - 识别代币叙事
   - 评估叙事强度
   - 判断趋势方向

3. 风险评估
   - 分析市值变化
   - 评估流动性风险
   - 识别潜在问题

4. 生成报告
   - 综合评分
   - 投资建议
   - 关键指标`,
    version: "1.0.0",
    likes: 128,
    views: 1256,
    installs: 56,
    authorId: "user-1",
    author: { name: "newborn", avatar: "🤖" },
    isPublic: true,
    isFeatured: true,
    createdAt: "2026-03-10T10:00:00Z",
  },
  "content-writer": {
    id: "2",
    name: "Content Writer",
    slug: "content-writer",
    description: "AI内容写作助手，支持多种风格和格式，帮助你快速创建高质量内容。适用于小红书、公众号、抖音等多种平台。",
    category: "内容创作",
    tags: ["writing", "content", "ai", "social"],
    prompt: "根据用户需求生成高质量内容...",
    version: "2.1.0",
    likes: 256,
    views: 2341,
    installs: 89,
    authorId: "user-2",
    author: { name: "AI Assistant", avatar: "🤖" },
    isPublic: true,
    isFeatured: false,
    createdAt: "2026-03-09T15:30:00Z",
  },
};

interface AgentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = mockAgents[slug];

  if (!agent) {
    notFound();
  }

  return (
    <div className="container py-8">
      {/* 面包屑导航 */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">首页</Link>
        <span>/</span>
        <Link href="/agents" className="hover:text-foreground">Agents</Link>
        <span>/</span>
        <span className="text-foreground">{agent.name}</span>
      </nav>

      {/* Agent头部 */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{agent.name}</h1>
              <Badge variant="outline">{agent.category}</Badge>
              {agent.isFeatured && <Badge variant="default">精选</Badge>}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>By {agent.author.name} {agent.author.avatar}</span>
              <span>•</span>
              <span>版本 {agent.version}</span>
              <span>•</span>
              <span>创建于 {new Date(agent.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">❤️ {agent.likes}</Button>
            <Button>安装</Button>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-6">
          {agent.description}
        </p>

        {/* 统计信息 */}
        <div className="flex gap-8 text-sm">
          <div>
            <span className="font-semibold">{agent.views}</span>
            <span className="text-muted-foreground"> 浏览</span>
          </div>
          <div>
            <span className="font-semibold">{agent.installs}</span>
            <span className="text-muted-foreground"> 安装</span>
          </div>
          <div>
            <span className="font-semibold">{agent.likes}</span>
            <span className="text-muted-foreground"> 点赞</span>
          </div>
        </div>
      </div>

      {/* 标签 */}
      <div className="mb-8">
        <div className="flex gap-2 flex-wrap">
          {agent.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Prompt展示 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
            {agent.prompt}
          </pre>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. 安装</h3>
              <p className="text-sm text-muted-foreground">
                点击"安装"按钮，将此Agent添加到你的工作空间。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. 配置</h3>
              <p className="text-sm text-muted-foreground">
                根据你的需求调整Prompt参数，或使用默认配置。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. 运行</h3>
              <p className="text-sm text-muted-foreground">
                输入你的需求，Agent会自动处理并返回结果。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 版本历史 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>版本历史</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded">
              <div>
                <span className="font-semibold">v{agent.version}</span>
                <span className="text-sm text-muted-foreground ml-2">当前版本</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(agent.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 作者信息 */}
      <Card>
        <CardHeader>
          <CardTitle>作者</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{agent.author.avatar}</div>
            <div>
              <div className="font-semibold">{agent.author.name}</div>
              <div className="text-sm text-muted-foreground">
                发布了 {Math.floor(Math.random() * 20) + 5} 个Agent
              </div>
            </div>
            <Link href={`/profile/${agent.authorId}`}>
              <Button variant="outline" size="sm">
                查看主页
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
