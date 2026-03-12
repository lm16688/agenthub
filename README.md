# 🤖 AgentHub - AI Agent社交平台

**Agent的社区，开发者的家园**

---

## 🎯 项目简介

AgentHub是一个专门为AI Agent开发者和用户打造的社交平台。在这里，你可以：

- 🚀 **发布和分享**你的AI Agent
- 🔍 **发现和使用**优质的Agent和技能
- 👥 **交流和学习**，与全球开发者建立连接
- 💰 **变现和成长**，通过Agent和技能获得收入

---

## 🛠️ 技术栈

### 前端
- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - UI组件库

### 后端
- **Next.js API Routes** - 全栈API
- **Prisma ORM** - 数据库ORM
- **NextAuth.js** - 认证系统

### 数据库
- **PostgreSQL** - 主数据库

### 部署
- **Vercel** - 前端托管
- **Supabase** - PostgreSQL托管

---

## 📁 项目结构

```
agenthub/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # 首页
│   │   ├── layout.tsx    # 全局布局
│   │   └── globals.css   # 全局样式
│   ├── components/       # React组件
│   │   └── ui/          # UI组件库
│   └── lib/             # 工具函数
│       ├── prisma.ts    # Prisma客户端
│       ├── auth.ts      # 认证配置
│       └── utils.ts     # 工具函数
├── prisma/
│   ├── schema.prisma    # 数据库Schema
│   └── prisma.config.ts # Prisma配置
└── public/              # 静态资源
```

---

## 🚀 快速开始

### 前置要求

- Node.js 18+
- PostgreSQL数据库

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd agenthub
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**

复制`.env.example`到`.env`：
```bash
cp .env.example .env
```

编辑`.env`文件，配置以下变量：
```env
DATABASE_URL="postgresql://user:password@localhost:5432/agenthub"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. **初始化数据库**
```bash
npm run db:push
```

5. **生成Prisma客户端**
```bash
npm run db:generate
```

6. **启动开发服务器**
```bash
npm run dev
```

访问 http://localhost:3000

---

## 📊 数据库Schema

### 核心模型

- **User** - 用户表
- **Agent** - Agent表
- **Skill** - 技能表
- **Review** - 评价表
- **Like** - 点赞表
- **Bookmark** - 收藏表
- **Account/Session/VerificationToken** - NextAuth相关表

详见 [prisma/schema.pris.prisma](./prisma/schema.prisma)

---

## 🎨 功能规划

### MVP (第1个月)
- [x] 项目搭建
- [x] 数据库设计
- [x] 基础UI组件
- [ ] 用户认证系统
- [ ] Agent发布和展示
- [ ] 技能市场
- [ ] 搜索和筛选

### V2.0 (第2-3个月)
- [ ] Agent-to-Agent通信
- [ ] 付费Agent商店
- [ ] 开发者仪表盘
- [ ] 评论和评价系统
- [ ] Pro会员功能

### V3.0 (第4-6个月)
- [ ] 移动端App
- [ ] API开放平台
- [ ] 企业版功能
- [ ] 多语言支持

---

## 💰 商业模式

1. **订阅制**' - Pro会员 ¥99/月
2. **交易抽成** - 技能15%，Agent20%
3. **广告收入**
4. **企业服务**
5. **数据服务**

---

## 🤝 贡献指南

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📄 许可证

MIT License

---

## 📧 联系我们

- Email: support@agenthub.dev.com
- 官网: https://agenthub.dev.com

---

**🚀 让我们一起构建AI Agent的未来！**
