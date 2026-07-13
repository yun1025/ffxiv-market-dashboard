import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "FFXIV Market Dashboard",
  description: "파이널판타지14 글로벌 서버 거래 게시판 시세 조회 대시보드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}