import React, { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

const InputBox = ({
  label,
  amount,
  currencyOptions,
  onCurrencyChange,
  selectCurrency,
  onAmountChange,
  amountDisable,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-500">{label}</label>
      <div className="flex items-center">
        <input
          type="number"
          className="border border-gray-400 p-2 rounded-md w-2/3 mr-2"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={amountDisable}
        />
        <select
          className="border border-gray-400 p-2 rounded-md w-1/3"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: fromCurrencyInfo, error: fromCurrencyError } =
    useCurrencyInfo(from);
  const { data: toCurrencyInfo, error: toCurrencyError } = useCurrencyInfo(to);

  const options = fromCurrencyInfo ? Object.keys(fromCurrencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const convert = () => {
    setConvertedAmount(amount * fromCurrencyInfo[to]);
  };

  useEffect(() => {}, [fromCurrencyInfo, toCurrencyInfo]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
                border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
