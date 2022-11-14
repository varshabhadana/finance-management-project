import { css } from '@emotion/react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { LoginResponseBody } from './api/login';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 500px;
  height: 400px;
`;
const errorsStyles = css`
  color: red;
  font-size: 18px;
`;
type loginForm = {
  email: string;
  password: string;
};
const initailValues = {
  email: '',
  password: '',
};
type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [loginForm, setLoginForm] = useState<loginForm>(initailValues);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  }
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    });
    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;
    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }
    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();

      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();

    // redirect user to user profile
    await router.push(`/private-profile`);
  }
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-lg space-y-8">
        <Head>
          <title>Login</title>
          <meta name="description" content="Login To Your Account" />
        </Head>
        <div className="px-4 py-5 sm:px-6">
          <p>
            Doesn't have an account yet?{' '}
            <Link href={'/register'}>
              <a className="font-medium text-indigo-600 hover:text-blue-500">
                Sign Up
              </a>
            </Link>
          </p>

          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login
          </h1>

          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              setLoginForm(initailValues);
            }}
          >
            {errors.map((el) => {
              return (
                <p css={errorsStyles} key={el.message}>
                  {el.message}
                </p>
              );
            })}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-1.5"
                  type="text"
                  id="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-1.5"
                  type="text"
                  id="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between  ">
                <div className="flex items-center mt-1.5">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 "
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
              onClick={loginHandler}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-black-500 group-hover:text-black-400"
                  aria-hidden="true"
                />
              </span>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
