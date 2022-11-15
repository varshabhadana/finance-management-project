import { UserIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { User } from './Layout';

type Props = {
  user: User;
};

export default function DropdownPanel(props: Props) {
  const firstNameUpperCase = props.user?.firstName.charAt(0).toUpperCase();
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  return (
    <div className="relative ml-3 py-2">
      <div>
        <button
          type="button"
          className="flex justify-center items-center rounded-full bg-white rounded-full text-black text-lg w-12 h-12 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => {
            setIsDropDownOpen(!isDropDownOpen);
          }}
        >
          {props.user ? firstNameUpperCase : <UserIcon className="w-7 h-8" />}
        </button>
      </div>
      {isDropDownOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <a
            href="/private-profile"
            className="block px-4 py-2 text-md text-gray-700 hover:bg-neutral-200"
            role="menuitem"
            id="user-menu-item-0"
            onClick={() => {
              setIsDropDownOpen(!isDropDownOpen);
            }}
          >
            Your Profile
          </a>

          <a
            href="/setting"
            className="block px-4 py-2 text-md text-gray-700 hover:bg-neutral-200"
            role="menuitem"
            id="user-menu-item-1"
            onClick={() => {
              setIsDropDownOpen(!isDropDownOpen);
            }}
          >
            Settings
          </a>
          <hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25 " />
          <a
            href="/logout"
            className="block px-4 py-2 text-md font-bold text-red-500  hover:bg-neutral-200 "
            role="menuitem"
            id="user-menu-item-2"
            onClick={() => {
              setIsDropDownOpen(!isDropDownOpen);
            }}
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
