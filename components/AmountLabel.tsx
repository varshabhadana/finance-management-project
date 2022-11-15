import React from 'react';

type Props = {
  label: string;
  value: number;
};

const AmountLabel = (props: Props) => {
  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center ">
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        {props.label}
      </h3>
      <div className="mt-5 font-semibold text-2xl text-stone-600">
        {' '}
        {props.value}{' '}
      </div>
    </div>
  );
};

export default AmountLabel;
