import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserById } from '../../database/users';

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
  return (
    <div>
      <Head>
        <title>User Profile Page</title>
        <meta name="description" content="Information about the user" />
      </Head>
      {props.id ? (
        <h1>Hello {props.firstName.toUpperCase()} ,</h1>
      ) : (
        <h1>User not found,</h1>
      )}
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the email from the URL
  const userId = context.query.id;
  const user = await getUserById(Number(userId));
  if (!user) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }
  console.log('user exist', user);
  return {
    props: {
      ...user,
    },
  };
}
