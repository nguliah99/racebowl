import { BottomNav } from "@/components/bottom-nav";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "RaceBowl Webapp",
  description: "High-speed gamified food experience inspired by RaceBowl.",
};

export default async function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="id">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <BottomNav />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
