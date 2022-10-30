import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

const totalStyles = css`
  display: flex;

  justify-content: space-evenly;
`;
export default function transaction() {
  const [income, setIncome] = useState([223]);
  const [expense, setExpense] = useState([33]);
  const [saving, setSaving] = useState([33]);
  return (
    <>
      <Head>
        <title>Transaction</title>
        <meta
          name="description"
          content="Overview of your income and expense transaction"
        />
      </Head>
      <div css={totalStyles}>
        <div>
          <h3>INCOME</h3>
          <div> {income} </div>
        </div>

        <div>
          <h3>EXPENSE</h3>
          <div> {expense} </div>
        </div>
        <div>
          <h3>SAVING</h3>
          <div> {saving} </div>
        </div>
      </div>

      <button>Add Income</button>
      <button>Add Expense</button>
    </>
  );
}
