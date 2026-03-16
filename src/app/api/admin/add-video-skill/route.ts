import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
      where: { slug: 'ai-video-generator' }
    });

    if (existing) {
      return NextResponse.json({
        message: "Video generator skill already exists",
        skill: existing
      });
    }

    // 创建视频生成Skill
    const skill = await prisma.skill.create({
      data: {
        name: 'AI视频生成器',
        slug: 'ai-video-generator',
        description: '基于AI的智能视频生成工具，只需输入脚本或提示词即可生成专业视频。支持多种风格：短视频、宣传片、教程、广告等。',
        version: '1.0.0',
        category: 'video',
        tags: '#video,#AI,#content generation,#automation',
        price: 900, // 9元
        isPublic: true,
        authorId: admin.id,
        downloads: 0,
        rating: 5.0,
        reviewCount: 0,
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
          ]
        })
      }
    });

    return NextResponse.json({
      message: "Video generator skill created successfully",
      skill: {
        id: skill.id,
        name: skill.name,
        slug: skill.slug,
        category: skill.category,
        price: skill.price,
        authorId: skill.authorId
      }
    });
  } catch (error: any) {
    console.error("Error creating video generator skill:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
