import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { TransactionData } from '../database/transactions';

type ChartData = {
  name: string;
  value: number;
};
type Props = {
  transactions: TransactionData[];
};

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#00743F',
  '#2D87BB',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartPanel(props: Props) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [pieChartView, setPieChartView] = useState<string>('income');

  useEffect(() => {
    const filteredTransactions = props.transactions.filter(
      (el) => el.transactionTypeName === pieChartView,
    );

    const groupedByCategoryName = _.groupBy(
      filteredTransactions,
      'categoryName',
    );

    const categoryNames = Object.keys(groupedByCategoryName);

    const transformedData = categoryNames.map((el) => {
      return {
        name: el,
        value: groupedByCategoryName[el].reduce(
          (sum, item) => sum + Number(item.amount),
          0,
        ),
      };
    });

    setChartData(transformedData);
  }, [props.transactions, pieChartView]);

  return (
    <div className="flex flex-col justify-center items-center bg-white sm:rounded-lg shadow-xl p-5 box-content ">
      <div className="flex justify-between w-full box-content ">
        <h1 className="text-lg text-left">Category Distribution</h1>
        <select
          className="p-2 border-solid border-2 border-black-600 w-3/12  "
          name="transactionTypes"
          id="transactionTypes"
          onChange={(event) => setPieChartView(event.currentTarget.value)}
        >
          <option value="income"> Income </option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {props.transactions.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="flex flex-row">
        {COLORS.map((color, i) => {
          return (
            <div key={color} className=" flex justify-center item-center mr-5">
              {chartData[i] && (
                <div
                  className="mr-2 w-5 h-5 inline-block"
                  style={{
                    backgroundColor: `${color}`,
                  }}
                >
                  {' '}
                </div>
              )}
              <div> {chartData[i]?.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
