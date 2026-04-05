<div align="center">

# 快递取件码

> 快递短信多且杂，翻找短信费时间，容易忘取。手动输入取件码繁琐且易出错。

![100APP计划](https://img.shields.io/badge/100%20APP%20计划-005%20%2F%20100-ff6b6b?style=flat-square&logo=rocket)
![作者](https://img.shields.io/badge/作者-小石谈什么记-blueviolet?style=flat-square)
![版本](https://img.shields.io/badge/版本-0.1.0-blue?style=flat-square)
![平台](https://img.shields.io/badge/平台-Web%20%7C%20Windows%20%7C%20Android-brightgreen?style=flat-square)
![技术栈](https://img.shields.io/badge/技术栈-Next.js%20%2B%20Tauri%202%20%2B%20Capacitor-blueviolet?style=flat-square)

> 🚀 **100 APP 量产计划** 第 005 个作品 · 我给[全体取件人]做了一个[快递取件码管理器] · 作者：[小石谈什么记](#)

</div>

---

## ✨ 功能特点

- **智能短信识别**：粘贴一段或多段复杂短信，AI 自动提取取件码、地点和日期。
- **待办清单管理**：将取件信息转化为可视化待办卡片，取完即勾选，清晰明了。
- **本地持久化**：所有取件记录和 API 配置全部保存在浏览器本地，保护隐私且离线可用。
- **跨平台支持**：支持 Web、Windows 桌面和 Android 安卓。

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | ≥ 20 |
| Rust / Cargo | ≥ 1.80（Windows 桌面端必须） |
| Android Studio | 任意（Android 端调试） |

### 安装与运行

```bash
git clone <仓库地址>
cd APP_SLUG

npm install
npm run dev     # 浏览器预览 → http://localhost:3000
```

---

## 📦 三端构建

### 🌐 Web 版
```bash
npm run build
vercel --prod
```

### 🖥️ Windows 桌面版（Tauri）
```bash
npm run tauri:dev      # 开发模式
npm run tauri:build    # 打包 → dist/windows/APP_SLUG.exe

### 🎨 图标生成
为了多平台发布，必须生成标准的图标资源文件：
1. 准备一张 1024x1024 的 `icon.png` 放置在项目根目录。
2. 运行：`npm run tauri:icon icon.png` 即可自动补全所有平台的图标资源。
```
> 首次编译 Rust 约需 5-10 分钟，后续增量编译秒级完成。

### 📱 Android 版（Capacitor）
```bash
npm run android:sync   # 同步 Web 代码到 Android 项目
npm run android:open   # 在 Android Studio 中打开

# 命令行构建 APK
cd android && .\gradlew assembleDebug
# APK → android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📂 项目结构

```
APP_SLUG/
├── src/app/
│   ├── page.tsx            ← 主界面
│   ├── layout.tsx          ← HTML 模板
│   └── globals.css         ← 设计系统（Design Tokens）
├── src-tauri/              ← Tauri Windows 后端（Rust）
│   ├── src/main.rs
│   ├── tauri.conf.json     ← 窗口配置
│   └── capabilities/
├── android/                ← Capacitor Android 原生项目
├── dist/                   ← 发布产物
│   ├── windows/            ← .exe
│   └── android/            ← .apk
├── out/                    ← Next.js 静态导出
├── capacitor.config.ts
└── package.json
```

---

## 📝 开发日志

| 日期 | 内容 |
|------|------|
| 2026-04-05 | 项目初始化并修正 Capacitor 配置 |
| 2026-04-05 | 实现 AI 解析引擎逻辑 |
| 2026-04-05 | 完成卡片式移动优先 UI 界面 |

------|------|
| 2026-04-05 | 项目初始化并修正 Capacitor 配置 |
| 2026-04-05 | 实现 AI 解析引擎逻辑 |
| 2026-04-05 | 完成卡片式移动优先 UI 界面 |

------|------|
| 2026-04-05 | 项目初始化并修正 Capacitor 配置 |
| 2026-04-05 | 实现 AI 解析引擎逻辑 |
| 2026-04-05 | 完成卡片式移动优先 UI 界面 |

------|------|
| 2026-04-04 | 项目初始化，完成 Web / Windows / Android 三端配置 |

---

## 📄 许可证

MIT License · [小石谈什么记](#)
