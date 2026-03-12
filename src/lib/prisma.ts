import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 生产环境使用文件数据库（SQLite），避免需要外部数据库
export const db = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL ?? "file:./dev.db",
    },
  },
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
