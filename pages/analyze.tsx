import { DayRange, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import LineChartPanel from '../components/LineChartPanel';
import PieChartPanel from '../components/PieChartPanel';
import { periodWeekly, periodYearly } from '../consts';
import { TransactionData } from '../database/transactions';
import { getUserBySessionToken } from '../database/users';
import { getMonthName, getWeekdayName } from '../utils/helpers';

type Props = {
  user: {
    id: number;
    firstName: string;
  };
};

export default function Analyze(props: Props) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [period, setPeriod] = useState<string>('year');
  const [periodNames, setPeriodNames] = useState<string[]>(periodYearly);

  // function to get date range by month
  function getDateRange(months: number) {
    const dateStartFrom = DateTime.now().minus({ months });

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
  function getDateRangeWeek(days: number) {
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

  useEffect(() => {
    if (transactions.length > 0) {
      const transactionForCharts = transactions.map((el) => {
        return {
          id: el.id,
          amount: el.amount,
          date:
            period === 'year' ? getMonthName(el.date) : getWeekdayName(el.date),
          type: el.transactionTypeName,
        };
      });

      const a = _.groupBy(transactionForCharts, 'date');
      const months = Object.keys(a);

      const transformedData = months.map((el) => {
        const data = getTotalIncomeAndExpense(a, el);
        return data;
      });

      const allMonthData = periodNames.map((el) =>
        transformedData.some((item) => item.date === el)
          ? transformedData.find((item) => item.date === el)
          : { date: el, totalIncome: 0, totalExpense: 0 },
      );

      setChartData(allMonthData);
    }
  }, [transactions, period]);

  // function to get total income, expense and month name

  function getTotalIncomeAndExpense(a: any, month: string) {
    const monthData = a[month];
    const typeMonthData = _.groupBy(monthData, 'type');

    return {
      date: month,
      totalIncome:
        typeMonthData.income?.reduce((sum, el) => sum + Number(el.amount), 0) ||
        0,
      totalExpense:
        typeMonthData.expense?.reduce(
          (sum, el) => sum + Number(el.amount),
          0,
        ) || 0,
    };
  }
  console.log('chartData', chartData);
  return (
    <div className="">
      {chartData.length > 0 && (
        <div className="flex flex-row gap-4 p-10">
          <div
            style={{ height: '500px' }}
            className="flex items-center justify-center flex-col bg-white sm:rounded-lg shadow-xl w-7/12  "
          >
            <h1 className="text-lg text-left">Overview</h1>
            <ResponsiveContainer width="90%" height="90%">
              <BarChart
                className=" justify-center items-center  "
                /* width={1000}
                height={500} */
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={'date'} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalIncome" fill="#8884d8" />
                <Bar dataKey="totalExpense" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex w-3/12">
            <PieChartPanel transactions={transactions} />
          </div>
        </div>
      )}
      {/*  <div>
        <LineChartPanel chartData={chartData} />
      </div> */}
      <div className="flex items-center justify-evenly text-lg py-4 ">
        <button
          onClick={() => {
            setSelectedDayRange(getDateRangeWeek(7));
            setPeriod('week');
            setPeriodNames(periodWeekly);
          }}
        >
          Last Week
        </button>
        <button
          onClick={() => {
            setSelectedDayRange(getDateRange(12));
            setPeriod('year');
            setPeriodNames(periodYearly);
          }}
        >
          Year
        </button>
      </div>
    </div>
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
