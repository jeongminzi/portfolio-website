import type { Metadata } from "next";
import "./globals.css";
import { Cursor } from "@/components/cursor";

export const metadata: Metadata = {
  title: "Leejeongmin — Product Designer",
  description:
    "이정민 (Leejeongmin) Product Designer 포트폴리오. Litmers Partner, MATE, Betalab, Dip 프로젝트.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..700,0..1,-50..200"
        />
      </head>
      <body className="no-cursor min-h-full bg-[var(--color-bg)] text-[var(--color-fg)]">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
