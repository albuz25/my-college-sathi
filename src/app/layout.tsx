import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "My College Sathi | Online Degree Admissions",
    template: "%s | My College Sathi",
  },
  description: "Find the best online degree programs from UGC-recognized universities. Compare MBA, BBA, MCA, BCA, and more. Get free counselling and placement assistance.",
  keywords: ["online degree", "MBA online", "BBA online", "MCA online", "BCA online", "UGC recognized", "distance learning", "online education India"],
  authors: [{ name: "My College Sathi" }],
  creator: "My College Sathi",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mycollegesathi.com"),
  openGraph: {
    title: "My College Sathi | Online Degree Admissions",
    description: "Find the best online degree programs from UGC-recognized universities. Compare degrees and get free counselling.",
    type: "website",
    locale: "en_IN",
    siteName: "My College Sathi",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "My College Sathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My College Sathi | Online Degree Admissions",
    description: "Find the best online degree programs. Compare degrees and get free counselling.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="npaebwtcqwvfcr8jc0swrgw31t4sie" />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
