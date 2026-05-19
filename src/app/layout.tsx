import "./globals.css";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth-contex";
import { ThemeProvider } from "@/context/theme-context";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bem-vindo ao TaskFlow!",
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
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
