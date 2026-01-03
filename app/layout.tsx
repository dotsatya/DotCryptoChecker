import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DotCryptoChecker",
  description: "Crypto Screener App with build in high frequency terminal & dashboard with market analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <div className="min-h-screen flex flex-col bg-[#F5F5F5] dark:bg-[#080808]">
            <Header />
            <main className=" flex-1 p-6">
              {children}
            </main>
              <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
