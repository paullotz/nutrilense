import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { Provider } from "@/lib/provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";
import { GeistSans } from "geist/font/sans";

const recursive = Recursive({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-recursive",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url.base!),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} ${recursive.variable} antialiased`}
      >
        <Provider>{children}</Provider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
