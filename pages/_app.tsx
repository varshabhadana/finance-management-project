import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';

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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
