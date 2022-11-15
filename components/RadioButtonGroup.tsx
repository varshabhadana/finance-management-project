type Props = {
  period: string;
  handlePeriod: (period: string) => void;
};

export default function RadioButtonGroup({ period, handlePeriod }: Props) {
  return (
    <fieldset className="flex justify-center items-center space-x-5 space-y-5 ">
      <legend className="sr-only">Time Period</legend>

      <div className="flex items-center mb-4">
        <input
          id="input-week"
          type="radio"
          name="input-week"
          value="week"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          checked={period === 'week'}
          onChange={(event) => {
            handlePeriod(event.currentTarget.value);
          }}
        />
        <label
          htmlFor="country-option-1"
          className="block ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
        >
          Last Week
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          id="input-year"
          type="radio"
          name="InputYear"
          value="year"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          checked={period === 'year'}
          onChange={(event) => {
            handlePeriod(event.currentTarget.value);
          }}
        />
        <label
          htmlFor="country-option-2"
          className="block ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
        >
          Last Year
        </label>
      </div>
    </fieldset>
  );
}
