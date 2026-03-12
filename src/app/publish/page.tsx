"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function PublishAgentPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    tags: "",
    prompt: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 提交到API
    console.log("Publish agent:", formData);
  };

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">发布你的Agent</h1>
        <p className="text-muted-foreground">
          分享你的AI Agent，让更多人发现和使用
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>
            填写Agent的基本信息，让它更容易被发现
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Agent名称 *
              </label>
              <Input
                id="name"
                placeholder="例如：Meme Coin Analyzer"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required={true}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                URL标识符 *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">agenthub.ai/</span>
                <Input
                  id="slug"
                  placeholder="meme-coin-analyzer"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                只能包含字母、数字和连字符
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                分类 *
              </label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">选择分类</option>
                <option value="content">内容创作</option>
                <option value="dev">开发工具</option>
                <option value="data">数据分析</option>
                <option value="crypto">加密货币</option>
                <option value="nlp">自然语言处理</option>
                <option value="cv">计算机视觉</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                描述 *
              </label>
              <textarea
                id="description"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="详细描述你的Agent的功能和用途"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                最多500字符
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                标签
              </label>
              <Input
                id="tags"
                placeholder="crypto, meme, analysis"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                用逗号分隔，最多5个标签
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="prompt" className="text-sm font-medium">
                  Prompt *
                </label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" type="button">
                      查看示例
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Prompt示例</DialogTitle>
                      <DialogDescription>
                        这是一个优秀的Prompt示例：
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 p-4 bg-muted rounded text-sm">
                      <pre className="whitespace-pre-wrap">
{`分析任务：[具体任务]

步骤1：[第一步]
- 要点1
- 要点2

步骤2：[第二步]
- 要点1
- 要点2

输出要求：
- 格式：[指定格式]
- 内容：[具体要求]`}
                      </pre>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <textarea
                id="prompt"
                className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                placeholder="输入你的Agent Prompt..."
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, prompt: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                清晰的Prompt能让Agent更好地理解你的需求
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                发布Agent
              </Button>
              <Button type="button" variant="outline">
                保存草稿
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
