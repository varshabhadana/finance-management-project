import {
  Calendar,
  DayRange,
  utils,
} from '@amir04lm26/react-modern-calendar-date-picker';
import { css } from '@emotion/react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TransactionListItem from '../components/TransactionListItem';
import { TransactionData } from '../database/transactions';
import { getUserBySessionToken } from '../database/users';

type Props = {
  user: {
    id: number;
    firstName: string;
  };
};
const buttonContainerStyles = css`
  display: flex;
  justify-content: center;
`;

const ButtonStyle = css`
  width: 20%;
  font-size: 16px;
  padding: 5px;
  padding: 15px 32px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  margin-top: 60px;
  margin-right: 20px;
  background-color: #1366e7;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #64748b;
  }
`;
const totalStyles = css`
  display: flex;

  justify-content: space-evenly;
`;
const messageStyles = css`
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  font-weight: bold;
`;
const transactionStyles = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;
export default function transaction(props: Props) {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [saving, setSaving] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isCalenderOpen, setIsCalenderOpen] = useState<Boolean>(false);

  // filter transaction by date range
  const formatDate = (date: Date) => {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  };

  const defaultFrom = {
    year: 2022,
    month: 11,
    day: 1,
  };

  const defaultTo = formatDate(new Date());

  const defaultRange = {
    from: defaultFrom,
    to: utils('en').getToday(),
  };

  const [selectedDayRange, setSelectedDayRange] =
    useState<DayRange>(defaultRange);

  // to fetch transactions from database
  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const getTransaction = async () => {
        const response = await fetch(
          '/api/transaction?' +
            new URLSearchParams({
              user_id: String(props.user.id),
              startDate: `${selectedDayRange.from?.year}-${selectedDayRange.from?.month}-${selectedDayRange.from?.day}`,

              endDate: `${selectedDayRange.to?.year}-${selectedDayRange.to?.month}-${selectedDayRange.to?.day}`,
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
    }
  }, [selectedDayRange]);
  // to display total Income and expense
  useEffect(() => {
    // to get total of incomes
    const totalIncomeValue = transactions
      ?.filter((el) => {
        return el.transactionTypeName === 'income';
      })
      .reduce((sum, el) => {
        return sum + Number(el.amount);
      }, 0);
    setTotalIncome(totalIncomeValue);
    // to get total of expenses
    const totalExpenseValue = transactions
      ?.filter((el) => {
        return el.transactionTypeName === 'expense';
      })
      .reduce((sum, el) => {
        return sum + Number(el.amount);
      }, 0);
    setTotalExpense(totalExpenseValue);

    // to get total of saving
    const totalSavingvalue = totalIncomeValue - totalExpenseValue;
    setSaving(totalSavingvalue);
  }, [transactions]);

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

      <div className="flex items-center justify-center relative">
        {/*  // toggle calender visibility */}
        <button
          onClick={() => {
            setIsCalenderOpen(!isCalenderOpen);
          }}
        >
          {' '}
          <CalendarIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </button>

        <div style={{ position: 'absolute', top: '20px' }}>
          {isCalenderOpen && (
            <Calendar
              /* calendarClassName="absolute" */
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              shouldHighlightWeekends
              renderFooter={() => <p>hello</p>}
            />
          )}
        </div>
      </div>

      <div>
        {transactions.length > 0 ? (
          <div>
            {transactions.map((el) => (
              <TransactionListItem
                key={el.id}
                singleTransaction={el}
                transactionDeleteHandler={transactionDeleteHandler}
              />
            ))}
            {/*  {transactions?.map((el) => {
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
                    DELETEs
                  </button>
                </div>
              );
            })} */}
          </div>
        ) : (
          <div css={messageStyles}>No Record Found</div>
        )}
      </div>
      <div css={buttonContainerStyles}>
        <Link href={'/transactions/income'}>
          <button css={ButtonStyle}>Add Income</button>
        </Link>
        <Link href={'/transactions/expense'}>
          <button css={ButtonStyle}>Add Expense</button>
        </Link>
      </div>
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
