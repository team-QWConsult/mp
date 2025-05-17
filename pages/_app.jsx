import Head from "next/head";
import PageLoading from "../components/widgets/PageLoading";
import "../styles/globals.css";
import Script from "next/script";
import { attributes as settings } from "../content/settings.md";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{settings.siteName}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <PageLoading />
      <Component {...pageProps} />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '', {
                      page_path: window.location.pathname,
                      });
                    `,
        }}
      />
    </>
  );
}

export default MyApp;
