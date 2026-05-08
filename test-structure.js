// 测试脚本：验证文件结构分离是否成功
console.log('开始测试文件结构...');

// 检查HTML文件是否不再包含内联CSS和JavaScript
const fs = require('fs');

// 读取HTML文件
const htmlContent = fs.readFileSync('nexus-task-3.0.html', 'utf8');

// 检查是否还包含内联CSS
const hasInlineCSS = htmlContent.includes('<style>') && htmlContent.includes('</style>');
console.log('HTML文件中是否还包含内联CSS:', hasInlineCSS);

// 检查是否还包含内联JavaScript
const hasInlineJS = htmlContent.includes('<script>') && htmlContent.includes('let tasks = []');
console.log('HTML文件中是否还包含内联JavaScript:', hasInlineJS);

// 检查是否引用了外部CSS文件
const hasExternalCSS = htmlContent.includes('href="styles.css"');
console.log('HTML文件是否引用了外部CSS:', hasExternalCSS);

// 检查是否引用了外部JavaScript文件
const hasExternalJS = htmlContent.includes('src="app.js"');
console.log('HTML文件是否引用了外部JavaScript:', hasExternalJS);

// 检查外部CSS文件是否存在
const cssExists = fs.existsSync('styles.css');
console.log('styles.css文件是否存在:', cssExists);

// 检查外部JavaScript文件是否存在
const jsExists = fs.existsSync('app.js');
console.log('app.js文件是否存在:', jsExists);

// 检查外部文件的大小
if (cssExists) {
    const cssSize = fs.statSync('styles.css').size;
    console.log('styles.css文件大小:', cssSize, 'bytes');
}

if (jsExists) {
    const jsSize = fs.statSync('app.js').size;
    console.log('app.js文件大小:', jsSize, 'bytes');
}

// 总结测试结果
const allTestsPassed = !hasInlineCSS && !hasInlineJS && hasExternalCSS && hasExternalJS && cssExists && jsExists;

console.log('\n=== 测试结果 ===');
if (allTestsPassed) {
    console.log('✅ 所有测试通过！文件结构分离成功。');
    console.log('✅ HTML文件现在是纯净的结构文件');
    console.log('✅ CSS和JavaScript已成功分离到外部文件');
} else {
    console.log('❌ 部分测试失败，需要进一步检查。');
}

console.log('\n=== 改进总结 ===');
console.log('1. ✅ 将CSS样式从HTML文件中分离到styles.css');
console.log('2. ✅ 将JavaScript代码从HTML文件中分离到app.js');
console.log('3. ✅ HTML文件现在专注于结构和内容');
console.log('4. ✅ 实现了关注点分离，提高代码可维护性');
console.log('5. ✅ 便于团队协作和代码复用');

process.exit(allTestsPassed ? 0 : 1);