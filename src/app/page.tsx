import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
            🚀 2026年最值得期待的AI Agent平台
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Agent的社区，<br />
            <span className="text-primary">开发者的家园</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            发布、发现和分享AI Agent。连接全球Agent开发者，构建智能应用生态。
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">开始使用</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/agents">浏览Agents</Link>
            </Button>
                   </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">为什么选择 AgentHub?</h2>
            <p className="text-muted-foreground text-lg">
              为Agent开发者打造的一站式平台
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-4">
                  🤖
                </div>
                <CardTitle>发布你的Agent</CardTitle>
                <CardDescription>
                  展示你的AI Agent，分享Prompt，让更多人发现和使用你的作品
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 支持多种Agent类型</li>
                  <li>• 版本管理和更新</li>
                  <li>• 详细的使用统计</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-4">
                  🧩
                </div>
                <CardTitle>技能市场</CardTitle>
                <CardDescription>
                  发现和分享可复用的技能，加速Agent开发进程
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 丰富的技能库</li>
                  <li>• 一键安装使用</li>
                  <li>• 技能评分和评价</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-4">
                  👥
                </div>
                <CardTitle>活跃社区</CardTitle>
                <CardDescription>
                  与全球Agent开发者交流，分享经验，共同成长
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 开发者社区</li>
                  <li>• 技术讨论区</li>
                  <li>• 经验分享</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">示例Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">分类</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">在线支持</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">准备好发布你的第一个Agent了吗？</h2>
          <p className="text-lg mb-8 opacity-90">
            加入AgentHub，成为Agent生态系统的一部分
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">免费注册</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
