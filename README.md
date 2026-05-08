# NEXUS • TASK - 未来任务管理系统

![NEXUS TASK](https://img.shields.io/badge/NEXUS-TASK-blue?style=for-the-badge)

一个现代化的赛博朋克风格任务管理系统，具有炫酷的UI界面和完整的任务管理功能。

## 🌟 项目特色

- ✨ **赛博朋克风格UI** - 炫酷的霓虹灯效果和深色主题
- 🎨 **现代化设计** - 使用Tailwind CSS构建的响应式界面
- 📱 **移动端友好** - 完美适配各种设备尺寸
- 🎯 **任务管理** - 完整的任务增删改查功能
- 📊 **统计面板** - 实时显示任务完成情况和统计数据
- 🎪 **拖拽排序** - 使用SortableJS实现的任务拖拽排序
- 💾 **本地存储** - 任务数据自动保存到浏览器localStorage

## 🛠️ 技术栈

- **HTML5** - 语义化标记语言
- **Tailwind CSS** - 原子化CSS框架
- **原生JavaScript** - 无框架依赖的纯JS实现
- **SortableJS** - 拖拽排序库
- **Font Awesome** - 图标库
- **Google Fonts** - Orbitron字体

## 📁 项目结构

```
TodoLists2/
├── nexus-task-3.0.html     # 主应用文件 (v3.0) - 包含任务编辑功能
├── .gitignore              # Git忽略配置
└── README.md               # 项目说明文档
```

## 🚀 快速开始

### 在线使用

1. 克隆或下载本项目到本地
2. 使用现代浏览器打开 `nexus-task-3.0.html` 文件
3. 开始管理你的任务！

### 开发环境

由于是纯前端项目，无需构建步骤：

```bash
# 克隆项目
git clone https://github.com/maqilong-lab/TodoLists2.git

# 进入项目目录
cd TodoLists2

# 使用任意HTTP服务器运行（推荐）
npx serve .
# 或使用Python内置服务器
python -m http.server 8000
```

## 🎮 功能说明

### 任务管理
- **添加任务** - 点击"ADD NEW"按钮创建新任务
- **编辑任务** - 点击任务右侧的编辑按钮
- **删除任务** - 点击删除按钮移除任务
- **标记完成** - 点击复选框标记任务完成状态
- **优先级设置** - 支持高中低三个优先级
- **分类管理** - 为任务添加分类标签

### 界面特性
- **暗黑模式** - 默认使用赛博朋克暗黑主题
- **霓虹灯效果** - 炫酷的发光边框和阴影
- **响应式布局** - 适配桌面和移动设备
- **动画效果** - 平滑的过渡动画

### 数据持久化
- **自动保存** - 所有更改自动保存到localStorage
- **数据恢复** - 刷新页面后数据保持不变
- **导出导入** - 支持任务数据的备份和恢复

## 🎨 主题色彩

- **赛博紫** `#8b5cf6` - 主要强调色
- **赛博青** `#06b6d4` - 次要强调色  
- **赛博粉** `#ec4899` - 警告和提示色
- **赛博红** `#ef4444` - 错误和危险操作
- **暗黑背景** `#0a0a0a` - 主背景色

## 🔧 自定义配置

### Tailwind配置
项目中已预设赛博朋克主题配置，你可以在HTML文件的`<head>`部分修改：

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'cyber-purple': '#8b5cf6',  // 修改为你喜欢的颜色
                // ... 其他颜色配置
            }
        }
    }
}
```

## 📈 版本历史

- **v3.0** - 当前版本，包含任务编辑功能的完整任务管理系统

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

1. Fork 本项目
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 优秀的CSS框架
- [SortableJS](https://sortablejs.github.io/Sortable/) - 强大的拖拽库
- [Font Awesome](https://fontawesome.com/) - 丰富的图标库
- [Google Fonts](https://fonts.google.com/) - Orbitron字体

---

**开始你的未来任务管理之旅！** 🚀
