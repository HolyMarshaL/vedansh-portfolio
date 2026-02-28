import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vedansh Chauhan | Sr. Product Designer — Building Digital Universes",
  description:
    "Portfolio of Vedansh Chauhan — Sr. Product Designer who built products from zero to millions. Seekho (10L+ users, $3M Series A), VeeFly ($2M/yr), Zoupyu (AI-built). An epic journey through the design universe.",
  keywords: [
    "Vedansh Chauhan",
    "Product Designer",
    "UI/UX Designer",
    "Portfolio",
    "Design Lead",
  ],
  authors: [{ name: "Vedansh Chauhan" }],
  openGraph: {
    title: "Vedansh Chauhan | Sr. Product Designer",
    description: "An epic journey through the design universe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
