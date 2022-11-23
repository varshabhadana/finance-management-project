import { PencilIcon } from '@heroicons/react/20/solid';
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
export default function Settings({
  user: { id, email, firstName, lastName, notification },
}: Props) {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="User Settings" />
      </Head>
      {id ? (
        <div className="bg-slate-50 flex justify-center items-center p-12 h-screen mt-5">
          <div className="overflow-hidden w-9/12 h-full bg-white shadow-xl sm:rounded-lg">
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
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6  ">
                  <dt className="text-sm font-medium text-gray-500">
                    Email Notification Subscription
                  </dt>
                  <div className="flex ">
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {notification ? 'ON' : 'OFF'}
                    </dd>
                    <button
                      onClick={() => {}}
                      className="inline-flex items-center px-4 text-sm font-medium text-gray-700 "
                    >
                      <PencilIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ) : (
        <h1>User not found,</h1>
      )}
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
  const loginUser = await getUserById(user.id);

  return {
    props: {
      user: loginUser,
    },
  };
}
