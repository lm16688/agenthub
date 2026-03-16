import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const isFree = searchParams.get("isFree");

    if (!query) {
      return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    // Build where clause
    const where: any = {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ],
    };

    if (category && category !== "all") {
      where.category = category;
    }

    if (isFree === "true") {
      where.isFree = true;
    } else if (isFree === "false") {
      where.isFree = false;
    }

    const agents = await prisma.agent.findMany({
      where,
      include: {
        versions: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("Error searching agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
