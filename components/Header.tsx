import Image from 'next/image';
import Link from 'next/link';
import DropdownPanel from './DropdownPanel';
import { User } from './Layout';

type Props = {
  user: User;
};
type NavElementProps = {
  hrefName: string;
  label: string;
};

function NavbarElement(props: NavElementProps) {
  return (
    <div className="hover:bg-slate-100 text-black text-xl rounded-md px-6 py-2">
      <Link href={`/${props.hrefName}`}>{props.label}</Link>
    </div>
  );
}

export default function Header(props: Props) {
  return (
    <header>
      <nav className="mx-auto  px-2 sm:px-6 lg:px-8  text-white ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex justify-between w-full ">
            <Link href={'/'} className="flex flex-shrink-0 items-center ">
              <Image src={'/logo.png'} width={100} height={60} />
            </Link>
            <div>
              {props.user ? (
                <div className=" flex flex-row ">
                  <div className="flex space-x-4 p-2 w-fit">
                    <NavbarElement hrefName={'analyze'} label={'Analyze'} />
                    <NavbarElement
                      hrefName={'view-transaction'}
                      label={'Transactions'}
                    />
                  </div>

                  <div>
                    {' '}
                    <DropdownPanel user={props.user} />
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4 p-2 w-fit ">
                  <NavbarElement hrefName={'register'} label={'Register'} />
                  <NavbarElement hrefName={'login'} label={'Login'} />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
