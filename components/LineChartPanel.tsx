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

type Props = {
  chartData: any[];
};

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
    <div className=" w-full mt-2 mb-5 flex justify-center items-center ">
      <div className="bg-white sm:rounded-lg shadow-xl w-6/12 p-9 mr-5">
        <h1 className="text-lg text-left p-2">Income</h1>
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
          <Line type="monotone" dataKey="totalIncome" stroke="#8884d8">
            <LabelList content={<CustomizedLabel />} />
          </Line>
        </LineChart>
      </div>
      <div className="bg-white sm:rounded-lg shadow-xl w-6/12 p-9 ml-2">
        <h1 className="text-lg text-left p-2">Expense</h1>
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
          <Line type="monotone" dataKey="totalExpense" stroke="#82ca9d">
            <LabelList content={<CustomizedLabel />} />
          </Line>
        </LineChart>
      </div>
    </div>
  );
}
