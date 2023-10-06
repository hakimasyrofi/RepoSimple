import logoImg from 'public/assets/logo.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import hideMenuImg from '../public/assets/hide_menu.svg';
import { useState } from 'react';
import Dropdown from './dropdown';

const Navbar = ({ session }: { session: any }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-full flex justify-between items-center px-4 md:px-16 py-2 shadow-sm relative">
      <Image src={logoImg} alt="Logo" height={52} />

      {session ? (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`${
              showDropdown ? 'bg-gray-100' : ''
            } text-sm rounded-2xl border border-1 border-gray-200 py-2 px-3 text-white font-semibold`}
          >
            <div className="flex gap-2">
              <img
                className="rounded-full w-8"
                src={session?.user.image}
                alt="Avatar"
              />
              <Image src={hideMenuImg} alt="Hide Menu" height={12} />
            </div>
          </button>
          {showDropdown && <Dropdown session={session} />}
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="text-sm rounded-lg py-2 px-3 text-white font-semibold"
          style={{ backgroundColor: '#DD2590' }}
        >
          Login with GitHub
        </button>
      )}
    </div>
  );
};

export default Navbar;
