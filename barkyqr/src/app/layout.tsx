import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BarkYQR - Regina's Dog Directory",
  description: "A community-built directory to help dog owners in Regina find the best spots, services, and events for their furry friends.",
  keywords: "dogs, regina, saskatchewan, veterinary, grooming, daycare, dog-friendly, pets",
  authors: [{ name: "BarkYQR Community" }],
  creator: "BarkYQR",
  publisher: "BarkYQR",
  robots: "index, follow",
  openGraph: {
    title: "BarkYQR - Regina's Dog Directory",
    description: "Find the best dog-friendly spots and services in Regina, Saskatchewan",
    url: "https://barkyqr.com",
    siteName: "BarkYQR",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BarkYQR - Regina's Dog Directory",
    description: "Find the best dog-friendly spots and services in Regina, Saskatchewan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
