import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { db } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // 邮箱密码登录
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("邮箱和密码必填")
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) {
          throw new Error("用户不存在或密码错误")
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) {
          throw new Error("密码错误")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar
        }
      }
    }),

    // Google登录（可选）
    ...(process.env.NEXTAUTH_GOOGLE_ID && process.env.NEXTAUTH_GOOGLE_SECRET
      ? [GoogleProvider({
          clientId: process.env.NEXTAUTH_GOOGLE_ID,
          clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
        })]
      : []
    ),

    // GitHub登录（可选）
    ...(process.env.NEXTAUTH_GITHUB_ID && process.env.NEXTAUTH_GITHUB_SECRET
      ? [GithubProvider({
          clientId: process.env.NEXTAUTH_GITHUB_ID,
          clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
        })]
      : []
    ),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt"
  }
}
