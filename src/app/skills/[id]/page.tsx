"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  isFree: boolean;
  price?: number;
  likesCount: number;
  createdAt: string;
}

export default function SkillDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchSkill();
    }
  }, [params.id]);

  const fetchSkill = async () => {
    try {
      const res = await fetch(`/api/skills/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setSkill(data);
        setLiked(data.liked || false);
        setBookmarked(data.bookmarked || false);
      } else {
        setError("Skill not found");
      }
    } catch (error) {
      setError("Failed to load skill");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const method = liked ? "DELETE" : "POST";
      const res = await fetch(`/api/skills/${params.id}/like`, {
        method,
      });

      if (res.ok) {
        setLiked(!liked);
        setSkill(skill ? {
          ...skill,
          likesCount: skill.likesCount + (liked ? -1 : 1)
        } : null);
      }
    } catch (error) {
      console.error("Error liking skill:", error);
    }
  };

  const handleBookmark = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const method = bookmarked ? "DELETE" : "POST";
      const res = await fetch(`/api/skills/${params.id}/bookmark`, {
        method,
      });

      if (res.ok) {
        setBookmarked(!bookmarked);
      }
    } catch (error) {
      console.error("Error bookmarking skill:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">{error || "Skill not found"}</div>
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
              {session?.user ? (
                <Link href="/profile" className="hover:text-purple-400 transition">
                  用户中心
                </Link>
              ) : (
                <>
                  <Link href="/login" className="hover:text-purple-400 transition">
                    登录
                  </Link>
                  <Link href="/register" className="hover:text-purple-400 transition">
                    注册
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回按钮 */}
        <Link
          href="/skills"
          className="inline-flex items-center text-gray-400 hover:text-white transition mb-8"
        >
          ← 返回列表
        </Link>

        {/* Skill 头部 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">{skill.name}</h1>
            <Badge variant={skill.isFree ? "default" : "secondary"}>
              {skill.isFree ? "免费" : `¥${skill.price}`}
            </Badge>
          </div>
          <div className="text-gray-400 mb-4">{skill.description}</div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>作者: {skill.author}</span>
            <span>分类: {skill.category}</span>
            <span>❤️ {skill.likesCount}</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={liked ? "default" : "outline"}
            onClick={handleLike}
            className={liked ? "bg-red-500 hover:bg-red-600" : "border-white/20 hover:bg-white/10"}
          >
            {liked ? "❤️ 已点赞" : "🤍 点赞"}
          </Button>
          <Button
            variant={bookmarked ? "default" : "outline"}
            onClick={handleBookmark}
            className={bookmarked ? "bg-blue-500 hover:bg-blue-600" : "border-white/20 hover:bg-white/10"}
          >
            {bookmarked ? "🔖 已收藏" : "📁 收藏"}
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            使用 Skill
          </Button>
        </div>

        {/* 技能详情 */}
        <Card className="bg-white/5 border-white/10 p-6">
          <h2 className="text-2xl font-semibold mb-4">技能详情</h2>
          <p className="text-gray-400">技能使用说明和文档加载中...</p>
        </Card>
      </div>
    </div>
  );
}
