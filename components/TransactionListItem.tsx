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
  setTransactions: any;
  transactions: TransactionData[];
};
const transactionStyles = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;

export default function TransactionListItem({
  singleTransaction: {
    categoryLogo,
    categoryName,
    amount,
    id,

    transactionTypeName,
  },
  transactionDeleteHandler,
  setTransactions,
  transactions,
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
    const updatedTransaction = transactions.map((el) =>
      el.id !== data.id ? el : { ...el, amount: data.amount },
    );

    setTransactions(updatedTransaction);
  }
  return (
    <div className="flex justify-evenly mx-auto my-2  bg-slate-50 sm:rounded-lg shadow-sm py-4 items-center w-11/12">
      <Image
        src={`/${categoryLogo}.png`}
        alt={`${categoryLogo}`}
        width={60}
        height={50}
      />
      <label>{categoryName}</label>
      {editMode ? (
        <div className="flex justify-between ">
          <input
            className="mt-1 p-2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-20 mr-5"
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
              className="-ml-1 mr-5 h-5 w-5 fill-green-500"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => {
              setEditMode(false);
              setamountOnEditInput(amount);
            }}
          >
            <XMarkIcon
              className="-ml-1 mr-5 h-5 w-5  fill-red-500"
              aria-hidden="true"
            />
          </button>
        </div>
      ) : (
        <div>
          {transactionTypeName === 'expense' ? (
            <label className="text-red-500"> - {amount} </label>
          ) : (
            <label className="text-green-500"> + {amount} </label>
          )}

          <button
            onClick={() => {
              setEditMode(true);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 "
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
