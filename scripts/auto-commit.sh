#!/bin/bash

# 自动提交并推送到 GitHub
# 用法: ./scripts/auto-commit.sh "提交信息"

COMMIT_MSG=${1:-"auto commit: update project"}

cd /root/.openclaw/workspace/agenthub

echo "📝 开始提交代码..."
echo "提交信息: $COMMIT_MSG"

# 添加所有更改
git add -A

# 检查是否有更改
if git diff --cached --quiet; then
    echo "✅ 没有更改需要提交"
    exit 0
fi

# 提交
git commit -m "$COMMIT_MSG"

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push origin main

echo "✅ 完成！代码已同步到 GitHub"
