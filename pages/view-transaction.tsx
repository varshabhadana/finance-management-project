import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TransactionData } from '../database/transactions';
import { getUserBySessionToken } from '../database/users';

type Props = {
  user: {
    id: number;
    firstName: string;
  };
};

const totalStyles = css`
  display: flex;

  justify-content: space-evenly;
`;
const transactionStyles = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;
export default function transaction(props: Props) {
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [saving, setSaving] = useState();
  const [transactions, setTransactions] = useState<TransactionData[]>();

  // to fetch transactions from database
  useEffect(() => {
    const getTransaction = async () => {
      const response = await fetch(
        '/api/transaction?' +
          new URLSearchParams({
            user_id: String(props.user.id),
          }),
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = await response.json();

      setTransactions(data);
    };
    getTransaction();
  }, []);
  // to delete transaction by id and return the remaining transactions
  async function transactionDeleteHandler(id: Number) {
    const response = await fetch(
      '/api/transaction?' +
        new URLSearchParams({
          transaction_id: String(id),
        }),
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const deletedTransaction = await response.json();
    const filteredTransaction = transactions?.filter((el) => {
      return el.id !== deletedTransaction.id;
    });
    setTransactions(filteredTransaction);
  }

  return (
    <>
      <Head>
        <title>View Transaction</title>
        <meta
          name="description"
          content="Overview of your income and expense transaction"
        />
      </Head>
      <div css={totalStyles}>
        <div>
          <h3>INCOME</h3>
          <div> {totalIncome} </div>
        </div>

        <div>
          <h3>EXPENSE</h3>
          <div> {totalExpense} </div>
        </div>
        <div>
          <h3>SAVING</h3>
          <div> {saving} </div>
        </div>
      </div>
      <div>
        {transactions?.map((el) => {
          return (
            <div css={transactionStyles} key={el.id}>
              <Image
                src={`/${el.categoryLogo}.png`}
                alt={`${el.categoryLogo}`}
                width={60}
                height={50}
              />
              <div>{el.categoryName}</div>
              <div>{el.amount}</div>
              <button onClick={() => transactionDeleteHandler(el.id)}>
                DELETE
              </button>
            </div>
          );
        })}
      </div>

      <Link href={'/transactions/income'}>
        <button>Add Income</button>
      </Link>

      <Link href={'/transactions/expense'}>
        <button>Add Expense</button>
      </Link>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // When there is no token or not valid token redirect to login page
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?retunTo=/view-transaction',
        permanent: true,
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
}
