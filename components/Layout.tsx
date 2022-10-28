import Head from 'next/head';
import Header from './Header';

export type User =
  | {
      id: number;
      firstName: string;
    }
  | undefined;

type Props = { children: any; user: User };

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={props.user} />
      <main>{props.children}</main>
    </>
  );
}
