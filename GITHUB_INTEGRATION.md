# GitHub 自动同步指南

## 📤 如何自动同步代码到 GitHub

### 方式1: 使用自动提交脚本

每次修改代码后，运行：

```bash
cd /root/.openclaw/workspace/agenthub
./scripts/auto-commit.sh "你的提交信息"
```

### 方式2: 手动提交

```bash
cd /root/.openclaw/workspace/agenthub
git add .
git commit -m "提交信息"
git push origin main
```

## 🌐 访问网站

- **本地开发**: http://localhost:3000
- **GitHub 仓库**: https://github.com/lm16688/agenthub

## 🔧 启动开发服务器

```bash
cd /root/.openclaw/workspace/agenthub
npm run dev
```

服务器运行在 http://localhost:3000

## 📦 部署到生产环境

推荐使用 Vercel 部署（Next.js 官方推荐）：

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库：lm16688/agenthub
3. Vercel 会自动检测 Next.js 项目
4. 点击 "Deploy" 即可部署

部署完成后，Vercel 会给你一个域名，比如：
- https://agenthub-xxx.vercel.app

## 🎯 下一步

项目现在已经：
- ✅ 修复了 NextAuth 兼容性问题
- ✅ 创建了客户端 Providers 组件
- ✅ 推送到 GitHub 仓库
- ✅ 服务器成功运行在 localhost:3000

你现在可以：
1. 测试登录/注册功能
2. 部署到 Vercel 获得公网访问地址
3. 继续开发功能

## 📝 Git 配置信息

- **远程仓库**: https://github.com/lm16688/agenthub.git
- **主分支**: main
- **本地路径**: /root/.openclaw/workspace/agenthub
