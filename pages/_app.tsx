import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            font-family: 'Nanum Myeongjo', serif;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
