import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Cyfo Tech Connect - Cyber Workshops Ticket Booking",
  description: "Browse cybersecurity workshops, register, and manage tickets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className={`${spaceGrotesk.className} antialiased bg-[#050816] text-[#FFFFFF] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
