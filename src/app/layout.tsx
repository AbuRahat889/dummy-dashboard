import ReduxProvider from "@/redux/provider/ReduxProvider";
import type { Metadata } from "next";
import { Outfit, Roboto } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "yanamart - Admin Dashboard",
  description: "Welcome, Admin! Manage yanamart with Ease.",
};

// Bellota

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.variable} ${outfit.variable} antialiased`}>
        <ReduxProvider>
          <div className="">{children}</div>
        </ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
