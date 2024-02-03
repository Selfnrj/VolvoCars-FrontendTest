import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StyleProvider, ThemePicker } from "vcc-ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Volvo Cars",
  description: "Front-end coding test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyleProvider>
          <ThemePicker variant="light">
            <main className="max-w-screen-xl mx-auto p-4 sm:p-24">
              {children}
            </main>
          </ThemePicker>
        </StyleProvider>
      </body>
    </html>
  );
}
