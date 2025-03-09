import type { Metadata } from "next";
import { Poppins, Playfair_Display_SC  } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  // metadataBase: new URL('https://domain.com'),
  title: "ksunnwy",
  description: "your best frontend developer",
  icons: {
    icon: '/favicon.png', 
  },
  openGraph: {
    images: [
      {
        url: `/SEO.png`,
        width: 1200,
        height: 630,
      },
    ],
  },

};

const poppins = Poppins({ weight: "400" })
const playfair_Display_SC = Playfair_Display_SC({ weight: "400" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${playfair_Display_SC.className} antialiased`}
 >
        {children}
      </body>
    </html>
  );
}
