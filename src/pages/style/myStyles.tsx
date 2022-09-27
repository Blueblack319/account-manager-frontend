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
      console.log(data.styles);
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
          <div className="grid gap-8 lg:mx-20 xl:mx-40">
            {styles?.map((style) => (
              <StyleOverview
                key={style.name}
                owner="Hoon"
                name={user!.name}
                description={style.description}
                totalBuyingPrice={style.totalBuyingPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
