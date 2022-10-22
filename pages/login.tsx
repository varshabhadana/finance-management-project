import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

const headingstyles = css`
  background-color: red;
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
      <p>Doesn't have an account yet? Sign Up</p>
      <h1 css={headingstyles}>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setLoginForm(initailValues);
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
