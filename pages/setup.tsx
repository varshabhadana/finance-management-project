import Head from 'next/head';
import Image from 'next/image';

type Avatar = string[];
export default function Setup() {
  const avatars: Avatar = ['youngboy', 'younggirl'];
  return (
    <>
      <Head>
        <title>Setup Profile</title>
        <meta name="description" content="Setup your profile" />
      </Head>
      <h2>Welcome !</h2>
      <div>1. Choose your avatar</div>
      {avatars.map((el) => {
        return (
          <Image
            key={el}
            src={`/${el}.svg`}
            alt={`avatar ${el}`}
            width={200}
            height={200}
          />
        );
      })}

      <div>
        2. Do you want a daily reminder to add your expenses?
        <input
          type="checkbox"
          onChange={(event) => {
            event.currentTarget.checked;
          }}
        />
      </div>

      <button>Next</button>
    </>
  );
}
