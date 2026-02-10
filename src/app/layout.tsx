import type { Metadata } from 'next';
import './globals.css';
import { roboto } from '@/lib/fonts';
import { SanityLive } from '@/sanity/lib/live';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: {
    template: '%s | VanLife',
    default: 'VanLife',
  },
  description:
    'Rent the perfect van for your next road trip. Explore a wide range of reliable, affordable adventure vans. Your journey starts here with easy online booking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.variable} antialiased`}>
          {children}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
