import { css } from '@emotion/react';
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
    });
    const data = await response.json();
    console.log(data);

    /* if ('errors' in userResponseBody) {
      setErrors(userResponseBody.errors);
      return console.log(userResponseBody.errors);
    } */
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
        <input
          value={amountOnEditInput}
          onChange={(event) => {
            const result = event.currentTarget.value.replace(/\D/g, '');

            setamountOnEditInput(Number(result));
          }}
        />
      ) : (
        <label>{amount}</label>
      )}

      <button
        onClick={() => {
          setEditMode(true);
        }}
      >
        EDIT
      </button>
      <button
        onClick={() => {
          updateAmountValue(id);
        }}
      >
        SAVE
      </button>
      <button onClick={() => transactionDeleteHandler(id)}>DELETE</button>
    </div>
  );
}
