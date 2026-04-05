import type { Metadata } from "next";
import "./globals.css";

// ✏️ 修改这里：每个 APP 替换自己的名称和描述
export const metadata: Metadata = {
  title: "快递取件码 | 我给[全体取件人]做了一个[快递取件码管理器]",
  description: "自动识别短信中的取件码并生成待办清单",
  keywords: ["APP_KEYWORD_1", "APP_KEYWORD_2"],
  openGraph: {
    title: "快递取件码",
    description: "自动识别短信中的取件码并生成待办清单",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
