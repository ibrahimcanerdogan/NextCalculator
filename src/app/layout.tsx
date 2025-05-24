import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextCalculator | Modern & Nostalgic Calculator",
  description: "A beautiful calculator app with modern and nostalgic themes. Perform calculations with style using our sleek and user-friendly interface.",
  keywords: "calculator, next.js, web calculator, modern calculator, nostalgic calculator, math tool",
  authors: [{ name: "NextCalculator Team" }],
  creator: "NextCalculator",
  publisher: "NextCalculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nextcalculator.vercel.app'),
  openGraph: {
    title: "NextCalculator | Modern & Nostalgic Calculator",
    description: "A beautiful calculator app with modern and nostalgic themes. Perform calculations with style using our sleek and user-friendly interface.",
    url: 'https://nextcalculator.vercel.app',
    siteName: 'NextCalculator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NextCalculator | Modern & Nostalgic Calculator",
    description: "A beautiful calculator app with modern and nostalgic themes. Perform calculations with style using our sleek and user-friendly interface.",
    creator: '@nextcalculator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
