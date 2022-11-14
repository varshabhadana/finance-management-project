import { css } from '@emotion/react';
import { Label, Modal, TextInput } from 'flowbite-react';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Categories } from '../database/categories';
import { CategoriesResponse } from '../pages/api/categories';
import { Category } from '../pages/transactions/[type]';
import { User } from './Layout';

type Props = {
  user: User;
  pageType: string;
  openModal: boolean;
  setOpenModal: any;
  setCategories: any;
  categories: Category[];
};
const errorsStyles = css`
  color: red;
  font-size: 18px;
`;
const buttonStyles = css`
  width: 40px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
`;
const selectedCategoryStyles = css`
  border-color: #1366e7;
  border-width: 5px;
`;
const categoryImages = [
  'box',
  'money-pouch',
  'money-envelope',
  'shopping',
  'trip',
];
export default function AddCategoryModal(props: Props) {
  const [newLogo, setNewLogo] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  // to add new category

  async function addCategoryHandler() {
    const categoryResponse = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: newCategoryName,
        created_by: String(props.user?.id),
        type: props.pageType,
        logo: newLogo,
      }),
    }).finally(() => props.setOpenModal(false));

    const categoryResponseBody =
      (await categoryResponse.json()) as CategoriesResponse;

    // to add new created category to the array which will render it in useffect
    props.setCategories([...props.categories, categoryResponseBody]);

    if ('errors' in categoryResponseBody) {
      setErrors(categoryResponseBody.errors);
      return console.log(categoryResponseBody.errors);
    }
  }
  return (
    <>
      <Fragment>
        <Modal
          show={props.openModal}
          size="md"
          popup={true}
          onClose={() => {
            props.setOpenModal(false);
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              {/* // to show errors */}
              {errors.map((el) => {
                return (
                  <p css={errorsStyles} key={el.message}>
                    {el.message}
                  </p>
                );
              })}
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create your own category
              </h3>
              <div>
                {categoryImages.map((el) => (
                  <button
                    onClick={() => {
                      setNewLogo(el);
                    }}
                    css={css`
                      ${buttonStyles};
                      ${el === newLogo && selectedCategoryStyles}
                    `}
                    key={el}
                  >
                    <Image
                      src={`/${el}.png`}
                      alt={`${el}`}
                      width="50px"
                      height="50px"
                    />
                  </button>
                ))}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="categoryName" value=" Add Category Name" />
                </div>
                <TextInput
                  id="categoryName"
                  required={true}
                  onChange={(event) => {
                    setNewCategoryName(event.currentTarget.value);
                    console.log(newCategoryName);
                  }}
                />
              </div>

              <button
                className="text-lg font-medium text-gray-500 dark:text-gray-300 border-4 border-blue-500 rounded-full w-full h-22 text-blue-700 dark:text-blue-500"
                onClick={addCategoryHandler}
              >
                Create
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </Fragment>
    </>
  );
}
