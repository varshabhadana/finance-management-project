import Head from 'next/head';
import Header from './Header';

type Props = { children: any };
export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  );
}
