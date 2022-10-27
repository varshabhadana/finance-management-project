import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

export default function Login() {
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
      return await router.push(returnTo);
    }

    await router.push(`/profile/${loginResponseBody.user.id}`);
  }
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login To Your Account" />
      </Head>
      <div css={containerStyles}>
        <p>Doesn't have an account yet? Sign Up</p>
        <h1>Login</h1>

        <form
          css={formStyle}
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
          <label htmlFor="email">Email</label>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="text"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" onClick={loginHandler}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
