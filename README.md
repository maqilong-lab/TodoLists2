# NEXUS • TASK - 智能任务管理系统

![NEXUS TASK](https://img.shields.io/badge/NEXUS-TASK-purple?style=for-the-badge)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange?style=flat-square)

一个**新拟态（Neumorphism）风格**的智能任务管理系统，纯前端单页应用，无需后端服务。

## 🌟 项目特色

- 🎨 **新拟态风格UI** - 柔和的光影层次，3D凸起/凹陷质感
- 📱 **移动端友好** - 完美适配各种设备尺寸
- 🎯 **任务管理** - 完整的任务增删改查功能
- 📊 **统计面板** - 实时显示任务完成情况和统计数据
- 🔄 **拖拽排序** - 使用SortableJS实现的任务拖拽排序
- ⏰ **倒计时提醒** - 任务截止时间倒计时与逾期标记
- 💾 **本地存储** - 任务数据自动保存到浏览器localStorage
- 🚀 **自动部署** - 推送GitHub即自动部署到Cloudflare Pages

## 🛠️ 技术栈

- **HTML5** - 语义化标记语言
- **Tailwind CSS** - 原子化CSS框架
- **原生JavaScript** - 无框架依赖的纯JS实现
- **SortableJS** - 拖拽排序库
- **Chart.js** - 统计图表
- **Font Awesome** - 图标库
- **Google Fonts** - Nunito字体
- **Cloudflare Pages** - 自动部署托管

## 📁 项目结构

```
TodoLists2/
├── index.html               # 主应用入口文件
├── styles.css               # 新拟态主题样式
├── app.js                   # 应用逻辑代码
├── _redirects               # Cloudflare Pages 路由规则
├── .github/workflows/deploy.yml  # GitHub Actions 自动部署
├── .gitignore               # Git配置
├── README.md                # 项目文档
└── CLAUDE.md                # 开发指南
```

## 🚀 快速开始

### 在线使用

直接访问：**https://todolists2.pages.dev**

### 本地运行

由于是纯前端项目，无需构建步骤：

```bash
# 克隆项目
git clone https://github.com/maqilong-lab/TodoLists2.git

# 进入项目目录
cd TodoLists2

# 使用任意HTTP服务器运行
npx serve .
# 或使用Python内置服务器
python -m http.server 8000
```

浏览器打开 `http://localhost:8000` 即可使用。

## 🎮 功能说明

### 任务管理
- **添加任务** - 填写标题、描述、截止日期后添加
- **编辑任务** - 点击任务右侧的编辑按钮修改
- **删除任务** - 点击删除按钮移除，带确认弹窗
- **标记完成** - 点击圆形复选框切换完成状态
- **优先级设置** - 支持高、中、低三个优先级
- **分类管理** - 工作、学习、生活、个人等分类

### 界面特性
- **新拟态设计** - 柔和光影，凸起/凹陷质感切换
- **微交互反馈** - 按钮按下缩放、卡片悬浮提升、粒子完成效果
- **响应式布局** - 适配桌面和移动设备
- **倒计时显示** - 实时显示任务剩余时间

### 数据持久化
- **自动保存** - 所有更改自动保存到localStorage
- **数据恢复** - 刷新页面后数据保持不变

## 🎨 主题色彩

- **背景色** `#e0e5ec` - 新拟态标志性浅灰背景
- **主色调** `#7c9cbf` - 蓝色系强调色
- **成功色** `#6b9e78` - 完成任务绿色
- **警告色** `#d4a574` - 橙色系提示
- **危险色** `#c97b7b` - 删除操作红色
- **辅助色** `#9b8abf` - 紫色系点缀

## ☁️ 自动部署

每次推送 `master` 分支后，Cloudflare Pages 会自动部署：

```bash
# 提交并推送
git add .
git commit -m "your changes"
git push origin master
```

部署状态可在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 查看。

## 📈 版本历史

- **v3.0** - 新拟态风格重构，支持任务编辑、倒计时、Cloudflare Pages自动部署

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

1. Fork 本项目
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

---

**开始管理你的任务！** https://todolists2.pages.dev
