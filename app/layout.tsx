import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget'
import './globals.css'
import { LocationProvider } from "@/lib/location-context"
import { SearchProvider } from "@/lib/search-context";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'One Touch - Local Services Directory',
  description: 'Find local services and businesses in your area with One Touch - the all-in-one service directory',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <LocationProvider>
            <SearchProvider>
              {children}
              <ChatbotWidget />
            </SearchProvider>
          </LocationProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}