import Navbar from '@/components/navbar';
import Profile from '@/components/profile';
import Repository from '@/components/repository';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Octocat: NextPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState({});
  const { data: session } = useSession();
  const username = 'binance';

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile/${username}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      }
    };

    const fetchIncrementApi = async () => {
      try {
        const incrementApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/incrementCount`;
        await fetch(incrementApiUrl, {
          method: 'POST',
        });
      } catch (error) {
        console.error(
          'There was a problem with the increment API request:',
          error,
        );
      }
    };

    const fetchVisitorCount = async () => {
      try {
        const countApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/getcount`;
        const response = await fetch(countApiUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const countData = await response.json();
        setVisitorCount(countData);
      } catch (error) {
        console.error(
          'There was a problem with the visitor count API request:',
          error,
        );
      }
    };

    fetchProfileData();
    fetchIncrementApi();
    fetchVisitorCount();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchIncrementLoggedInVisitorApi = async () => {
        try {
          const incrementApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/addLoggedInVisitor`;
          const sessionData = session || {};
          await fetch(incrementApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
          });
        } catch (error) {
          console.error(
            'There was a problem with the increment API request:',
            error,
          );
        }
      };
      fetchIncrementLoggedInVisitorApi();
    }
  }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar session={session} />
      <div
        className="flex flex-col sm:flex-row min-h-screen md:px-16 py-8"
        style={{ backgroundColor: '#FCFCFD' }}
      >
        <Profile data={data} visitorCount={visitorCount} />
        <Repository data={data} />
      </div>
      <div className="w-full bg-gray-100 py-4 text-sm text-gray-600 text-center">
        <p>© 2023 Pixel8Labs. All rights reserved.</p>
      </div>
    </>
  );
};

export default Octocat;
