import "./globals.css";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth-contex";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bem-vindo ao Anota!",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.className} h-screen w-screen antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
