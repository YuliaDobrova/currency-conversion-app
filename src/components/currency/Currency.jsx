import { useEffect, useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { getCurrency } from "../../api/currencyServise";
import styles from "./Currency.module.css";

const Currency = () => {
  const CURRENCY_API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;
  const CURRENCY_API_URL = process.env.REACT_APP_CURRENCY_API_URL;

  const [isLoading, setIsLoading] = useState(false);
  const [allCurrencyData, setAllCurrencyData] = useState([]);
  const [fromCurrencyShortCode, setFromCurrencyShortCode] = useState("CAD");
  const [toCurrencyShortCode, setToCurrencyShortCode] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedResult, setConvertedResult] = useState("");

  // -------------GET ALL CURRENCY DATA-------------
  async function getAllCurrencyData() {
    try {
      setIsLoading(true);
      const { response } = await getCurrency();
      setAllCurrencyData([...response]);
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("useEffect-allCurrencyData", allCurrencyData);
    getAllCurrencyData();
  }, []);

  // -------------SELECT CURRENCY-------------
  const onFromCurrencyChange = (event) => {
    const chosenCurrency = allCurrencyData.filter(
      (cur) => cur.name === event.target.value
    );
    setFromCurrencyShortCode(chosenCurrency[0].short_code);
  };

  const onToCurrencyChange = (event) => {
    const chosenCurrency = allCurrencyData.filter(
      (cur) => cur.name === event.target.value
    );
    setToCurrencyShortCode(chosenCurrency[0].short_code);
  };

  // -------------CHANGE AMOUNT-------------
  const onInputChange = (event) => {
    setAmount(event.target.value);
  };

  // -------------CONVERT CURRENCY-------------
  async function convertCurrency() {
    // const fromCurrency = "USD";
    // const toCurrency = "EUR";
    // const amount = 100;
    const fromCurrency = fromCurrencyShortCode;
    const toCurrency = toCurrencyShortCode;
    const CONVERT_URL = `${CURRENCY_API_URL}convert?api_key=${CURRENCY_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

    try {
      if (amount === "") {
        alert("Enter amount");
      }
      if (amount < 0) {
        alert("The number cannot be negative. Enter a positive number.");
      }
      const response = await axios.get(CONVERT_URL);
      console.log("response.data", response.data);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = response.data.value;
      console.log("result", result);
      const roundedResult = Number(result.toFixed(2));
      setConvertedResult(roundedResult);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  const onExchangeBtnClick = () => {
    convertCurrency();
  };

  // -------------CLEAR-ALL------------
  const onClearAllClick = () => {
    setAmount("");
    setConvertedResult("");
    setFromCurrencyShortCode("CAD");
    setToCurrencyShortCode("USD");
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loader}>
          <Bars
            height="50"
            width="50"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <form>
        <select
          title="fromCurrency"
          id="fromCurrency"
          onChange={onFromCurrencyChange}
        >
          {allCurrencyData?.map((el) =>
            el.short_code === "CAD" ? (
              <option value={el.name} key={el.id} selected>
                {el.name} {el.symbol}
              </option>
            ) : (
              <option value={el.name} key={el.id}>
                {el.name} {el.symbol}
              </option>
            )
          )}
        </select>
        <label>TO</label>
        <select
          title="toCurrency"
          id="toCurrency"
          onChange={onToCurrencyChange}
        >
          {allCurrencyData?.map((el) =>
            el.short_code === "USD" ? (
              <option value={el.name} key={el.id} selected>
                {el.name} {el.symbol}
              </option>
            ) : (
              <option value={el.name} key={el.id}>
                {el.name} {el.symbol}
              </option>
            )
          )}
        </select>
        <br />
        <div>
          <label htmlFor="amount">
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={onInputChange}
            />
          </label>
          <span id="symbol"></span>
        </div>

        <button type="button" onClick={onExchangeBtnClick}>
          Convert
        </button>
        <div className={styles.result_box}>
          <p>
            <span>Result: </span>
            <span>{convertedResult}</span>
          </p>
        </div>
        <button type="button" onClick={onClearAllClick}>
          Clear
        </button>
      </form>
    </>
  );
};

export default Currency;
