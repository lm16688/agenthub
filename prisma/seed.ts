import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始填充种子数据...')

  // 创建管理员用户
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@agenthub.com' },
    update: {},
    create: {
      email: 'admin@agenthub.com',
      name: '管理员',
      password: hashedPassword,
      role: 'admin',
      isPro: true,
      bio: 'AgentHub平台管理员',
    },
  })
  console.log('✅ 创建管理员:', admin.email)

  // 创建测试用户
  const userPassword = await bcrypt.hash('user123', 10)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@test.com' },
    update: {},
    create: {
      email: 'user1@test.com',
      name: '张三',
      password: userPassword,
      bio: 'AI开发者爱好者',
      location: '北京',
    },
  })
  console.log('✅ 创建用户:', user1.email)

  const user2 = await prisma.user.upsert({
    where: { email: 'user2.1@test.com' },
    update: {},
    create: {
      email: 'user2.1@test.com',
      name: '李四',
      password: userPassword,
      bio: '全栈工程师',
      location: '上海',
    },
  })
  console.log('✅ 创建用户:', user2.email)

  // 创建示例Agents
  const agents = [
    {
      name: 'Meme Coin Analyzer',
      slug: 'meme-coin-analyzer',
      description: '智能分析pump.fun上的Meme币，基于社区活跃度和叙事强度筛选高潜力代币',
      prompt: '你是一个专业的Meme币分析专家...',
      category: 'crypto',
      tags: '#crypto,#meme,#analysis',
      authorId: user1.id,
      isFeatured: true,
    },
    {
      name: 'Content Writer',
      slug: 'content-writer',
      description: 'AI内容写作助手，支持多种风格和格式，帮助你快速创建高质量内容',
      prompt: '你是一个专业的内容写手...',
      category: 'content',
      tags: '#writing,#content,#AI',
      authorId: user2.id,
      isFeatured: true,
    },
    {
      name: 'Code Reviewer',
      slug: 'code-reviewer',
      description: '智能代码审查专家，分析代码质量，提供优化建议',
      prompt: '你是一个资深的代码审查专家...',
      category: 'dev',
      tags: '#code,#review,#development',
      authorId: user1.id,
    },
    {
      name: 'SEO Optimizer',
      slug: 'seo-optimizer',
      description: 'SEO优化专家，关键词研究和内容优化建议',
      prompt: '你是一个SEO优化专家...',
      category: 'marketing',
      tags: '#SEO,#marketing,#content',
      authorId: user2.id,
    },
    {
      name: 'Data Analyst',
      slug: 'data-analyst',
      description: '数据分析师，自动化数据清洗、分析和可视化',
      prompt: '你是一个专业的数据分析师...',
      category: 'data',
      tags: '#data,#analysis,#visualization',
      authorId: admin.id,
    },
  ]

  for (const agentData of agents) {
    const agent = await prisma.agent.upsert({
      where: { slug: agentData.slug },
      update: {},
      create: {
        ...agentData,
        views: Math.floor(Math.random() * 3000),
        likes: Math.floor(Math.random() * 300),
        installs: Math.floor(Math.random() * 200),
      },
    })
    console.log('✅ 创建Agent:', agent.name)
  }

  // 创建示例Skills（定价9元）
  const NINE_YUAN = 900 // 9元

  const skills = [
    {
      name: 'Web Scraper',
      slug: 'web-scraper',
      description: '强大的网页抓取工具，支持CSS选择器和XPath，自动解析和提取数据',
      category: 'dev',
      tags: '#web,#scraper,#data',
      price: null, // 免费
      authorId: admin.id,
    },
    {
      name: 'Sentiment Analysis',
      slug: 'sentiment-analysis',
      description: '情感分析工具，识别文本中的情感倾向，支持中英文',
      category: 'nlp',
      tags: '#nlp,#sentiment,#AI',
      price: NINE_YUAN, // 9元
      authorId: user1.id,
    },
    {
      name: 'Text Summarizer',
      slug: 'text-summarizer',
      description: '智能文本摘要，快速提取文章核心内容，支持多种摘要模式',
      category: 'nlp',
      tags: '#nlp,#summarize,#text',
      price: null, // 免费
      authorId: user2.id,
    },
    {
      name: 'Keyword Extractor',
      slug: 'keyword-extractor',
      description: '关键词提取工具，自动识别文本中的关键短语，支持TF-IDF算法',
      category: 'nlp',
      tags: '#nlp,#keyword,#data',
      price: NINE_YUAN, // 9元
      authorId: admin.id,
    },
    {
      name: 'Image Classifier',
      slug: 'image-classifier',
      description: '图像分类工具，支持多种预训练模型，快速识别图片内容',
      category: 'cv',
      tags: '#cv,#image,#classify',
      price: NINE_YUAN, // 9元
      authorId: user1.id,
    },
  ]

  for (const skillData of skills) {
    const skill = await prisma.skill.upsert({
      where: { slug: skillData.slug },
      update: {},
      create: {
        ...skillData,
        downloads: Math.floor(Math.random() * 3000),
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 100),
      },
    })
    console.log('✅ 创建Skill:', skill.name, skill.price ? `¥${skill.price / 100}` : '免费')
  }

  console.log('🎉 种子数据填充完成！')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
