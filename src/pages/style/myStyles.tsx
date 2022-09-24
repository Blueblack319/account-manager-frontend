import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { StyleOverview } from '../../components/style-overview';
import { useAuthState } from '../../utils/context/authContext';

interface ITicker {
  ticker: string;
  isBuying: boolean;
  count: number;
  price: number;
}

interface IDeal {
  style: string;
  description: string;
  totalPrice: number;
  ticker: ITicker[];
}

interface IStyles {
  name: string;
  description: string;
  totalBuyingPrice: number;
  isShared: boolean;
  isAnonym: boolean;
  deal: IDeal[];
}

export const MyStyles = () => {
  const [styles, setStyles] = useState<IStyles[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token') || '';
  const { user } = useAuthState();

  const getMyStyles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/my-styles`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Fetch data failed');
      }
      const data = await response.json();

      setStyles(data.styles);
    } catch (e: Error | any) {
      setError(e.message);
      setStyles(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // console.log(styles);
  useEffect(() => {
    getMyStyles();
    console.log(user);
  }, []);

  return (
    <>
      <Helmet>
        <title>My Styles | Account Manager</title>
      </Helmet>
      <div className="py-16 white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <h2 className="mb-12 text-center text-2xl text-gray-900 font-bold md:text-4xl">
            당신의 투자스타일을 찾아보세요
          </h2>
          <div className="grid gap-8 mx-60">
            {styles?.map((style) => (
              <StyleOverview
                owner="Hoon"
                name={user!.name}
                description={style.description}
                totalBuyingPrice={style.totalBuyingPrice}
              />
            ))}
            {/* <div className="row-span-2 p-6 border border-gray-100 rounded-xl bg-gray-50 text-center sm:p-8 shadow-lg">
              <div className="h-full flex flex-col justify-center space-y-4">
                <img
                  className="w-20 h-20 mx-auto rounded-full"
                  src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/second_user.webp"
                  alt="user avatar"
                  height="220"
                  width="220"
                  loading="lazy"
                />
                <p className="text-gray-600 md:text-xl">
                  {' '}
                  <span className="font-serif">"</span> Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Quaerat repellat
                  perspiciatis excepturi est. Non ipsum iusto aliquam
                  consequatur repellat provident, omnis ut, sapiente voluptates
                  veritatis cum deleniti repudiandae ad doloribus.{' '}
                  <span className="font-serif">"</span>
                </p>
                <div>
                  <h6 className="text-lg font-semibold leading-none">
                    Jane Doe
                  </h6>
                  <span className="text-xs text-gray-500">
                    Product Designer
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
              <img
                className="w-20 h-20 mx-auto rounded-full"
                src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/first_user.webp"
                alt="user avatar"
                height="220"
                width="220"
                loading="lazy"
              />
              <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-gray-600">
                  {' '}
                  <span className="font-serif">"</span> Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Quaerat repellat
                  perspiciatis excepturi est. Non ipsum iusto aliquam
                  consequatur repellat provident, omnis ut, sapiente voluptates
                  veritatis cum deleniti repudiandae ad doloribus.{' '}
                  <span className="font-serif">"</span>
                </p>
                <div>
                  <h6 className="text-lg font-semibold leading-none">
                    Jane Doe
                  </h6>
                  <span className="text-xs text-gray-500">
                    Product Designer
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
              <img
                className="w-20 h-20 mx-auto rounded-full"
                src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/third_user.webp"
                alt="user avatar"
                height="220"
                width="220"
                loading="lazy"
              />
              <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-gray-600">
                  {' '}
                  <span className="font-serif">"</span> Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Quaerat repellat
                  perspiciatis excepturi est. Non ipsum iusto aliquam
                  consequatur repellat provident, omnis ut, sapiente voluptates
                  veritatis cum deleniti repudiandae ad doloribus.{' '}
                  <span className="font-serif">"</span>
                </p>
                <div>
                  <h6 className="text-lg font-semibold leading-none">
                    Jane Doe
                  </h6>
                  <span className="text-xs text-gray-500">
                    Product Designer
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
