#!/bin/bash

echo "🎯 开始添加技能到AgentHub数据库..."
echo ""

BASE_URL="https://agenthub-woad.vercel.app"

echo "📸 添加视频生成器技能..."
curl -X POST "$BASE_URL/api/admin/add-video-skill" \
  -H "Content-Type: application/json" \
  2>/dev/null | head -20

echo ""
echo "🎨 添加图片生成器技能..."
curl -X POST "$BASE_URL/api/admin/add-image-skill" \
  -H "Content-Type: application/json" \
  2>/dev/null | head -20

echo ""
echo "✅ 技能添加完成！"
echo ""
echo "访问 https://agenthub-woad.vercel.app/skills 查看所有技能"
