import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

const headingStyles = css`
  background-color: red;
  font-size: 55px;
  color: pink;
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
  return (
    <>
      <Head>
        <title>Create Account</title>
        <meta name="description" content="Create a new account " />
      </Head>
      <h1 css={headingStyles}>Create Account</h1>
      <form
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
        <button type="submit">Register</button>
        <h3>Already have an account Login</h3>
      </form>
    </>
  );
}
