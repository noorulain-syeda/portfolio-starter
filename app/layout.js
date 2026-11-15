import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cv } from "@/data/cv";
import "./globals.css";

// TODO: pick a font that fits your style.
// Arabic site? Try IBM_Plex_Sans_Arabic with subsets: ["arabic"].
const font = Inter({ subsets: ["latin"] });

// Shown in the browser tab, on Google, and in link previews.
export const metadata = {
  title: `Team Portfolio – deploy test`,
  description: cv.summary,
};

export default function RootLayout({ children }) {
  return (
    // Building an Arabic version? Use lang="ar" dir="rtl".
    <html lang="en">
      <body className={`${font.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="mx-auto w-full max-w-4xl flex-1 px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
