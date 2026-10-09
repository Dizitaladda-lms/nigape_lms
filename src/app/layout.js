// app/layout.js
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../Homesections/Header.jsx";
import Footer from "../Homesections/Footer.jsx";
import ClientWrapper from "./wraper.jsx";
import EnrollmentPopupGate from "@/components/EnrollmentPopupGate";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  verification: {
    google: "p-LDTwKh1RWq4EXjYEnEhRI9bhHhSzmRpcFIbBtABHg",
  },
  robots: {
    index: true,
    follow: true,
    maxSnippet: -1,
    maxVideoPreview: -1,
    maxImagePreview: "large",
  },
  other: {
    Publisher: "Team NIGAPE",
  },
  title: "NIGAPE - GK2 Delhi Institute of Generative AI & Prompt Engineering",
  description: "India-first institute dedicated to Generative AI and Prompt Engineering careers.",
  openGraph: {
    title: "NIGAPE - GK2 Delhi Institute of Generative AI & Prompt Engineering",
    description: "India-first institute dedicated to Generative AI and Prompt Engineering careers.",
    type: "website",
    url: "https://nigape.com",
    siteName: "NIGAPE",
    images: [
      {
        url: "https://nigape.com/Nigapepic/nigape1.png",
        width: 1200,
        height: 630,
        alt: "NIGAPE - GK2 Delhi Institute of Generative AI & Prompt Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIGAPE - GK2 Delhi Institute of Generative AI & Prompt Engineering",
    description: "India-first institute dedicated to Generative AI and Prompt Engineering careers.",
    images: ["https://nigape.com/Nigapepic/nigape1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="Publisher" content="Team NIGAPE" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TSTXS6L6');`,
          }}
        />
        {/* Google Tag Manager (GTM-WSRRRM2L) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WSRRRM2L');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
                      mono: ['var(--font-geist-mono)', 'monospace']
                    },
                    colors: {
                      pink: { 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777' },
                      purple: { 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea' },
                      cyan: { 300: '#99f6e4', 400: '#22d3ee' }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>

      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TSTXS6L6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* Google Tag Manager (noscript) GTM-WSRRRM2L */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WSRRRM2L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ClientWrapper>
          <Header />
          {children}
          <Suspense fallback={null}>
            <EnrollmentPopupGate />
          </Suspense>
          <Footer />
          <FloatingContactButtons />
        </ClientWrapper>
      </body>
    </html>
  );
}