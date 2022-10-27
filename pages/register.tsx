import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterResponseBody } from './api/register';

const formStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-direction: column;
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

export default function Register() {
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
    console.log('here...');
    console.log(`/profile/${registerResponseBody.user.id}`);
    await router.push(`/profile/${registerResponseBody.user.id}`);
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
        <meta name="description" content="Create a new account " />
      </Head>
      <h1>Create Account</h1>
      {errors.map((el) => {
        return (
          <p css={errorsStyles} key={el.message}>
            {el.message}
          </p>
        );
      })}
      <form
        css={formStyle}
        onSubmit={(event) => {
          event.preventDefault();
          setFormValues(initialFormValues);
        }}
      >
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button css={ButtonStyle} type="submit" onClick={registerHandler}>
          Register
        </button>
        <h3>Already have an account Login</h3>
      </form>
    </>
  );
}
