import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

const formStyle = css`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-direction: column;
  width: 800px;
`;
const incomeCategories = [
  { name: 'Salary' },
  { name: 'Rent' },
  { name: 'Loan' },
  { name: 'Investment' },
  { name: 'Business' },
];
type Form = {
  amount: number;
  date: string;
  description: string;
};
const initialValue = {
  amount: 0,
  date: '',
  description: '',
};

export default function Income() {
  const [incomeValues, setIncomeValues] = useState<Form>(initialValue);

  // handle change function
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncomeValues({
      ...incomeValues,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  }
  return (
    <>
      <Head>
        <title>Income</title>
        <meta name="description" content="Set your income of the day" />
      </Head>
      <h1>Income</h1>
      <form
        css={formStyle}
        onSubmit={(event) => {
          event.preventDefault();
          setIncomeValues(initialValue);
        }}
      >
        <label>1. Select a Category</label>
        {incomeCategories.map((el) => {
          return <div key={el.name}>{el.name}</div>;
        })}
        <label>2. Enter Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={incomeValues.amount}
          onChange={handleChange}
        />
        <label>3. Choose Date</label>
        <input
          id="date"
          type="date"
          value={incomeValues.date}
          onChange={handleChange}
        />
        <label>4. Description </label> <span>(Optional)</span>
        <input
          id="description"
          type="text"
          value={incomeValues.description}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </>
  );
}
