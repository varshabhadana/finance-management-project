import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

const mainContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const containerStyles = css`
  width: 1000px;
  display: flex;
  justify-content: center;
  margin-top: 70px;
  border-radius: 5px;

  padding: 32px;
  padding-left: 40px;
  padding-right: 40px;
  h1 {
    text-align: center;
  }
  h3 {
    text-align: center;
  }
`;
const formStyle = css`
  display: flex;

  flex-direction: column;
  width: 100%;
`;
const inputStyles = css`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ButtonStyle = css`
  width: 100%;
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
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 drop-shadow-xl  ">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg space-y-8 w-5/12 px-12 py-8 ">
        <Head>
          <title>Create Account</title>
          <meta name="description" content="Create a new account " />
        </Head>

        {errors.map((el) => {
          return (
            <p css={errorsStyles} key={el.message}>
              {el.message}
            </p>
          );
        })}
        <div>
          <form
            css={formStyle}
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
              css={inputStyles}
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
              css={inputStyles}
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
              css={inputStyles}
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
              css={inputStyles}
              type="text"
              id="password"
              name="password"
              placeholder="Your password.."
              value={form.password}
              onChange={handleChange}
              required
            />
            <button css={ButtonStyle} type="submit" onClick={registerHandler}>
              Register
            </button>
            <h3 className="mt-2">
              Already have an account ?{' '}
              <Link href={'/login'}>
                <a className="font-medium text-blue-600 hover:text-indigo-500">
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
