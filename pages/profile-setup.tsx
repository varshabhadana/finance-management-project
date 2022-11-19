import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getUserBySessionToken } from '../database/users';
import { UserResponseBody } from './api/user-account';

type Avatar = string[];

type Props = {
  firstName: string;
  id: number;
};

const imageContainerStyles = css`
  border-radius: 50%;
  background-color: #dedad9;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  padding: 30px;
  align-items: center;
  margin-right: 20px;
  :hover {
    background-color: #f1e8e6;
  }
`;
const selectedImgStyles = css`
  border-color: #1366e7;
  border-width: 5px;
`;
const imageStyles = css`
  display: flex;
  margin: 22px 0px 20px 0px;
`;

export default function ProfileSetup(props: Props) {
  const avatars: Avatar = ['youngboy', 'younggirl'];
  const firstNameUpperCase =
    props.firstName.charAt(0).toUpperCase() + props.firstName.slice(1);
  const [avatar, setAvatar] = useState<string>('');
  const [notification, setNotification] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function userAccountHandler() {
    const userResponse = await fetch('/api/user-account', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ avatar, notification, id: props.id }),
    });
    const userResponseBody = (await userResponse.json()) as UserResponseBody;
    if ('errors' in userResponseBody) {
      setErrors(userResponseBody.errors);
    }
    if (userResponse.status == 200) {
      await router.push(`/view-transaction`);
    }
  }

  return (
    <div className="w-full h-screen gap-300 px-24 gap-6 bg-white sm:rounded-lg  ">
      <Head>
        <title>Profile</title>
        <meta name="description" content="Setup your profile" />
      </Head>
      <div className="flex justify-center items-center flex-col w-full h-screen gap-300 p-8 gap-6 drop-shadow-2xl sm:rounded-lg shadow-xl  ">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-left ">
          Welcome {firstNameUpperCase} !{' '}
        </h1>
        <div className="text-xl tracking-tight text-gray-900 mt-5 ">
          1. Choose your avatar
        </div>
        <div css={imageStyles}>
          {avatars.map((el) => {
            return (
              <button
                onClick={() => setAvatar(el)}
                css={css`
                  ${imageContainerStyles};
                  ${el === avatar && selectedImgStyles}
                `}
                key={el}
              >
                <Image
                  src={`/${el}.svg`}
                  alt={`avatar ${el}`}
                  width={200}
                  height={200}
                />
              </button>
            );
          })}
        </div>

        <div className="flex m-2 flex-row gap-8">
          <label className="text-xl tracking-tight text-gray-900  ">
            2. Do you want a daily reminder to add your expenses?
          </label>

          <input
            className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 "
            type="checkbox"
            onClick={(event) => {
              setNotification(event.currentTarget.checked);
            }}
          />
        </div>

        <button
          onClick={userAccountHandler}
          className="flex w-1/12 justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-3 mt-4"
        >
          Next
        </button>
        <div className="text-rose-500 text-base space-y-2">
          {errors.map((el) => {
            return <p key={el.message}>{el.message}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // When there is no token or not valid token redirect to login page
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/register?retunTo=/profile-setup',
        permanent: true,
      },
    };
  }

  return {
    props: {
      ...user,
    },
  };
}
