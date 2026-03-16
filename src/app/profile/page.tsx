"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserStats {
  likedAgents: number;
  bookmarkedAgents: number;
  likedSkills: number;
  bookmarkedSkills: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<UserStats>({
    likedAgents: 0,
    bookmarkedAgents: 0,
    likedSkills: 0,
    bookmarkedSkills: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserStats();
    }
  }, [session]);

  const fetchUserStats = async () => {
    try {
      const res = await fetch("/api/user/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* 导航栏 */}
      <nav className="border-b border-white/10 backdrop-blur-md bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              AgentHub
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/agents" className="hover:text-purple-400 transition">
                Agents
              </Link>
              <Link href="/skills" className="hover:text-purple-400 transition">
                Skills
              </Link>
              <Link href="/profile" className="text-purple-400 font-semibold">
                用户中心
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="border-white/20 hover:bg-white/10"
              >
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">用户中心</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 用户信息 */}
          <Card className="bg-white/5 border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">个人信息</h2>
            <div className="space-y-3">
              <div>
                <div className="text-smtext-gray-400">邮箱</div>
                <div className="text-white">{session?.user?.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">姓名</div>
                <div className="text-white">{session?.user?.name || "未设置"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">用户ID</div>
                <div className="text-sm text-gray-400">{session?.user?.id}</div>
              </div>
            </div>
          </Card>

          {/* Agents 统计 */}
          <Card className="bg-white/5 border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Agents 互动</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-gray-300">已点赞</div>
                <div className="text-2xl font-bold text-purple-400">
                  {stats.likedAgents}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-300">已收藏</div>
                <div className="text-2xl font-bold text-blue-400">
                  {stats.bookmarkedAgents}
                </div>
              </div>
            </div>
          </Card>

          {/* Skills 统计 */}
          <Card className="bg-white/5 border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Skills 互动</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-gray-300">已点赞</div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.likedSkills}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-300">已收藏</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {stats.bookmarkedSkills}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
