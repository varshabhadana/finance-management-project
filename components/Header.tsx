import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  justify-content: flex-end;

  margin-right: 12px;
  box-shadow: 0 4px 2px -2px #dde7c7;
  font-weight: bold;
`;
const navLeftStyles = css`
  margin-left: 12px;
  > a + a {
    margin-left: 22px;
  }
`;
export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <div css={navLeftStyles}>
          <Link href="/register">
            <a>Register</a>
          </Link>

          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/logout">Logout</Link>
          <Link href="/private-profile">Private-Profile</Link>
        </div>
      </nav>
    </header>
  );
}
