import { Inter, Roboto, Open_Sans, Lato, Poppins, Source_Sans_3 } from 'next/font/google'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const fonts = {
  inter: Inter({
    subsets: ['latin'],
    display: 'swap',
  }),
  roboto: Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  }),
  openSans: Open_Sans({
    subsets: ['latin'],
    display: 'swap',
  }),
  lato: Lato({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
  }),
  poppins: Poppins({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    display: 'swap',
  }),
  sourceSans: Source_Sans_3({
    subsets: ['latin'],
    display: 'swap',
  }),
  geistSans: GeistSans,
  geistMono: GeistMono,
}

export type FontFamily = keyof typeof fonts
