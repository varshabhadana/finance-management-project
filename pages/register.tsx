import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};
type Props = {
  refreshUserProfile: () => Promise<void>;
};
export default function Register(props: Props) {
  const [form, setFormValues] = useState<Form>(initialFormValues);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...form,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  }
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;
    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }
    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }
    // refresh the user on state
    await props.refreshUserProfile();

    await router.push(`/profile-setup`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white   ">
      <div className="overflow-hidden bg-white drop-shadow-2xl sm:rounded-lg space-y-8 w-5/12 px-12 py-8  ">
        <Head>
          <title>Create Account</title>
          <meta name="description" content="Create a new account " />
        </Head>
        <p className="text-rose-500 text-base">
          {errors.map((el) => {
            return <p key={el.message}>{el.message}</p>;
          })}
        </p>

        <div>
          <form
            className="flex flex-col w-full flex space-y-3 "
            onSubmit={(event) => {
              event.preventDefault();
              setFormValues(initialFormValues);
            }}
          >
            <h1 className="mt-6 mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create Account
            </h1>
            <label htmlFor="firstName">First Name</label>
            <input
              className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-blue-500 sm:text-sm mt-1.5"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your first name.."
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-blue-500 sm:text-sm mt-1.5"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name.."
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-blue-500 sm:text-sm mt-1.5"
              type="text"
              id="email"
              name="email"
              placeholder="Your email.."
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-blue-500 sm:text-sm mt-1.5"
              type="text"
              id="password"
              name="password"
              placeholder="Your password.."
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              className=" flex w-full justify-center rounded-md border border-transparent bg-blue-600 mt-2 py-2 px-4 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
              onClick={registerHandler}
            >
              Register
            </button>
            <h3 className="mt-2">
              Already have an account ?{' '}
              <Link href={'/login'}>
                <a className="font-medium text-blue-600 hover:text-blue-800">
                  Login
                </a>
              </Link>{' '}
            </h3>
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
