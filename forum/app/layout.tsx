import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "QuantaraX | Quantum Physics Forum",
  description: "The premier community for quantum physics enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-white/10 bg-background/50 py-8 text-center text-sm text-muted-foreground">
          <div className="container px-4">
            <p>&copy; {new Date().getFullYear()} QuantaraX. All quantum states preserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
