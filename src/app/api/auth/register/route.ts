import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";
import { z } from "zod";

// 验证 Schema
const registerSchema = z.object({
  name: z.string().min(2, "昵称至少2个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少6位字符").max(100, "密码最多100位字符"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证请求数据
    const validatedFields = registerSchema.safeParse(body);
    
    if (!validatedFields.success) {
      const firstError = validatedFields.error.errors[0];
      return NextResponse.json(
        { 
          message: firstError?.message || "输入数据无效",
          field: firstError?.path[0] 
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validatedFields.data;

    // 检查用户是否存在
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "该邮箱已被注册", field: "email" },
        { status: 409 }
      );
    }

    // Hash 密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: new Date(), // 自动验证邮箱
      },
    });

    return NextResponse.json(
      { 
        success: true,
        message: "注册成功！欢迎使用 AgentHub",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("注册错误:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "服务器错误，请稍后重试",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}
