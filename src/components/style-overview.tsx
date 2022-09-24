import React from 'react';

interface IStyleProps {
  owner: string;
  name: string;
  description: string;
  totalBuyingPrice: number;
}

export const StyleOverview: React.FC<IStyleProps> = ({
  owner,
  name,
  description,
  totalBuyingPrice,
}) => {
  return (
    <div className="row-span-2 p-6 border border-gray-100 rounded-xl bg-gray-50 text-center sm:p-8 shadow-lg">
      <div className="h-full flex flex-col justify-center space-y-4">
        <h1>{name}</h1>
        <p className="text-gray-600 md:text-xl">
          {' '}
          <span className="font-serif">"</span> {description}{' '}
          <span className="font-serif">"</span>
        </p>
        <div>
          <h6 className="text-lg font-semibold leading-none">{owner}</h6>
          <span className="text-xs text-gray-500">{totalBuyingPrice}</span>
        </div>
      </div>
    </div>
  );
};
