import { FunctionComponent } from 'react';
import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TransactionData } from '../database/transactions';

type Props = {
  chartData: any[];
};
const data = [
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function LineChartPanel({ chartData }: Props) {
  return (
    <div className=" bg-white sm:rounded-lg shadow-xl p-5 w-6/12 mt-2">
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Income" stroke="#8884d8">
          <LabelList content={<CustomizedLabel />} />
        </Line>
        <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
