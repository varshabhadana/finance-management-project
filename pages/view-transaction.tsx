import {
  Calendar,
  DayRange,
  utils,
} from '@amir04lm26/react-modern-calendar-date-picker';
import { CalendarIcon } from '@heroicons/react/20/solid';
import { DateTime } from 'luxon';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AmountLabel from '../components/AmountLabel';
import TransactionListItem from '../components/TransactionListItem';
import { TransactionData } from '../database/transactions';
import { getUserBySessionToken } from '../database/users';

type Props = {
  user: {
    id: number;
    firstName: string;
  };
};

export default function Transaction(props: Props) {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [saving, setSaving] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isCalenderOpen, setIsCalenderOpen] = useState<Boolean>(false);

  // filter transaction by date range
  /* const formatDate = (date: Date) => {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }; */

  // function to get date range
  function getDateRange(days: number) {
    const dateStartFrom = DateTime.now().minus({ days });
    const dateRange = {
      from: {
        year: dateStartFrom.year,
        month: dateStartFrom.month,
        day: dateStartFrom.day,
      },
      to: utils('en').getToday(),
    };
    return dateRange;
  }
  // default transaction filter by today
  const defaultFrom = DateTime.now();

  const defaultRange = {
    from: {
      year: defaultFrom.year,
      month: defaultFrom.month,
      day: defaultFrom.day,
    },
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
      {/* // component to display the totals */}
      <div className="flex ">
        <AmountLabel label="INCOME" value={totalIncome} />
        <AmountLabel label="EXPENSE" value={totalExpense} />
        <AmountLabel label="SAVING" value={saving} />
      </div>

      {/*  // toggle calender visibility */}
      <div className="flex items-center justify-center relative ">
        <button
          className="flex rounded-md hover:bg-slate-100 p-2 "
          onClick={() => {
            setIsCalenderOpen(!isCalenderOpen);
          }}
        >
          {' '}
          <CalendarIcon
            className="-ml-1 mr-2 h-5 w-5 text-blue-500  "
            aria-hidden="true"
          />
          <p className="font-semibold">Select Date</p>
        </button>

        {/* // calender to filter transaction by date */}

        <div style={{ position: 'absolute', top: '20px' }}>
          {isCalenderOpen && (
            <Calendar
              /* calendarClassName="absolute" */
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              shouldHighlightWeekends
              renderFooter={() => (
                <div className="flex items-center justify-evenly  h-9 ">
                  <button
                    className="flex w-3/12 justify-center rounded-md border border-transparent bg-blue-600  text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-5"
                    onClick={() => {
                      setSelectedDayRange(getDateRange(7));
                    }}
                  >
                    Last Week
                  </button>
                  <button
                    className="flex w-3/12 justify-center rounded-md border border-transparent bg-blue-600  text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-5"
                    onClick={() => {
                      setSelectedDayRange(getDateRange(30));
                    }}
                  >
                    Last Month
                  </button>
                  <button
                    className="flex w-3/12 justify-center rounded-md border border-transparent bg-blue-600  text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                    onClick={() => {
                      setSelectedDayRange(defaultRange);
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}
            />
          )}
        </div>
      </div>

      <div>
        {transactions.length > 0 ? (
          <div className=" overflow-y-scroll h-[400px] ">
            {transactions.map((el) => (
              <TransactionListItem
                key={el.id}
                singleTransaction={el}
                transactionDeleteHandler={transactionDeleteHandler}
                setTransactions={setTransactions}
                transactions={transactions}
              />
            ))}
          </div>
        ) : (
          <div className="text-2xl text-center font-bold space-x-4 space-y-4  p-8">
            No Record Found
          </div>
        )}
      </div>
      <div className="flex justify-evenly ">
        <Link href={'/transactions/income'}>
          <button className="flex w-3/12 justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-3 mt-4">
            Add Income
          </button>
        </Link>
        <Link href={'/transactions/expense'}>
          <button className="flex w-3/12 justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-3 mt-4">
            Add Expense
          </button>
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
