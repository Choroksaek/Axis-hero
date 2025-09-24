import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const suisse = localFont({
  src: [
    { path: '../../public/fonts/SuisseIntl-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-RegularIt.otf', weight: '400', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Light.otf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-LightIt.otf', weight: '300', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-MediumIt.otf', weight: '500', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Semibold.otf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-SemiboldIt.otf', weight: '600', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-BoldIt.otf', weight: '700', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Black.otf', weight: '900', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-BlackIt.otf', weight: '900', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Thin.otf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-ThinIt.otf', weight: '100', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Hairline.otf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-HairlineIt.otf', weight: '100', style: 'italic' },
    { path: '../../public/fonts/SuisseIntl-Book.otf', weight: '350', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl-BookIt.otf', weight: '350', style: 'italic' },
  ],
  variable: '--font-suisse',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Axis Hero',
  description: 'A Next.js app with Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${suisse.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
