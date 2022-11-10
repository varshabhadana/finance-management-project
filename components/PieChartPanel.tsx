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
  console.log(props.transactions);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const groupedByCategoryName = _.groupBy(props.transactions, 'categoryName');

    const categoryNames = Object.keys(groupedByCategoryName);
    console.log(groupedByCategoryName);

    const transformedData = categoryNames.map((el) => {
      return {
        name: el,
        value: groupedByCategoryName[el].reduce(
          (sum, item) => sum + Number(item.amount),
          0,
        ),
      };
    });
    console.log('transformedData', transformedData);

    setChartData(transformedData);
  }, [props.transactions]);

  return (
    <div className="flex flex-col justify-center items-center w-fit h-fit gap-300 p-8 gap-6 bg-slate-50 sm:rounded-lg m-5 p-5">
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
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
            <div className=" flex justify-center item-center mr-5">
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
