"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Coin {
  name: string;
  symbol: string;
  market_cap: number;
  growth: number;
  description: string;
  narrative: string;
  category: string;
  potential?: string;
  score: number;
  rating: string;
  reasons: string[];
}

interface XPost {
  author: string;
  username: string;
  followers: number;
  content: string;
  metrics: {
    likes: number;
    retweets: number;
    replies: number;
    timestamp: string;
  };
  verified: boolean;
}

interface AnalysisResponse {
  success: boolean;
  timestamp: string;
  coins: Coin[];
  top5: Coin[];
  total: number;
}

export default function CryptoMonitorPagePage() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [xPosts, setXPosts] = useState<Record<string, XPost[]>>({});
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/crypto/analyze");
      const result = await res.json();
      
      if (result.success) {
        setData(result);
        setLastUpdate(new Date().toLocaleString("zh-CN"));
        setError(null);
      } else {
        setError(result.error || "获取数据失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const fetchXPosts = async (symbol: string) => {
    try {
      setLoadingPosts(prev => new Set([...prev, symbol]));
      const res = await fetch(`/api/crypto/xposts?symbol=${symbol}`);
      const result = await res.json();
      
      if (result.success) {
        setXPosts(prev => ({
          ...prev,
          [symbol]: result.posts
        }));
      }
    } catch (err) {
      console.error("Failed to fetch X posts:", err);
    } finally {
      setLoadingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(symbol);
        return newSet;
      });
    }
  };

  useEffect(() => {
    fetchData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📊 Meme币监控
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                实时追踪 pump.fun 热门代币 + X平台热度
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="text-slate-500">最后更新</div>
                <div className="font-semibold text-slate-700">{lastUpdate || "---"}</div>
              </div>
              <Button
                onClick={() => {
                  fetchData();
                }}
                disabled={loading}
                size="sm"
              >
                {loading ? "加载中..." : "🔄 刷新"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                监控代币数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {data?.total || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                重点跟踪
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {data?.coins.filter(c => c.rating.includes("重点")).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                值得关注
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {data?.coins
                  .filter(c => c.rating.includes("关注") && !c.rating.includes("重点"))
                  .length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                自动刷新
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">
                {autoRefresh ? "✅ 开启" : "❌ 关闭"}
              </div>
              <Button
                onClick={() => setAutoRefresh(!autoRefresh)}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                {autoRefresh ? "关闭" : "开启"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {loading && !data && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⏳</div>
            <div className="text-xl text-slate-600">加载中...</div>
          </div>
        )}

        {error && (
          <Card className="mb-8 bg-red-50 border-red-200">
            <CardContent className="py-4">
              <div className="text-red-800 text-center">
                ❌ {error}
              </div>
            </CardContent>
          </Card>
        )}

        {data && (
          <>
            {/* TOP 5 高潜力代币 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span>⭐</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TOP 5 高潜力代币
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.top5.map((coin, index) => (
                  <Card
                    key={coin.symbol}
                    className="bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-sm text-slate-500 mb-1">
                            #{index + 1}
                          </div>
                          <CardTitle className="text-xl">{coin.name}</CardTitle>
                          <Badge
                            variant={
                              coin.rating.includes("重点")
                                ? "default"
                                : "secondary"
                            }
                            className="mt-2"
                          >
                            {coin.symbol}
                          </Badge>
                        </div>
                        <div className="text-4xl">
                          {coin.rating.includes("重点") ? "🟢" : "🟡"}
                        </div>
                      </div>
                      <CardDescription className="text-base">
                        {coin.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* 基本信息 */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-slate-500">市值:</span>
                            <span className="ml-2 font-semibold text-slate-700">
                              ${coin.market_cap.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">增长:</span>
                            <span className={`ml-2 font-semibold ${
                              coin.growth > 10 ? "text-green-600" : 
                              coin.growth > 0 ? "text-blue-600" : 
                              "text-red-600"
                            }`}>
                              {coin.growth.toFixed(2)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">评分:</span>
                            <span className="ml-2 font-semibold text-slate-700">
                              {coin.score}/100
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">分类:</span>
                            <span className="ml-2 font-semibold text-slate-700">
                              {coin.category}
                            </span>
                          </div>
                        </div>

                        {/* 评级 */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                          <div className="text-sm text-slate-600 mb-1">综合评级</div>
                          <div className="text-lg font-bold text-blue-600">
                            {coin.rating}
                          </div>
                        </div>

                        {/* 评分理由 */}
                        <div>
                          <div className="text-sm text-slate-600 mb-2">评分理由</div>
                          <div className="flex flex-wrap gap-2">
                            {coin.reasons.map((reason, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* X平台热度 */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-slate-600">X平台热度</div>
                            <Button
                              onClick={() => {
                                if (!xPosts[coin.symbol]) {
                                  fetchXPosts(coin.symbol);
                                }
                                setSelectedCoin(coin.symbol);
                              }}
                              variant="outline"
                              size="sm"
                              disabled={loadingPosts.has(coin.symbol)}
                            >
                              {loadingPosts.has(coin.symbol) ? "加载中..." : xPosts[coin.symbol] ? "收起 ↑" : "查看 ↓"}
                            </Button>
                          </div>
                          
                          {selectedCoin === coin.symbol && xPosts[coin.symbol] && (
                            <div className="space-y-3 mt-3">
                              {xPosts[coin.symbol].map((post, postIdx) => (
                                <div key={postIdx} className="bg-white/60 rounded-lg p-3 border border-blue-100">
                                  <div className="flex items-start gap-3 mb-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-slate-900">{post.author}</span>
                                        <span className="text-xs text-slate-500">{post.username}</span>
                                        {post.verified && <span className="text-blue-500">✓</span>}
                                      </div>
                                      <div className="text-xs text-slate-500">
                                        {post.followers.toLocaleString()} 粉丝
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-sm text-slate-700 mb-2">
                                    {post.content}
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span>❤️ {post.metrics.likes.toLocaleString()}</span>
                                    <span>🔄 {post.metrics.retweets.toLocaleString()}</span>
                                    <span>💬 {post.metrics.replies.toLocaleString()}</span>
                                    <span>⏰ {post.metrics.timestamp}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 全部代币列表 */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span>📋</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  全部代币列表
                </span>
              </h2>

              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                        <tr>
                          {["排名", "代币", "市值", "增长率", "评分", "评级", "分类"].map(header => (
                            <th key={header} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.coins.map((coin, index) => (
                          <tr
                            key={coin.symbol}
                            className={`border-b hover:bg-blue-50/50 transition-colors ${
                              index < 5 ? "bg-yellow-50/30" : ""
                            }`}
                          >
                            <td className="px-4 py-3 text-sm font-semibold">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <div className="font-semibold text-slate-900">{coin.symbol}</div>
                                <div className="text-xs text-slate-500 truncate max-w-[150px]">
                                  {coin.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${coin.market_cap.toLocaleString()}
                            </td>
                            <td className={`px-4 py-3 text-sm font-semibold ${
                              coin.growth > 10 ? "text-green-600" : 
                              coin.growth > 0 ? "text-blue-600" : 
                              "text-red-600"
                            }`}>
                              {coin.growth.toFixed(2)}%
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold">
                              {coin.score}/100
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-lg">{coin.rating.split(' ')[0]}</span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline">{coin.category}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {/* Warning */}
        <Card className="mt-12 bg-yellow-50 border-yellow-200">
          <CardContent className="py-6">
            <div className="text-center">
              <div className="text-2xl mb-3">⚠️</div>
              <h3 className="text-lg font-bold text-yellow-900 mb-2">
                重要风险提示
              </h3>
              <p className="text-sm text-yellow-800 mb-4">
                本分析仅供参考，不构成投资建议！Meme币风险极高，可能导致本金全部损失。
                请务必 DYOR（自己深入研究），只投入你能承受损失的资金。
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-yellow-700">
                <Badge variant="outline">DYOR</Badge>
                <Badge variant="outline">设置止损</Badge>
                <Badge variant="outline">分散投资</Badge>
                <Badge variant="outline">风险自负</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 bg-white/50 backdrop-blur border-t">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p className="mb-2">💰 祝你在加密市场投资顺利，早日实现财务自由！</p>
          <p>生成者: AI Agent | 系统: 加密货币监控工具 v2.0 (含X平台数据)</p>
        </div>
      </footer>
    </div>
  );
}
