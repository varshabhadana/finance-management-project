import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserBySessionToken } from '../database/users';

const formStyle = css`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-direction: column;
  width: 800px;
`;

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="User Settings" />
      </Head>
      <div css={formStyle}>
        <h1>Settings</h1>
        <label>Avatar</label>
        <input />
        <label>First Name</label>
        <input />
        <label>Last Name</label>
        <input />
        <label>Notification</label>
        <input />
      </div>
    </>
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
