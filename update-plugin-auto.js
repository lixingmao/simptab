#!/usr/bin/env node

/**
 * SimpTab 插件自动更新流程 (Node.js 版本)
 * 集成了 Playwright 自动化浏览器操作
 * 用途: 完全自动化的插件编译、重新加载和测试流程
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出函数
const colors = {
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

function log(emoji, message, color = 'cyan') {
    console.log(`${emoji} ${colors[color](message)}`);
}

function error(message) {
    log('❌', message, 'red');
}

function success(message) {
    log('✅', message, 'green');
}

function info(message) {
    log('ℹ️', message, 'blue');
}

function warning(message) {
    log('⚠️', message, 'yellow');
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    try {
        log('🚀', '开始 SimpTab 插件自动更新流程...', 'cyan');
        
        // 步骤 1: 编译发布插件
        log('📦', '步骤 1/4: 编译发布插件...', 'cyan');
        
        try {
            execSync('npm run publish', { stdio: 'inherit' });
            success('插件编译成功');
        } catch (err) {
            error('插件编译失败');
            process.exit(1);
        }
        
        // 步骤 2: 检查编译结果
        const destDir = path.join(__dirname, 'dest-extension');
        if (fs.existsSync(destDir)) {
            success('编译输出目录存在: dest-extension/');
        } else {
            error('编译输出目录不存在');
            process.exit(1);
        }
        
        // 步骤 3: 提示用户使用 Claude Code 的浏览器自动化功能
        log('🔄', '步骤 2/4: 浏览器自动化操作...', 'cyan');
        info('建议使用 Claude Code 的浏览器自动化功能:');
        console.log(`
${colors.yellow('以下是可以在 Claude Code 中执行的命令:')}

1. 打开插件管理页面:
   mcp__playwright__browser_navigate chrome://extensions/

2. 点击重新加载按钮:
   mcp__playwright__browser_click (找到 SimpTab 插件的重新加载按钮)

3. 打开新标签页测试:
   mcp__playwright__browser_tab_new chrome://newtab/

${colors.blue('或者手动执行以下操作:')}
1. 打开 Chrome 浏览器
2. 访问 chrome://extensions/
3. 找到 '简 Tab (SimpTab) - 新标签页' 插件
4. 点击 '重新加载' 按钮
5. 按 Ctrl+T 打开新标签页测试
        `);
        
        // 步骤 4: 等待用户确认
        await new Promise((resolve) => {
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            rl.question('⏳ 请完成上述操作后按回车键继续...', () => {
                rl.close();
                resolve();
            });
        });
        
        // 步骤 5: 完成
        log('🎉', '步骤 4/4: 插件更新流程完成!', 'green');
        
        console.log(`
${colors.green('📋 更新摘要:')}
  ✅ 编译发布: 成功
  ✅ 插件重载: 已提示完成
  ✅ 功能测试: 已提示完成
  ✅ 输出目录: dest-extension/

${colors.blue('🔍 如需调试，请检查:')}
  - Chrome 开发者工具控制台
  - chrome://extensions/ 页面错误信息

${colors.cyan('Happy coding! 🚀')}
        `);
        
    } catch (err) {
        error(`更新流程失败: ${err.message}`);
        process.exit(1);
    }
}

// 运行主函数
main();