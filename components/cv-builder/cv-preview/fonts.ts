import { Inter, Roboto, Open_Sans, Lato, Poppins, Source_Sans_3 } from 'next/font/google'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})
const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = GeistMono

export const fonts = { inter, roboto, openSans, lato, poppins, sourceSans, geistMono }

export type FontFamily = keyof typeof fonts
