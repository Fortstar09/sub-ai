import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { AlertCircle} from "lucide-react";
import Image from "next/image";

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
          style={{ zIndex: 9999, transform: "translateX(0%)" }}
          position="top-center"
          closeButton={false}
          gap={1}
          icons={{
            success: (
              <Image
                src="/icon/check-circle.svg"
                alt="Success"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            ), // Custom success icon
            error: <AlertCircle className="h-4 w-4 text-red-500" />, // Custom error icon
            // default: <Info className="h-4 w-4 text-blue-500" />, // Fallback
          }}
          visibleToasts={1}
          toastOptions={{
            duration: 3000,
            style: {
              width: "fit-content",
              height: "fit-content",
              padding: "12px 20px",
              border: "1px solid #B0DCBF",
              backgroundColor: "#D8EDDF",
              borderRadius: "100px",
              color: "#0F973D",
              fontWeight: "500",
              fontSize: "16px",
              lineHeight: "24px",
              boxShadow: "none",
            },
          }}
        />
      </body>
    </html>
  );
}
