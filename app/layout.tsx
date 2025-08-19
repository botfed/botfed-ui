import { Inter as Font} from 'next/font/google'


import { Providers } from './providers'; // Import the Providers component
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';


const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || "Atlas";
const font = Font({ subsets: ["latin"], display: "swap" });


export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: 'Join the waitlist for EternaFi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Providers>
          <RainbowKitProvider>
            <Navbar />
            {children}
          </RainbowKitProvider>
        </Providers>
      </body>
    </html>
  );
}