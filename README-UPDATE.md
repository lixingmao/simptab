# SimpTab 插件更新标准流程

## 快速使用

### 方法一：自动化流程 (推荐)
```bash
npm run update-auto
```

### 方法二：标准流程
```bash
npm run update
```

### 方法三：手动执行
```bash
./update-plugin.sh
```

## 流程说明

### 标准流程包含以下步骤：

1. **编译发布插件** 📦
   - 执行 `npm run publish`
   - 生成 `dest-extension/` 目录
   - 验证编译结果

2. **重新加载插件** 🔄
   - 打开 `chrome://extensions/`
   - 找到 "简 Tab (SimpTab) - 新标签页" 插件
   - 点击 "重新加载" 按钮

3. **测试插件功能** 🧪
   - 打开新标签页 `Ctrl+T` (或 `Cmd+T`)
   - 验证 SimpTab 界面正常显示
   - 测试各项功能

4. **完成更新** 🎉
   - 确认所有功能正常
   - 更新流程完成

## 自动化选项

### 使用 Claude Code 浏览器自动化

如果您使用 Claude Code，可以通过以下方式实现完全自动化：

1. 编译插件：
   ```bash
   npm run publish
   ```

2. 使用 Claude Code 执行浏览器操作：
   ```javascript
   // 打开插件管理页面
   mcp__playwright__browser_navigate("chrome://extensions/")
   
   // 点击重新加载按钮
   mcp__playwright__browser_click("重新加载按钮", "button_ref")
   
   // 打开新标签页测试
   mcp__playwright__browser_tab_new("chrome://newtab/")
   ```

## 文件说明

- `update-plugin.sh` - Bash 脚本版本，包含交互式提示
- `update-plugin-auto.js` - Node.js 版本，更友好的输出格式
- `package.json` - 新增了 `update` 和 `update-auto` 命令

## 故障排除

如果插件更新后出现问题：

1. 检查 Chrome 开发者工具控制台错误
2. 访问 `chrome://extensions/` 查看插件状态
3. 确认 `dest-extension/` 目录包含完整文件
4. 重新运行 `npm run publish` 重新编译

## 注意事项

- 确保 Chrome 浏览器已开启开发者模式
- 插件必须已经加载到 Chrome 扩展程序中
- 编译前请确保所有代码更改已保存

Happy coding! 🚀