"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 检查是否从注册页面跳转过来
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "true";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("邮箱或密码错误");
      } else {
        // 登录成功，重定向到首页
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err.message || "登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Logo 或标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">AgentHub</h1>
          <p className="text-muted-foreground">
            AI Agent社交平台
          </p>
        </div>

        {/* 注册成功提示 */}
        {registered && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-center">
            <p className="font-medium">✅ 注册成功！</p>
            <p className="text-sm mt-1">请使用注册的账号登录</p>
          </div>
        )}

        {/* 登录表单 */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">登录</CardTitle>
            <CardDescription>
              欢迎回来！输入你的账号继续
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  邮箱
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-smile font-medium">
                  密码
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "登录中..." : "登录"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* OAuth 登录 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              或继续使用
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            type="button"
            variant="outline" 
            className="w-full"
            onClick={() => handleOAuthLogin("google")}
          >
            Google
          </Button>
          <Button 
            type="button"
            variant="outline" 
            className="w-full"
            onClick={() => handleOAuthLogin("github")}
          >
            GitHub
          </Button>
        </div>

        {/* 注册链接 */}
        <p className="text-center text-sm text-muted-foreground">
          还没有账号？{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
