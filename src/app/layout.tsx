import "./globals.css";
import { Sour_Gummy } from "next/font/google";
import { Metadata } from "next";

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bem-vindo ao Anota!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${sourGummy.className} antialiased`}>{children}</body>
    </html>
  );
}
