import { useEffect, useState } from "react";
import axios from "axios";

import Select from "../shared/Select/Select";
import Input from "../shared/Input/Input";
import Button from "../shared/Button/Button";
import Loader from "../loader/Loader";

import { getCurrency, convertCurrency } from "../../api/currencyServiсe";

import { fields } from "./fields";

import styles from "./Currency.module.css";

const Currency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allCurrencyData, setAllCurrencyData] = useState([]);
  const [error, setError] = useState(null);
  const [fromCurrencyShortCode, setFromCurrencyShortCode] = useState("CAD");
  const [toCurrencyShortCode, setToCurrencyShortCode] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedResult, setConvertedResult] = useState("");

  // -------------GET ALL CURRENCY DATA-------------

  useEffect(() => {
    async function getAllCurrencyData() {
      try {
        setIsLoading(true);
        const { response } = await getCurrency();
        setAllCurrencyData([...response]);
      } catch (error) {
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
    if (amount < 0) {
      alert("The number cannot be negative. Enter a positive number.");
      setAmount("");
      return;
    }

    const from = fromCurrencyShortCode;
    const to = toCurrencyShortCode;

    try {
      const data = await convertCurrency({ to, from, amount });
      const { value } = data;
      const roundedResult = Number(value.toFixed(2));
      setConvertedResult(roundedResult);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // -------------CLEAR-ALL------------
  const onClearAllClick = () => {
    setAmount("");
    setConvertedResult("");
    setFromCurrencyShortCode("CAD");
    setToCurrencyShortCode("USD");
  };

  if (error) {
    return <p>Techinal error. Please enter later.</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className={styles.text}>FROM:</p>
        <Select
          options={allCurrencyData}
          onChange={onFromCurrencyChange}
          shortCode={fromCurrencyShortCode}
        />
        <p className={styles.text}>TO:</p>
        <Select
          options={allCurrencyData}
          onChange={onToCurrencyChange}
          shortCode={toCurrencyShortCode}
        />
        <br />
        <Input {...fields.amount} value={amount} onChange={onAmountChange} />
        <Button>Convert</Button>
        <div className={styles.result_box}>
          <p>
            <span>Result: </span>
            <span>{convertedResult}</span>
          </p>
        </div>
        <Button type="button" onBtnClick={onClearAllClick}>
          Clear
        </Button>
      </form>
    </>
  );
};

export default Currency;
