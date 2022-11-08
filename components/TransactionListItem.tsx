import { css } from '@emotion/react';
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useState } from 'react';
import { TransactionData } from '../database/transactions';

type Props = {
  singleTransaction: TransactionData;
  transactionDeleteHandler: (id: number) => void;
};
const transactionStyles = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;

export default function TransactionListItem({
  singleTransaction: { categoryLogo, categoryName, amount, id },
  transactionDeleteHandler,
}: Props) {
  const [amountOnEditInput, setamountOnEditInput] = useState<number>(amount);
  const [editMode, setEditMode] = useState<boolean>(false);

  // update amount by transaction id
  async function updateAmountValue(id: Number) {
    const response = await fetch('/api/transaction', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id, amount: amountOnEditInput }),
    }).finally(() => {
      setEditMode(false);
    });
    const data = await response.json();
  }
  return (
    <div css={transactionStyles}>
      <Image
        src={`/${categoryLogo}.png`}
        alt={`${categoryLogo}`}
        width={60}
        height={50}
      />
      <label>{categoryName}</label>
      {editMode ? (
        <div>
          <input
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={amountOnEditInput}
            onChange={(event) => {
              const result = event.currentTarget.value.replace(/\D/g, '');

              setamountOnEditInput(Number(result));
            }}
          />
          <button
            onClick={() => {
              updateAmountValue(id);
            }}
          >
            <CheckIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </button>
          <button>
            <XMarkIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </button>
        </div>
      ) : (
        <div>
          <label>{amount} </label>
          <button
            onClick={() => {
              setEditMode(true);
            }}
            className="inline-flex items-center  bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PencilIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {/*  <button onClick={() => {
              updateAmountValue(id);
            }}>SAVE</button> */}
      <button onClick={() => transactionDeleteHandler(id)}>
        <TrashIcon
          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
