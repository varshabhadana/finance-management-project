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
      <nav className="mx-auto  px-2 sm:px-6 lg:px-8 bg-gray-800 text-white ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex justify-between w-full ">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div>
              {props.user ? (
                <div className="flex space-x-4 ">
                  <div className="space-x-4">
                    <Link href="/analyze">Analyze</Link>
                    <Link href="/view-transaction">Transactions</Link>
                  </div>

                  <div className="flex space-x-4">
                    <a className="" href="/logout">
                      Logout
                    </a>
                    <Link href="/private-profile">Private-Profile</Link>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/register">Register</Link>

                  <Link href="/login">Login</Link>
                </div>
              )}
            </div>

            {/*   {firstNameUpperCase} */}
          </div>
        </div>
      </nav>
    </header>
  );
}
