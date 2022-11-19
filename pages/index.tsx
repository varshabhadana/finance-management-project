import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FooterBar from '../components/FooterBar';

const Home: NextPage = () => {
  return (
    <div className="p-5">
      <Head>
        <title>Home</title>
        <meta name="description" content="Overview of the app" />
      </Head>
      <div className="flex">
        <Image
          src={'/home-image.svg'}
          alt={'home screen image of a girl'}
          width={900}
          height={600}
        />
        <div className="w-4/12 flex flex-col justify-center ">
          <h1 className="text-5xl font-semibold font-dmSans ">
            Let's make money
            <br />
            management easy
          </h1>
          <br />
          <p className="text-xl text-left">
            Tired of figuring out where your money went?
            <br />
            <br />
          </p>
          <p className="text-xl ">
            Now you can keep a track of your money by adding your income and
            expenses daily and visualize your finances.
          </p>

          <Link href={'/register'}>
            <div className="h-3/12 w-5/12 mt-4">
              <button className=" flex w-full justify-center rounded-md border border-transparent bg-blue-600 mt-2 py-2 px-4 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Get Started
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <FooterBar />
      </div>
    </div>
  );
};

export default Home;
