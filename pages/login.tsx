import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

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
type loginForm = {
  email: string;
  password: string;
};
const initailValues = {
  email: '',
  password: '',
};

export default function login() {
  const [loginForm, setLoginForm] = useState<loginForm>(initailValues);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.id]: event.currentTarget.value,
    });
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

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
