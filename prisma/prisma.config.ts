import { defineConfig } from '@prisma/client'

export default defineConfig({
  schema: './prisma/schema.prisma',
  adapter: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
})
