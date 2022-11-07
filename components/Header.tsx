import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from './Layout';

const navStyles = css`
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
  box-shadow: 0 4px 2px -2px #ddd;
  font-weight: bold;
`;
const navLeftStyles = css`
  margin-left: 12px;
  > a + a {
    margin-left: 22px;
  }
`;
type Props = {
  user: User;
};

export default function Header(props: Props) {
  const firstNameUpperCase = props.user?.firstName.charAt(0).toUpperCase();

  return (
    <header>
      <nav css={navStyles}>
        <div css={navLeftStyles}>
          <>
            {props.user ? (
              <a href="/logout">Logout</a>
            ) : (
              <>
                <Link href="/register">Register</Link>

                <Link href="/login">Login</Link>
              </>
            )}

            <Link href="/private-profile">Private-Profile</Link>

            {firstNameUpperCase}
          </>
        </div>
      </nav>
    </header>
  );
}
