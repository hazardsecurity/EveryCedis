import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { site } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Every₵edi — POS, stock control and online shops for Ghanaian retail",
    template: "%s · Every₵edi",
  },
  description:
    "Touchscreen POS machines, dumsor-ready UPS backup, audited stock tracking and e-commerce websites that sync with your shop. Built in Accra for Ghanaian businesses.",
  applicationName: "Every₵edi",
  openGraph: {
    type: "website",
    siteName: "Every₵edi",
    locale: "en_GH",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c110e" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: "Every₵edi",
      alternateName: "EveryCedi",
      url: site.url,
      email: site.email,
      telephone: "+233543377390",
      logo: `${site.url}/icon.svg`,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: "Every₵edi",
      url: site.url,
      email: site.email,
      telephone: "+233543377390",
      currenciesAccepted: "GHS",
      paymentAccepted: "Cash, Mobile Money, Card",
      areaServed: ["Accra", "Kumasi", "Takoradi", "Ghana"],
      address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
      parentOrganization: { "@id": `${site.url}/#org` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GH"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* sets data-theme before first paint, so there is no flash of the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
