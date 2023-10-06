import Image from 'next/image';

import emailImg from '../public/assets/email.svg';
import followImg from '../public/assets/people.svg';

const Profile = ({ data, visitorCount }: { data: any; visitorCount: any }) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center px-6 text-gray-900">
      <img className="rounded-full w-40" src={data?.avatar_url} alt="avatar" />
      <p className="text-2xl font-bold mt-2">{data?.name}</p>
      <p>@{data?.login}</p>
      <div className="w-full">
        <p className="font-bold my-1">About</p>
        <p>{data?.bio}</p>
      </div>
      <div className="w-full">
        <div className="mt-2 flex gap-2 items-center">
          <Image src={emailImg} alt="Logo" height={22} />
          {data?.email || '-'}
        </div>
        <div className="flex gap-2 items-center">
          <Image src={followImg} alt="follow" height={22} />
          {data?.followers} followers
        </div>
        <div className="flex gap-2 items-center">
          <Image src={followImg} alt="follow" height={22} />
          {data?.following} following
        </div>
        <div className="flex gap-2 items-center">
          <Image src={followImg} alt="follow" height={22} />
          {visitorCount?.count} profile visitors
        </div>
      </div>
      <div className="w-full">
        <p className="font-bold my-2">Latest Visitor</p>
        <div className="w-fit gap-2 grid grid-cols-3 mb-8">
          {visitorCount?.loggedInVisitor?.map((value: any, index: number) => {
            return (
              <img
                key={index}
                className="rounded-full w-14"
                src={value?.user.image}
                alt="Logo"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
