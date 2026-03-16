import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - 现代渐变背景 */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-100/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-purple-100/30 to-transparent"></div>

        {/* 圆形装饰 */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>

        <div className="relative container max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-200/50 bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-medium shadow-sm text-blue-600 hover:shadow-md transition-shadow">
            🚀 2026年最值得期待的AI Agent平台
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Agent的社区，<br />
            开发者的家园
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            发布、发现和分享AI Agent。连接全球Agent开发者，构建智能应用生态。
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              asChild
            >
              <Link href="/register">开始使用</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:border-blue-400 hover:bg-blue-50 transition-all hover:-translate-y-1"
              asChild
            >
              <Link href="/agents">浏览Agents</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-400 text-green-600 hover:border-green-500 hover:bg-green-50 transition-all hover:-translate-y-1"
              asChild
            >
              <Link href="/crypto-monitor">📊 加密货币监控</Link>
            </Button>
          </div>

          {/* 数据统计 */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-extrabold text-blue-600">10+</div>
              <div className="text-sm text-slate-500 mt-1">示例Agents</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-purple-600">5+</div>
              <div className="text-sm text-slate-500 mt-1">分类</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-indigo-600">24/7</div>
              <div className="text-sm text-slate-500 mt-1">在线支持</div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Crypto Monitor Preview */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-green-200/50 bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-medium shadow-sm text-green-600">
                📊 新功能上线
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                实时 Meme 币监控
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                自动追踪 pump.fun 热门代币，智能分析社区活跃度和叙事强度，帮你发现潜在机会。
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span>✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">多维度分析</h4>
                    <p className="text-sm text-slate-600">增长率、市值、叙事强度、社区活跃度</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span>✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">智能评级</h4>
                    <p className="text-sm text-slate-600">自动评分和排名，重点推荐高潜力代币</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span>✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">实时更新</h4>
                    <p className="text-sm text-slate-600">每60秒自动刷新，掌握最新市场动态</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                asChild
              >
                <Link href="/crypto-monitor">立即体验 →</Link>
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="bg-white/90 backdrop-blur border-2 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-lg">XAICASH</div>
                    <span className="text-2xl">🟢</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">AI基础设施叙事 - xAI和AI支付</div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-semibold">评分: 95/100</span>
                    <span className="text-slate-500">市值: $182,600</span>
                    <span className="text-green-600">+31.73%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-2 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-lg">PVE</div>
                    <span className="text-2xl">🟢</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">游戏玩家 vs 环境</div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-semibold">评分: 90/100</span>
                    <span className="text-slate-500">市值: $13,200</span>
                    <span className="text-green-600">+378.40%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-2 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-lg">CRAWSTAR</div>
                    <span className="text-2xl">🟢</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">AI Agent应用 - Claude AI + 物联网</div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-semibold">评分: 85/100</span>
                    <span className="text-slate-500">市值: $12,700</span>
                    <span className="text-green-600">+11.60%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 font-semibold text-sm mb-4">
              功能特性
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              为什么选择 AgentHub?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              为Agent开发者打造的一站式平台
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl mb-4 shadow-lg">
                  🤖
                </div>
                <CardTitle className="text-xl">发布你的Agent</CardTitle>
                <CardDescription className="text-base">
                  展示你的AI Agent，分享Prompt，让更多人发现和使用你的作品
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span>
                    支持多种Agent类型
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span>
                    版本管理和更新
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span>
                    详细的使用统计
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl mb-4 shadow-lg">
                  🧩
                </div>
                <CardTitle className="text-xl">技能市场</CardTitle>
                <CardDescription className="text-base">
                  发现和分享可复用的技能，加速Agent开发进程
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-500">✓</span>
                    丰富的技能库
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-500">✓</span>
                    一键安装使用
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-500">✓</span>
                    技能评分和评价
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-3xl mb-4 shadow-lg">
                  👥
                </div>
                <CardTitle className="text-xl">活跃社区</CardTitle>
                <CardDescription className="text-base">
                  与全球Agent开发者交流，分享经验，共同成长
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    开发者社区
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    技术讨论区
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    经验分享
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - 渐变背景 */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative container max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 text-white/80">
            <span className="text-2xl">✨</span>
            <span className="font-semibold">免费开始</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            准备好发布你的第一个Agent了吗？
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            加入 AgentHub，成为 Agent 生态系统的一部分
          </p>

          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1 font-semibold text-lg px-12"
            asChild
          >
            <Link href="/register">免费注册</Link>
          </Button>

          <p className="mt-6 text-white/70 text-sm">
            无需信用卡 · 永久免费 · 随时取消
          </p>
        </div>
      </section>
    </div>
  );
}
