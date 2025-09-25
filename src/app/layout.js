import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserContextProvider } from "@/context/UserContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ApnaGrad - Apna Success",
  description: "ApnaGrad: Your ultimate platform for student notes, PYQs, previous year questions, and certificates. Graduate with confidence!",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}>
        <UserContextProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  );
}
