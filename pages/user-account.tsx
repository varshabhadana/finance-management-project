import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getUserBySessionToken } from '../database/users';
import { UserResponseBody } from './api/user-account';

type Avatar = string[];

type Props = {
  firstName: string;
  id: number;
};
const mainContainerStyles = css`
  padding: 5px;
  margin: 5px;
`;

const headingStyles = css`
  font-size: 22px;
`;
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
`;
const selectedImgStyles = css`
  border-color: #1366e7;
  border-width: 5px;
`;
const imageStyles = css`
  display: flex;
  margin: 22px 0px 20px 0px;
`;

const ButtonStyle = css`
  width: 100px;
  font-size: 16px;
  padding: 5px;
  padding: 15px 32px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  background-color: #1366e7;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #64748b;
  }
`;
const errorsStyles = css`
  color: red;
  font-size: 18px;
`;

export default function Profile(props: Props) {
  const avatars: Avatar = ['youngboy', 'younggirl'];
  const firstNameUpperCase =
    props.firstName.charAt(0).toUpperCase() + props.firstName.slice(1);
  const [avatar, setAvatar] = useState<string>('');
  const [notification, setNotification] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

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
      return console.log(userResponseBody.errors);
    }
  }

  return (
    <div css={mainContainerStyles}>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Setup your profile" />
      </Head>
      <h1>Welcome {firstNameUpperCase} ! </h1>
      <div css={headingStyles}>1. Choose your avatar</div>
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

      <div>
        <label css={headingStyles}>
          2. Do you want a daily reminder to add your expenses?
        </label>

        <input
          type="checkbox"
          onClick={(event) => {
            setNotification(event.currentTarget.checked);
          }}
        />
      </div>

      <button onClick={userAccountHandler} css={ButtonStyle}>
        Next
      </button>
      {errors.map((el) => {
        return (
          <p css={errorsStyles} key={el.message}>
            {el.message}
          </p>
        );
      })}
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
