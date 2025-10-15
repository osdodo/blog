import '../styles/index.css';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { SEO } from '../components/seo';
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={false} defaultTheme="light" attribute="class">
      <Layout>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <GoogleAnalytics trackPageViews />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
