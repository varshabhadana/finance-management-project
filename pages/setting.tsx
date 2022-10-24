import { css } from '@emotion/react';
import Head from 'next/head';

const formStyle = css`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-direction: column;
  width: 800px;
`;

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="User Settings" />
      </Head>
      <div css={formStyle}>
        <h1>Settings</h1>
        <label>Avatar</label>
        <input />
        <label>First Name</label>
        <input />
        <label>Last Name</label>
        <input />
        <label>Notification</label>
        <input />
      </div>
    </>
  );
}
