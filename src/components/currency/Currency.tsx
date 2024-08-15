import { useEffect, useState } from "react";

import Select from "../shared/Select/Select";
import Input from "../shared/Input/Input";
import Button from "../shared/Button/Button";
import Loader from "../loader/Loader";
import Error from "../error/Error";

import { getCurrency, convertCurrency } from "../../api/currencyServiсe";

import { fields } from "./fields";

import "./Currency.css";

export interface CurrencyData {
  id: number;
  name: string;
  short_code: string;
  symbol: string;
  precision?: number;
  subunit?: number;
  symbol_first?: boolean;
  decimal_mark?: string;
  thousands_separator?: string;
}

const Currency = () => {
  // -------------ALL STATES-------------
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allCurrencyData, setAllCurrencyData] = useState<CurrencyData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fromCurrencyShortCode, setFromCurrencyShortCode] =
    useState<string>("CAD");
  const [toCurrencyShortCode, setToCurrencyShortCode] = useState<string>("USD");
  const [amount, setAmount] = useState<string | number>("");
  const [rate, setRate] = useState<string | number>("");
  const [convertedResult, setConvertedResult] = useState<string | number>("");

  // -------------GET ALL CURRENCY DATA-------------
  useEffect(() => {
    async function getAllCurrencyData() {
      try {
        setIsLoading(true);
        const { response } = await getCurrency();
        setAllCurrencyData([...response]);
      } catch (error: any) {
        console.log("Error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getAllCurrencyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------SELECT CURRENCY-------------
  const onFromCurrencyChange = ({ target }) =>
    setFromCurrencyShortCode(target.value);
  const onToCurrencyChange = ({ target }) =>
    setToCurrencyShortCode(target.value);

  // -------------CHANGE AMOUNT-------------
  const onAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // -------------CONVERT CURRENCY-------------
  async function handleSubmit(e) {
    e.preventDefault();
    if (amount === "") {
      alert("Enter amount");
      setAmount("");
      return;
    }
    if (+amount < 0) {
      alert("The number cannot be negative. Enter a positive number.");
      setAmount("");
      return;
    }

    const from = fromCurrencyShortCode;
    const to = toCurrencyShortCode;

    try {
      const data = await convertCurrency({ to, from, amount });
      const { value } = data;
      const exchangeRate = value / Number(amount);
      setRate(Number(exchangeRate.toFixed(4)));
      setConvertedResult(Number(value.toFixed(2)));
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // -------------CLEAR ALL------------
  const onClearAllClick = () => {
    setAmount("");
    setRate("");
    setConvertedResult("");
    setFromCurrencyShortCode("CAD");
    setToCurrencyShortCode("USD");
  };

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className="currency-text">FROM:</p>
        <Select
          options={allCurrencyData}
          onChange={onFromCurrencyChange}
          shortCode={fromCurrencyShortCode}
        />
        <p className="currency-text">TO:</p>
        <Select
          options={allCurrencyData}
          onChange={onToCurrencyChange}
          shortCode={toCurrencyShortCode}
        />
        <br />
        <Input {...fields.amount} value={amount} onChange={onAmountChange} />
        <Button type="submit">Convert</Button>

        {rate && (
          <p className="currency-rate">
            The exchange <b>rate</b>
            <br /> from 1 {fromCurrencyShortCode} to 1 {toCurrencyShortCode} is:{" "}
            <b>{rate}</b>
          </p>
        )}

        <div className="currency-result-box">
          {convertedResult !== "" && (
            <p>
              <span>Result: </span>
              <span>
                {convertedResult} {toCurrencyShortCode}
              </span>
            </p>
          )}
        </div>

        <Button type="button" onBtnClick={onClearAllClick}>
          Clear
        </Button>
      </form>
    </>
  );
};

export default Currency;
