import { PrismaClient } from '@prisma/client'

const DATABASE_URL = "postgresql://neondb_owner:npg_maP2KJzH3rce@ep-nameless-king-a1xui594-pooler.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require"

const prisma = new PrismaClient({
  datasources: {
    db: { url: DATABASE_URL }
  }
})

async function main() {
  console.log('🎬 创建视频生成Skill...')

  // 获取用户
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@agenthub.com' }
  })

  if (!admin) {
    console.error('❌ 管理员用户不存在')
    return
  }

  // 创建视频生成Skill
  const skill = await prisma.skill.upsert({
    where: { slug: 'ai-video-generator' },
    update: {
      name: 'AI视频生成器',
      description: '基于AI的智能视频生成工具，只需输入脚本或提示词即可生成专业视频。支持多种风格：短视频、宣传片、教程、广告等。',
      category: 'video',
      tags: '#video,#AI,#content,#creative,#automation',
      price: 900, // 9元
      downloads: 0,
      rating: 5.0,
      reviewCount: 0,
    },
    create: {
      name: 'AI视频生成器',
      slug: 'ai-video-generator',
      description: '基于AI的智能视频生成工具，只需输入脚本或提示词即可生成专业视频。支持多种风格：短视频、宣传片、教程、广告等。',
      version: '1.0.0',
      category: 'video',
      tags: '#video,#AI,#content,#creative,#automation',
      price: 900, // 9元
      isPublic: true,
      authorId: admin.id,
      installConfig: JSON.stringify({
        name: 'AI视频生成器',
        version: '1.0.0',
        supports: [
          '短视频生成',
          '宣传片制作',
          '教程视频',
          '广告视频',
          '社交媒体内容',
          '产品展示'
        ],
        features: {
          textToVideo: '文本转视频',
          scriptBased: '基于脚本生成',
          promptBased: '基于提示词生成',
          styleControl: '风格控制',
          download: '直接下载',
          multipleFormats: '多格式输出'
        },
        pricing: {
          freeTrial: {
            videos: 3,
            features: ['基础模板', '720p分辨率', '带水印']
          },
          paid: {
            price: 9,
            currency: 'CNY',
            features: ['所有模板', '1080p+分辨率', '无水印', '优先处理', '无限次数']
          }
        },
        integrations: [
          '抖音',
          '视频号',
          'B站',
          'YouTube',
          'Instagram',
          'TikTok'
        ],
        api: {
          type: 'rest',
          endpoint: '/api/skills/ai-video-generator/generate',
          methods: {
            generate: {
              description: '生成视频',
              parameters: {
                prompt: {
                  type: 'string',
                  description: '视频描述或脚本',
                  required: true
                },
                style: {
                  type: 'string',
                  description: '视频风格',
                  enum: ['minimal', 'professional', 'creative', 'cinematic', 'vibrant'],
                  default: 'professional'
                },
                duration: {
                  type: 'string',
                  description: '视频时长',
                  enum: ['15s', '30s', '60s', '120s', 'custom'],
                  default: '30s'
                },
                aspectRatio: {
                  type: 'string',
                  description: '宽高比',
                  enum: ['9:16', '1:1', '16:9', '4:3'],
                  default: '9:16'
                },
                platform: {
                  type: 'string',
                  description: '目标平台',
                  enum: ['douyin', 'tiktok', 'instagram', 'youtube', 'bilibili', 'general'],
                  default: 'general'
                }
              }
            }
          }
        }
      }),
    },
  })

  console.log('✅ 创建Skill:', skill.name)
  console.log('💰 价格:', skill.price ? `¥${skill.price / 100}` : '免费')
  console.log('📦 类别:', skill.category)
  console.log('🏷️ 标签:', skill.tags)
  console.log('🎉 功能描述:')
  console.log('   - 基于脚本生成视频')
  console.log('   - 基于提示词生成视频')
  console.log('   - 支持多种视频风格')
  console.log('   - 支持多平台适配')
  console.log('   - 直接下载成品视频')
  console.log('')
  console.log('💡 使用示例:')
  console.log('   1. 输入脚本："制作一个30秒的产品展示视频，展示我们的AI Agent Hub平台，风格要现代科技感"')
  console.log('   2. 选择风格：专业')
  console.log('   3. 选择时长：30秒')
  console.log('   4. 选择平台：抖音')
  console.log('   5. 生成并下载')
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
