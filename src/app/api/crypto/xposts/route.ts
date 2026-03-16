import { NextResponse } from 'next/server';

// X平台热门帖子数据（基于代币）
const MOCK_X_POSTS = {
  "XAICASH": [
    {
      author: "CryptoAlpha",
      username: "@cryptotrends",
      followers: 125000,
      content: "XAICASH represents the speculative intersection of AI, payments, and crypto culture. The xAI narrative is heating up 🔥",
      metrics: {
        likes: 2456,
        retweets: 892,
        replies: 234,
        timestamp: "2 hours ago"
      },
      verified: true
    },
    {
      author: "AICryptoNews",
      username: "@ai_crypto_news",
      followers: 89000,
      content: "AI-powered financial infrastructure is the next frontier. XAICASH is building on Solana what xAI aims to do for the world",
      metrics: {
        likes: 1876,
        retweets: 645,
        replies: 189,
        timestamp: "4 hours ago"
      },
      verified: true
    },
    {
      author: "SolanaDaily",
      username: "@solana_daily",
      followers: 234000,
      content: "New AI project launching on Solana: XAICASH. Combining AI agents with crypto payments 💰🤖",
      metrics: {
        likes: 3421,
        retweets: 1234,
        replies: 456,
        timestamp: "6 hours ago"
      },
      verified: true
    }
  ],
  "PVE": [
    {
      author: "GamingCrypto",
      username: "@gaming_crypto",
      followers: 67000,
      content: "PvE token is absolutely insane right now! 378% growth in 24h 🚀 Gaming meets environmental activism",
      metrics: {
        likes: 1234,
        retweets: 456,
        replies: 123,
        timestamp: "1 hour ago"
      },
      verified: false
    },
    {
      author: "MemeKing",
      username: "@meme_king",
      followers: 156000,
      content: "Player vs Environment token trending hard. The PvP narrative is real",
      metrics: {
        likes: 876,
        retweets: 345,
        replies: 98,
        timestamp: "3 hours ago"
      },
      verified: true
    }
  ],
  "CRAWSTAR": [
    {
      author: "ClaudeAI",
      username: "@anthropic",
      followers: 245000,
      content: "Excited to see Claude AI being used in real-world applications! The crawfish project on pump.fun is a great example 🦞",
      metrics: {
        likes: 5678,
        retweets: 2134,
        replies: 567,
        timestamp: "2 hours ago"
      },
      verified: true
    },
    {
      author: "AIAgentsDaily",
      username: "@ai_agents_daily",
      followers: 89000,
      content: "Crawstar: First AI agent to fully automate care for a living creature. Powered by Claude AI. Revolutionary! 🦞🤖",
      metrics: {
        likes: 2345,
        retweets: 876,
        replies: 234,
        timestamp: "5 hours ago"
      },
      verified: false
    }
  ],
  "TRUMPHOUSE": [
    {
      author: "PoliticalCrypto",
      username: "@pol_crypto",
      followers: 145000,
      content: "Trump House token gaining traction. Political narratives always have strong community support 🇺🇸",
      metrics: {
        likes: 1876,
        retweets: 654,
        replies: 234,
        timestamp: "3 hours ago"
      },
      verified: false
    },
    {
      author: "MemePolitical",
      username: "@meme_political",
      followers: 89000,
      content: "Love the creativity behind Trump House. A farmhouse painted in American flag colors - what a meme! 🏠",
      metrics: {
        likes: 1234,
        retweets: 456,
        replies: 123,
        timestamp: "6 hours ago"
      },
      verified: false
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json({
        success: false,
        error: "Missing symbol parameter"
      }, { status: 400 });
    }

    const posts = MOCK_X_POSTS[symbol.toUpperCase()] || [];
    
    return NextResponse.json({
      success: true,
      symbol,
      posts,
      count: posts.length
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch X posts",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
