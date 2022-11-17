import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
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
        <div className="w-4/12 flex flex-col justify-center items-center">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe a
            placeat tempore natus quasi similique, vero quos corrupti asperiores
            eius quo perspiciatis quisquam veniam est. Enim dolorum fugit autem
            quo est voluptatem, officia hic tempora ipsa molestiae, voluptates
            dolore, voluptas error? Dolorem soluta nostrum ut fugit minus veniam
            maxime accusantium, perferendis molestias, sequi numquam doloribus
            assumenda natus adipisci fugiat qui magni sed deleniti voluptatem
            reiciendis! Iusto, quibusdam ab voluptatum molestiae ad ullam nobis
            perferendis nisi tenetur alias, cum veritatis reprehenderit sunt
            unde at vel. Libero asperiores quaerat, consequuntur quos iste
            quidem eos. Nulla beatae repellat quisquam corrupti iure minus
            voluptatem provident, labore dicta debitis delectus nesciunt aut,
            error natus ea culpa quidem iste, inventore quae? Delectus nisi
          </p>
          <div className="h-3/12 w-5/12 mt-4">
            <button className=" flex w-full justify-center rounded-md border border-transparent bg-blue-600 mt-2 py-2 px-4 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Register
            </button>
          </div>
        </div>
      </div>

      <div>
        <FooterBar />
      </div>
    </div>
  );
};

export default Home;
