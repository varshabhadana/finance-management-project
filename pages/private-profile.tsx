import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserBySessionToken } from '../database/users';

type Props = {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  avatar: string;
  notification: boolean;
};

export default function UserProfile(props: Props) {
  const firstNameUpperCase =
    props.firstName.charAt(0).toUpperCase() + props.firstName.slice(1);

  return (
    <div>
      <Head>
        <title>User Profile Page</title>
        <meta name="description" content="Information about the user" />
      </Head>

      {props.id ? (
        <h1 className="font-bold text-2xl">Hello {firstNameUpperCase} ,</h1>
      ) : (
        <h1>User not found,</h1>
      )}
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
        destination: '/login?retunTo=/private-profile',
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
