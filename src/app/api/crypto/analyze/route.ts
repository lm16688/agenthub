import { NextResponse } from 'next/server';

// 模拟的 pump.fun 数据（基于之前获取到的数据）
const MOCK_COINS = [
  {
    name: "NotInEmploymentEducationTraining",
    symbol: "NEET",
    market_cap: 24120000,
    growth: 0.0,
    description: "You Will Be Unemployed and You Will Be Happy",
    narrative: "NEET文化 - 拒绝就业压力的生活态度",
    category: "文化叙事"
  },
  {
    name: "DRONE",
    symbol: "DRONE",
    market_cap: 24500000,
    growth: 0.56,
    description: "memecoin",
    narrative: "无人机科技主题",
    category: "科技"
  },
  {
    name: "PvP",
    symbol: "PVP",
    market_cap: 41000000,
    growth: 0.92,
    description: "The PvP of social media",
    narrative: "社交媒体竞争对抗",
    category: "社交媒体"
  },
  {
    name: "PsyopAnime",
    symbol: "PSYOP",
    market_cap: 6180000,
    growth: 0.0,
    description: "PsyopAnime",
    narrative: "动漫文化 + Psyop工作室",
    category: "流行文化"
  },
  {
    name: "XAICASH",
    symbol: "XAIC",
    market_cap: 182600,
    growth: 31.73,
    description: "AI + 支付 + 加密货币的交汇点",
    narrative: "AI基础设施叙事 - xAI和AI支付",
    category: "AI",
    potential: "高"
  },
  {
    name: "PVE",
    symbol: "PVE",
    market_cap: 13200,
    growth: 378.40,
    description: "Deployed using rapidlaunch.io",
    narrative: "游戏玩家 vs 环境",
    category: "游戏",
    potential: "极高"
  },
  {
    name: "THE BAGWORKOOR",
    symbol: "BAGWORKOOR",
    market_cap: 401100,
    growth: 2.97,
    description: "Deployed using j7tracker.io",
    narrative: "韭菜文化 - 解放被套牢的人",
    category: "社区文化"
  },
  {
    name: "How It Feels",
    symbol: "FEELS",
    market_cap: 166700,
    growth: 7.61,
    description: "Created on rapidlaunch.io",
    narrative: "情感共鸣 - '感受'类meme",
    category: "情感"
  },
  {
    name: "Trump House",
    symbol: "TRUMPHOUSE",
    market_cap: 161400,
    growth: 10.06,
    description: "美国爱国主义的象征",
    narrative: "政治人物 - 特朗普相关",
    category: "政治"
  },
  {
    name: "Crawstar (Crawfish by Claude AI)",
    symbol: "CRAWSTAR",
    market_cap: 12700,
    growth: 11.60,
    description: "AI完全自动化照顾龙虾",
    narrative: "AI Agent应用 - Claude AI + 物联网",
    category: "AI Agent",
    potential: "高"
  }
];

function analyzeCoins(coins: any[]) {
  return coins.map(coin => {
    let score = 0;
    const reasons: string[] = [];

    // 增长率评分 (0-30分)
    const growth = coin.growth || 0;
    if (growth > 100) {
      score += 30;
      reasons.push("超高增长率");
    } else if (growth > 50) {
      score += 25;
      reasons.push("高增长率");
    } else if (growth > 10) {
      score += 20;
      reasons.push("良好增长");
    } else if (growth > 5) {
      score += 15;
      reasons.push("增长中");
    }

    // 市值评分 (0-25分)
    const mc = coin.market_cap || 0;
    if (mc >= 50000 && mc <= 500000) {
      score += 25;
      reasons.push("黄金市值区间(5万-50万)");
    } else if (mc >= 1000000 && mc <= 5000000) {
      score += 20;
      reasons.push("健康市值(100万-500万)");
    } else if (mc < 50000) {
      score += 15;
      reasons.push("早期阶段");
    } else if (mc > 5000000) {
      score += 10;
      reasons.push("大盘币");
    }

    // 叙事强度评分 (0-30分)
    const narrative = (coin.narrative || "").toLowerCase();
    if (["ai", "人工智能", "claude", "gpt"].some(k => narrative.includes(k))) {
      score += 30;
      reasons.push("AI叙事");
    } else if (["trump", "政治", "选举"].some(k => narrative.includes(k))) {
      score += 25;
      reasons.push("政治叙事");
    } else if (["游戏", "gaming", "player"].some(k => narrative.includes(k))) {
      score += 20;
      reasons.push("游戏叙事");
    } else if (["文化", "community", "social"].some(k => narrative.includes(k))) {
      score += 15;
      reasons.push("社区文化");
    }

    // 手动标记评分 (0-25分)
    if (coin.potential === "极高") {
      score += 25;
      reasons.push("极高潜力标记");
    } else if (coin.potential === "高") {
      score += 20;
      reasons.push("高潜力标记");
    }

    // 综合评级
    let rating = "";
    if (score >= 80) {
      rating = "🟢 重点跟踪";
    } else if (score >= 60) {
      rating = "🟡 值得关注";
    } else if (score >= 40) {
      rating = "🟡 中等关注";
    } else {
      rating = "🔴 观望";
    }

    return {
      ...coin,
      score,
      rating,
      reasons: Array.from(new Set(reasons))
    };
  }).sort((a, b) => b.score - a.score);
}

export async function GET() {
  try {
    // 分析代币
    const analyzed = analyzeCoins(MOCK_COINS);

    // 返回结果
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      coins: analyzed,
      top5: analyzed.slice(0, 5),
      total: analyzed.length
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "分析失败",
        message: error instanceof Error ? error.message : "未知错误"
      },
      { status: 500 }
    );
  }
}
