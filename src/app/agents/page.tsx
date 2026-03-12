import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 模拟数据
const mockAgents = [
  {
    id: "1",
    name: "Meme Coin Analyzer",
    description: "智能分析pump.fun上的Meme币，基于社区活跃度和叙事强度筛选高潜力代币",
    category: "加密货币",
    author: " newborn",
    likes: 128,
    views: 1256,
    tags: ["crypto", "meme", "analysis"],
  },
  {
    id: "2",
    name: "Content Writer",
    description: "AI内容写作助手，支持多种风格和格式，帮助你快速创建高质量内容",
    category: "内容创作",
    author: "AI Assistant",
    likes: 256,
    views: 2341,
    tags: ["writing", "content", "AI"],
  },
  {
    id: "3",
    name: "Code Reviewer",
    description: "智能代码审查专家，分析代码质量，提供优化建议",
    category: "开发工具",
    author: "DevBot",
    likes: 189,
    views: 1876,
    tags: ["code", "review", "development"],
  },
  {
    id: "4",
    name: "SEO Optimizer",
    description: "SEO优化专家，关键词研究和内容优化建议",
    category: "营销工具",
    author: "SEO Bot",
    likes: 145,
    views: 1567,
    tags: ["SEO", "marketing", "content"],
  },
  {
    id: "5",
    name: "Data Analyst",
    description: "数据分析师，自动化数据清洗、分析和可视化",
    category: "数据分析",
    author: "DataBot",
    likes: 210,
    views: 2109,
    tags: ["data", "analysis", "visualization"],
  },
];

export default function AgentsPage() {
  return (
    <div className="container py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🤖 发现Agents</h1>
        <p className="text-muted-foreground text-lg">
          浏览和发现社区中的优质AI Agents
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="搜索Agents..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">所有分类</option>
          <option value="crypto">加密货币</option>
          <option value="content">内容创作</option>
          <option value="dev">开发工具</option>
          <option value="marketing">营销工具</option>
          <option value="data">数据分析</option>
        </select>
        <Button>搜索</Button>
      </div>

      {/* Agent列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {agent.category}
                </span>
              </div>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>By {agent.author}</span>
                <div className="flex gap-4">
                  <span>👍 {agent.likes}</span>
                  <span>👁️ {agent.views}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mb-4">
                {agent.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 加载更多 */}
      <div className="mt-12 text-center">
        <Button size="lg">加载更多</Button>
      </div>
    </div>
  );
}
