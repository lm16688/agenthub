"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<{
    message: string;
    field?: string;
  } | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // 清除错误
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({
          message: data.message || "注册失败",
          field: data.field,
        });
      } else {
        // 注册成功，重定向到登录页
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?registered=true");
        }, 1500);
      }
    } catch (err: any) {
      setError({
        message: "网络错误，请检查连接后重试",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 9l-4-4m-6 6l-6-6" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-900">注册成功！</h3>
                <p className="text-muted-foreground mt-2">
                  欢迎加入 AgentHub，{formData.name || "开发者"}
                </p>
              </div>
              <div className="w-full space-y-3">
                <p className="text-sm text-muted-foreground">
                  我们已经向你的邮箱 <strong>{formData.email}</strong> 发送了验证邮件
                </p>
                <p className="text-sm text-muted-foreground">
                  请查收邮箱并点击验证链接
                </p>
              </div>
              <Button 
                onClick={()={router.push("/login")}
                className="w-full mt-6"
              >
                前往登录
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Logo 或标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">创建账号</h1>
          <p className="text-muted-foreground">
            加入 AgentHub，开始你的 AI Agent 之旅
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>注册信息</CardTitle>
            <CardDescription>
              请填写以下信息创建你的账号
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 姓名 */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  昵称 *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="你的昵称"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={error?.field === "name" ? "border-red-500" : ""}
                />
              </div>

              {/* 邮箱 */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  邮箱 *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={error?.field === "email" ? "border-red-500" : ""}
                />
                <p className="text-xs text-muted-foreground">
                  我们不会公开你的邮箱地址
                </p>
              </div>

              {/* 密码 */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  密码 *
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="至少6位字符"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  disabled={loading}
                  className={error?.field === "password" ? "border-red-500" : ""}
                />
                <p className="text-xs text-muted-foreground">
                  密码至少6位字符
                </p>
              </div>

              {/* 错误提示 */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                  {error.message}
                </div>
              )}

              {/* 提交按钮 */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <span className="mr-2">注册中...</span>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                  </>
                ) : (
                  "创建账号"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 登录链接 */}
        <p className="text-center text-sm text-muted-foreground">
          已有账号？{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            前往登录
          </Link>
        </p>
      </div>
    </div>
  );
}
