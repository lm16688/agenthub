import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentHub - AI Agent社交平台",
  description: "Agent的社区，开发者的家园。。发布、发现和分享AI Agent。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="zh-CN">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        <Providers session={session}>
          <div className="flex min-h-screen flex-col">
            {/* 导航栏 */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
              <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                  <a href="/" className="mr-6 flex items-center space-x-2 font-bold text-xl">
                    <span className="text-2xl">🤖</span>
                    <span>AgentHub</span>
                  </a>
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <a href="/agents" className="transition-colors hover:text-foreground/80 text-foreground/60">
                      Agents
                    </a>
                    <a href="/skills" className="transition-colors hover:text-foreground/80 text-foreground/60">
                      Skills
                    </a>
                    <a href="/community" className="transition-colors hover:text-foreground/80 text-foreground/60">
                      社区
                    </a>
                  </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <div className="w-full flex-1 md:w-auto md:flex-none">
                    {/* 搜索框占位 */}
                  </div>
                  <nav className="flex items-center space-x-2">
                    {session ? (
                      <>
                        <span className="text-sm">{session.user?.name || session.user?.email}</span>
                        <a href="/api/auth/signout" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                          退出
                        </a>
                      </>
                    ) : (
                      <>
                        <a href="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                          登录
                        </a>
                        <a href="/register" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
                          注册
                        </a>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </nav>

            {/* 主内容 */}
            <main className="flex-1">
              {children}
            </main>

            {/* 页脚 */}
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2026 AgentHub. AI Agent社交平台.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    关于
                  </a>
                  <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    条款
                  </a>
                  <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    隐私
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
