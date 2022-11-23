import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserById, getUserBySessionToken } from '../database/users';

type Props = {
  user: {
    id: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    avatar: string;
    notification: boolean;
  };
};

export default function UserProfile({
  user: { id, email, firstName, lastName, notification },
}: Props) {
  const firstNameUpperCase =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div className="w-full h-screen gap-300 p-5 mt-5">
      <Head>
        <title>User Profile Page</title>
        <meta name="description" content="Information about the user" />
      </Head>
      <div className="flex flex-col w-full h-screen gap-300 p-8 gap-6 drop-shadow-2xl sm:rounded-lg shadow-xl  ">
        {id ? (
          <>
            <h1 className="font-semibold text-2xl ml-12 ">
              Hello {firstNameUpperCase} ,
            </h1>
            <div className=" flex  p-12 h-screen border-t border-gray-200">
              <div className="overflow-hidden w-6/12 h-full bg-white drop-shadow-lg sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    User Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details of the user.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {firstName.toUpperCase()}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        LastName
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {lastName.toUpperCase()}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {email}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email Notification Subscription
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {notification ? 'ON' : 'OFF'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>User not found,</h1>
        )}
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
        destination: '/login?retunTo=/private-profile',
        permanent: true,
      },
    };
  }
  const loginUser = await getUserById(user.id);

  return {
    props: {
      user: loginUser,
    },
  };
}
