import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // 获取管理员用户
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@agenthub.com' }
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin user not found" },
        { status: 404 }
      );
    }

    // 检查是否已存在
    const existing = await prisma.skill.findUnique({
      where: { slug: 'ai-image-generator' }
    });

    if (existing) {
      return NextResponse.json({
        message: "AI Image Generator skill already exists",
        skill: existing
      });
    }

    // 创建AI图片生成器Skill
    const skill = await prisma.skill.create({
      data: {
        name: 'AI图片生成器',
        slug: 'ai-image-generator',
        description: '使用OpenAI、Midjourney、Stable Diffusion等生成高质量图片，适用于内容创作、设计、营销等场景。',
        version: '1.0.0',
        category: 'image',
        tags: '#AI,#image,#generation,#design,#content',
        price: 900, // 9元
        isPublic: true,
        authorId: admin.id,
        downloads: 0,
        rating: 5.0,
        reviewCount: 0,
        installConfig: JSON.stringify({
          name: 'AI图片生成器',
          version: '1.0.0',
          description: '多模型支持、多种风格、批量生成',
          models: [
            {
              name: 'OpenAI DALL-E 3',
              description: '最高质量的文本到图像生成',
              features: ['高质量', '写实风格', '商业安全']
            },
            {
              name: 'Midjourney',
              description: '艺术风格独特的图像生成',
              features: ['艺术风格', '创意性强', '社区活跃']
            },
            {
              name: 'Stable Diffusion',
              description: '开源可定制的图像生成',
              features: ['开源免费', '高度定制', '本地部署']
            },
            {
              name: 'Leonardo.ai',
              description: '游戏资产和角色设计专用',
              features: ['游戏专用', '角色设计', '3D渲染']
            },
            {
              name: 'Adobe Firefly',
              description: '商业安全的设计专用AI',
              features: ['商业安全', '品牌一致', 'Adobe生态']
            }
          ],
          styles: [
            '写实风格',
            '插画风格',
            '艺术风格',
            '商业风格',
            '3D风格'
          ],
          scenarios: [
            {
              name: '社交媒体',
              description: '小红书封面、Instagram帖子、抖音封面',
              formats: ['1080x1080', '1080x1920', '720x1280与其他平台尺寸']
            },
            {
              name: '电商产品',
              description: '商品主图、详情页、白底图、场景图',
              formats: ['800x800', '1200x1200', '1920x1080']
            },
            {
              name: '营销素材',
              description: '海报、banner、广告图、落地页配图',
              formats: ['各种商业尺寸']
            },
            {
              name: '内容创作',
              description: '文章配图、视频封面、缩略图',
              formats: ['16:9', '4.3', '1:1']
            },
            {
              name: '品牌设计',
              description: 'Logo、VI应用、品牌手册',
              formats: ['矢量SVG', '多种尺寸']
            }
          ],
          features: {
            textToImage: '文本转图片',
            styleControl: '风格控制',
            batchGeneration: '批量生成',
            sizeAdjustment: '尺寸调整',
            partialRedraw: '局部重绘',
            styleTransfer: '风格迁移',
            upscale: '超分辨率'
          },
          outputFormats: ['JPG', 'PNG', 'WebP', 'SVG'],
          pricing: {
            freeTrial: {
              images: 10,
              features: ['基础模型', '标准质量', '1:1尺寸']
            },
            paid: {
              price: 9,
              currency: 'CNY',
              features: [
                '所有模型',
                '高清质量',
                '所有尺寸',
                '批量生成',
                '超分辨率',
                '无限制使用'
              ]
            }
          },
          examples: [
            '用DALL-E生成一张小红书风格的封面图，温馨暖色调，父亲和孩子对话场景',
            '生成一张产品展示图，简约白色背景，突出主体',
            '用Midjourney风格生成一张艺术插画，梦幻治愈系',
            '批量生成10张不同风格的社交媒体封面图',
            '生成一张3D渲染风格的产品广告图，科技感，蓝紫色调'
          ]
        })
      }
    });

    return NextResponse.json({
      message: "AI Image Generator skill created successfully",
      skill: {
        id: skill.id,
        name: skill.name,
        slug: skill.slug,
        category: skill.category,
        price: skill.price,
        authorId: skill.authorId,
        rating: skill.rating
      }
    });
  } catch (error: any) {
    console.error("Error creating AI Image Generator skill:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
