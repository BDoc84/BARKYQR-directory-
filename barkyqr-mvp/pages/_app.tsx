import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BarkYQR - Regina's Dog Business Directory</title>
        <meta name="description" content="Discover dog-friendly businesses in Regina, Saskatchewan. From groomers to daycares, trainers to dog parks - find everything your furry friend needs!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://barkyqr.vercel.app/" />
        <meta property="og:title" content="BarkYQR - Regina's Dog Business Directory" />
        <meta property="og:description" content="Discover dog-friendly businesses in Regina, Saskatchewan." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="BarkYQR - Regina's Dog Business Directory" />
        <meta property="twitter:description" content="Discover dog-friendly businesses in Regina, Saskatchewan." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
