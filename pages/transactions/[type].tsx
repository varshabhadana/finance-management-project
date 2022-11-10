import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserBySessionToken } from '../../database/users';
import { TransactionResponse } from '../api/transaction';

const formStyle = css`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-direction: column;
  width: 800px;
`;
const mainContainer = css`
  margin: 5px;
  padding: 5px;
`;
const headingStyles = css`
  text-align: center;
`;
const errorsStyles = css`
  color: red;
  font-size: 18px;
`;
const categoryContainer = css`
  display: flex;
  padding: 5px;
`;
const categoryHeadingStyles = css`
  font-size: 14px;
  padding: 5px;
`;
const buttonStyles = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
`;
const selectedCategoryStyles = css`
  border-color: #1366e7;
  border-width: 5px;
`;
const addButtonStyle = css`
  width: 100%;
  font-size: 16px;
  padding: 5px;
  padding: 15px 32px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  background-color: #1366e7;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #64748b;
  }
`;
type Form = {
  amount: number;
  date: string;
  description: string;
};
type Props = {
  user: {
    id: number;
    firstName: string;
  };
  pageType: string;
};
const initialValue = {
  amount: 0,
  date: '',
  description: '',
};

type Category = {
  id: number;
  name: string;
  created_by: number;
  type: string;
  logo: string;
};

type transactionType = {
  id: number;
  name: string;
};

export default function Income(props: Props) {
  const [incomeValues, setIncomeValues] = useState<Form>(initialValue);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [category, setCategory] = useState<{ id: number; name: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionType, setTransactionType] = useState<transactionType>();

  // to fetch categories from database
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        '/api/categories?' +
          new URLSearchParams({
            type: props.pageType,
            created_by: String(props.user.id),
          }),
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = await response.json();

      setCategories(data.categories);
    };
    getCategories();
  }, []);

  // to fetch transaction type id from databse
  useEffect(() => {
    const getTransactionType = async () => {
      const response = await fetch(
        '/api/transaction-types?' +
          new URLSearchParams({
            name: props.pageType,
          }),
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setTransactionType(data);
    };
    getTransactionType();
  }, []);

  // handle change function
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncomeValues({
      ...incomeValues,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  }
  // to add new trasaction
  async function addIncomeHandler() {
    const transactionResponse = await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...incomeValues,
        amount: Number(incomeValues.amount),
        category_id: Number(category?.id),
        user_id: props.user.id,
        type_id: transactionType?.id,
      }),
    });
    const transactionResponseBody =
      (await transactionResponse.json()) as TransactionResponse;
    if ('errors' in transactionResponseBody) {
      setErrors(transactionResponseBody.errors);
      return console.log(transactionResponseBody.errors);
    }
  }
  return (
    <div className="m-5 p-5">
      <Head>
        <title>{props.pageType}</title>
        <meta
          name="description"
          content={`Set your ${props.pageType} of the day`}
        />
      </Head>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex justify-center mt-2 ">
        {props.pageType.toUpperCase()}
      </h1>

      <form
        className="flex justify-center flex-col w-full h-screen gap-300 p-8 gap-6 bg-gray-100 sm:rounded-lg mt-2  "
        onSubmit={(event) => {
          event.preventDefault();
          setIncomeValues(initialValue);
        }}
      >
        {errors.map((el) => {
          return (
            <p css={errorsStyles} key={el.message}>
              {el.message}
            </p>
          );
        })}
        <label className="text-xl font-bold tracking-tight text-gray-900">
          1. Select a Category
        </label>
        {/*  // aplying map to display categories */}
        <div className="flex ">
          {categories?.map((el) => {
            return (
              <button
                onClick={() => {
                  setCategory(el);
                }}
                css={css`
                  ${buttonStyles};
                  ${el.name === category?.name && selectedCategoryStyles}
                `}
                key={el.name}
              >
                <Image
                  src={`/${el.logo}.png`}
                  alt={`${el.logo}`}
                  width={60}
                  height={50}
                />
                <span className="text-md tracking-tight text-gray-900 flex justify-center font-medium">
                  {el.name}
                </span>
              </button>
            );
          })}
        </div>
        <label className="text-xl font-bold tracking-tight text-gray-900 tracking-wide">
          2. Enter Amount
        </label>
        <input
          className=" block w-30 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-lg-sm mt-1.5"
          id="amount"
          type="number"
          step="0.01"
          value={incomeValues.amount}
          onChange={handleChange}
        />
        <label className="text-xl font-bold tracking-tight text-gray-900 tracking-normal">
          3. Choose Date
        </label>
        <input
          className=" block w-30 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-lg mt-1.5"
          id="date"
          type="date"
          value={incomeValues.date}
          onChange={handleChange}
        />
        <label className="text-xl font-bold tracking-tight text-gray-900 tracking-normal">
          4. Description
          <span className="text-sm ml-2 font-light tracking-wide text-gray-900">
            (Optional)
          </span>
        </label>
        <input
          className=" block w-30 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-lg mt-1.5 tracking-wide "
          id="description"
          type="text"
          value={incomeValues.description}
          onChange={handleChange}
        />
        <button css={addButtonStyle} onClick={addIncomeHandler}>
          <a href="/view-transaction">Add</a>
        </button>
      </form>
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
        destination: '/register?retunTo=/login',
        permanent: true,
      },
    };
  }
  // To get transaction type from url
  const pageType = context.query.type;

  return {
    props: {
      user: user,
      pageType: pageType,
    },
  };
}
