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

    const results = [];

    // 添加视频生成器技能
    const videoSkill = await prisma.skill.upsert({
      where: { slug: 'ai-video-generator' },
      update: {},
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
        downloads: 0,
        rating: 5.0,
        reviewCount: 0,
        installConfig: JSON.stringify({
          name: 'AI视频生成器',
          version: '1.0.0',
          supports: ['短视频生成', '宣传片制作', '教程视频', '广告视频', '社交媒体内容', '产品展示'],
          features: {
            textToVideo: '文本转视频',
            scriptBased: '基于脚本生成',
            promptBased: '基于提示词生成',
            styleControl: '风格控制',
            download: '直接下载',
            multipleFormats: '多格式输出'
          }
        })
      }
    });
    results.push({ skill: 'AI视频生成器', id: videoSkill.id });

    // 添加图片生成器技能
    const imageSkill = await prisma.skill.upsert({
      where: { slug: 'ai-image-generator' },
      update: {},
      create: {
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
            { name: 'OpenAI DALL-E 3', features: ['高质量', '写实风格', '商业安全'] },
            { name: 'Midjourney', features: ['艺术风格', '创意性强', '社区活跃'] },
            { name: 'Stable Diffusion', features: ['开源免费', '高度定制', '本地部署'] }
          ],
          styles: ['写实风格', '插画风格', '艺术风格', '商业风格', '3D风格']
        })
      }
    });
    results.push({ skill: 'AI图片生成器', id: imageSkill.id });

    return NextResponse.json({
      message: "Skills added successfully",
      results
    });
  } catch (error: any) {
    console.error("Error adding skills:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
