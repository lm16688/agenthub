import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockSkills = [
  {
    id: "1",
    name: "Meme Coin Analyzer",
    description: "智能分析pump.fun上的Meme币，基于社区活跃度和叙事强度筛选高潜力代币",
    category: "加密货币",
    author: "newborn",
    downloads: 1256,
    rating: 4.8,
    reviewCount: 42,
    tags: ["crypto", "meme", "analysis"],
    price: null,
  },
  {
    id: "2",
    name: "Web Scraper",
    description: "强大的网页抓取工具，支持CSS选择器和XPath，自动解析和提取数据",
    category: "开发工具",
    author: "DevBot",
    downloads: 2341,
    rating: 4.9,
    reviewCount: 89,
    tags: ["web", "scraper", "data"],
    price: null,
  },
  {
    id: "3",
    name: "Sentiment Analysis",
    description: "情感分析工具，识别文本中的情感倾向，支持中英文",
    category: "NLP",
    author: "NLP Bot",
    downloads: 1876,
    rating: 4.7,
    reviewCount: 56,
    tags: ["nlp", "sentiment", "ai"],
    price: 9900, // ¥99
  },
  {
    id: "4",
    name: "Text Summarizer",
    description: "智能文本摘要，快速提取文章核心内容，支持多种摘要模式",
    category: "NLP",
    author: "AI Assistant",
    downloads: 2109,
    rating: 4.8,
    reviewCount: 73,
    tags: ["nlp", "summarize", "text"],
    price: null,
  },
  {
    id: "5",
    name: "Keyword Extractor",
    description: "关键词提取工具，自动识别文本中的关键短语，支持TF-IDF算法",
    category: "NLP",
    author: "DataBot",
    downloads: 1567,
    rating: 4.6,
    reviewCount: 38,
    tags: ["nlp", "keyword", "data"],
    price: 4900, // ¥49
  },
  {
    id: "6",
    name: "Image Classifier",
    description: "图像分类工具，支持多种预训练模型，快速识别图片内容",
    category: "CV",
    author: "Vision Bot",
    downloads: 2876,
    rating: 4.9,
    reviewCount: 112,
    tags: ["cv", "image", "classify"],
    price: 19900, // ¥199
  },
];

export default function SkillsPage() {
  return (
    <div className="container py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🧩 技能市场</h1>
        <p className="text-muted-foreground text-lg">
          发现和安装优质技能，加速你的Agent开发
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="搜索技能..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">所有分类</option>
          <option value="crypto">加密货币</option>
          <option value="nlp">NLP</option>
          <option value="cv">CV</option>
          <option value="dev">开发工具</option>
        </select>
        <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">全部</option>
          <option value="free">免费</option>
          <option value="paid">付费</option>
        </select>
        <Button>搜索</Button>
      </div>

      {/* 技能列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSkills.map((skill) => (
          <Card key={skill.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl">{skill.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {skill.category}
                  </span>
                  {skill.price && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-bold">
                      ¥{(skill.price / 100).toFixed(0)}
                    </span>
                  )}
                </div>
              </div>
              <CardDescription>{skill.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>By {skill.author}</span>
                <div className="flex gap-4">
                  <span>⬇️ {skill.downloads}</span>
                  <span>⭐ {skill.rating}</span>
                  <span>💬 {skill.reviewCount}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mb-4">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link href={`/skills/${skill.id}`} className="w-full">
                <Button className="w-full" variant={skill.price ? "default" : "outline"}>
                  {skill.price ? "购买" : "免费安装"}
                </Button>
              </Link>
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
