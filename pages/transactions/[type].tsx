import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddCategoryModal from '../../components/AddCategoryModal';
import { getUserBySessionToken } from '../../database/users';
import { CategoriesResponse } from '../api/categories';
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

export type Category = {
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
  const [formValues, setformValues] = useState<Form>(initialValue);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [category, setCategory] = useState<{ id: number; name: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionType, setTransactionType] = useState<transactionType>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const router = useRouter();
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
    setformValues({
      ...formValues,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  }
  // to add new trasaction
  async function addTransactionHandler() {
    const transactionResponse = await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        date: formValues.date,
        description: formValues.description,
        amount: Number(formValues.amount),
        category_id: Number(category?.id),
        user_id: props.user.id,
        type_id: transactionType?.id,
      }),
    });
    const transactionResponseBody =
      (await transactionResponse.json()) as TransactionResponse;
    if ('errors' in transactionResponseBody) {
      setErrors(transactionResponseBody.errors);
    }
    if (transactionResponse.status == 200) {
      await router.push(`/view-transaction`);
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
        className="flex justify-center flex-col w-full h-screen gap-300 p-8 gap-6 bg-shadow-xl sm:rounded-lg shadow-xl mt-2  "
        onSubmit={(event) => {
          event.preventDefault();
          setformValues(initialValue);
        }}
      >
        <div className="w-fit h-1">
          {errors.map((el) => {
            return (
              <p css={errorsStyles} key={el.message}>
                {el.message}
              </p>
            );
          })}
        </div>

        <label className="text-xl font-bold tracking-tight text-gray-900">
          1. Select a Category
        </label>
        <div className="flex justify-between items-center ">
          {/*  // aplying map to display categories */}
          <div className="flex overflow-x-scroll w-11/12 ">
            {categories?.map((el) => {
              return (
                <div key={el.name}>
                  <button
                    onClick={() => {
                      setCategory(el);
                    }}
                    css={css`
                      ${buttonStyles};
                      ${el.name === category?.name && selectedCategoryStyles}
                    `}
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
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="text-2xl w-12 h-12 border-4 border-blue-500 rounded-full w-fit h-fit "
              onClick={() => setOpenModal(true)}
            >
              +
            </button>

            <AddCategoryModal
              pageType={props.pageType}
              user={props.user}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setCategories={setCategories}
              categories={categories}
            />
          </div>
        </div>
        <label className="text-xl font-bold tracking-tight text-gray-900 tracking-wide">
          2. Enter Amount
        </label>
        <input
          className=" block w-30 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-lg-sm mt-1.5"
          id="amount"
          type="number"
          step="0.01"
          value={formValues.amount}
          onChange={handleChange}
        />
        <label className="text-xl font-bold tracking-tight text-gray-900 tracking-normal">
          3. Choose Date
        </label>
        <input
          className=" block w-30 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-lg mt-1.5"
          id="date"
          type="date"
          value={formValues.date}
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
          value={formValues.description}
          onChange={handleChange}
        />
        <button css={addButtonStyle} onClick={addTransactionHandler}>
          Add
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
