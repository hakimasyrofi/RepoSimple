import { getTimeDifference } from 'utils/time';

const Repository = ({ data }: { data: any }) => {
  return (
    <div className="w-full md:w-2/3 bg-white rounded-md shadow-sm py-8 px-8">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold">Repository</p>
        <p
          className="rounded-full px-2"
          style={{ backgroundColor: '#F8F9FC', color: '#4E5683' }}
        >
          {data?.numberOfRepo}
        </p>
      </div>
      {data?.repos?.map((value: any, index: number) => {
        return (
          <div
            key={index}
            className="p-4 my-4 rounded-lg border border-1 border-gray-100"
            style={{ backgroundColor: '#F9FAFB' }}
          >
            <div className="flex items-center gap-2">
              <p className="font-bold text-xl my-1">{value?.name}</p>
              <p
                className="text-sm px-2 py-0.5 rounded-xl"
                style={{ backgroundColor: '#EEEEFB', color: '#5724D9' }}
              >
                {value?.visibility}
              </p>
            </div>
            <p className="mt-2 mb-4">{value?.description}</p>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400 rounded-full w-4 h-4"></div>
              <p>{value?.language || '-'}</p>
              <p className="text-gray-500">
                updated on {getTimeDifference(value?.updated_at)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Repository;
