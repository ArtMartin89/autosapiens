import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoSapiens",
  description: "Автоматизации и нейросети для бизнеса",
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
