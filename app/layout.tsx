import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { AlertCircle, CircleCheck } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sub ai",
  description: "An AI for generating substitute recipe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster
          position="top-center"
          closeButton={false}
          icons={{
            success: <CircleCheck strokeWidth={1.5} className="h-5 w-5 text-[#0F973D] ml-2" />, // Custom success icon
            error: <AlertCircle className="h-4 w-4 text-red-500" />, // Custom error icon
            // default: <Info className="h-4 w-4 text-blue-500" />, // Fallback
          }}
          toastOptions={{
            style: {
              width: "fit-content",
              padding: "12px 16px",
              border: "1px solid #B0DCBF",
              backgroundColor: "#D8EDDF",
              borderRadius: "100px",
              color: "#0F973D",
              fontWeight: "500",
              fontSize: "16px",
            },
            className: "custom-toast",
          }}
        />
      </body>
    </html>
  );
}
