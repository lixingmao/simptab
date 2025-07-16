#!/bin/bash

# SimpTab 插件更新标准流程
# 作者: Claude Code
# 用途: 自动化插件编译、重新加载和测试流程

set -e  # 遇到错误时退出

echo "🚀 开始 SimpTab 插件更新流程..."

# 1. 编译发布插件
echo "📦 步骤 1/4: 编译发布插件..."
npm run publish

if [ $? -eq 0 ]; then
    echo "✅ 插件编译成功"
else
    echo "❌ 插件编译失败"
    exit 1
fi

# 2. 检查编译结果
if [ -d "dest-extension" ]; then
    echo "✅ 编译输出目录存在: dest-extension/"
else
    echo "❌ 编译输出目录不存在"
    exit 1
fi

# 3. 提示用户手动操作
echo ""
echo "🔄 步骤 2/4: 请手动执行以下操作："
echo "  1. 打开 Chrome 浏览器"
echo "  2. 访问 chrome://extensions/"
echo "  3. 找到 '简 Tab (SimpTab) - 新标签页' 插件"
echo "  4. 点击 '重新加载' 按钮"
echo ""

# 4. 等待用户确认
read -p "⏳ 请完成上述操作后按回车键继续..."

# 5. 提示测试
echo ""
echo "🧪 步骤 3/4: 测试插件功能"
echo "  1. 按 Ctrl+T (或 Cmd+T) 打开新标签页"
echo "  2. 确认 SimpTab 界面正常显示"
echo "  3. 测试各项功能是否正常工作"
echo ""

read -p "⏳ 请完成测试后按回车键继续..."

# 6. 完成
echo ""
echo "🎉 步骤 4/4: 插件更新流程完成！"
echo ""
echo "📋 更新摘要:"
echo "  ✅ 编译发布: 成功"
echo "  ✅ 插件重载: 已提示完成"
echo "  ✅ 功能测试: 已提示完成"
echo "  ✅ 输出目录: dest-extension/"
echo ""
echo "🔍 如需调试，请检查:"
echo "  - Chrome 开发者工具控制台"
echo "  - chrome://extensions/ 页面错误信息"
echo ""
echo "Happy coding! 🚀"