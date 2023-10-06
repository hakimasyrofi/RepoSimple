import { signOut } from 'next-auth/react';

const Dropdown = ({ session }: { session: any }) => {
  return (
    <div
      className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md"
      style={{ width: '240px' }}
    >
      <div className="p-4">
        <div className="flex gap-2 items-center pb-2 border-b-2 border-gray-100">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt="Logo"
          />
          <div>
            <p className="text-gray-600 font-bold">{session?.user.name}</p>
            <p className="text-sm text-gray-600">{session?.user.email}</p>
          </div>
        </div>
        <div
          className="py-2 border-b-2 border-gray-100 cursor-pointer"
          onClick={() =>
            window.open(`https://github.com/${session?.user.name}`, '_blank')
          }
        >
          <p className="text-sm text-gray-500 font-semibold">View Profile</p>
        </div>
        <div className="pt-2 cursor-pointer" onClick={() => signOut()}>
          <p className="text-sm text-gray-500 font-semibold">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
