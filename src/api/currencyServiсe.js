import axios from "axios";

const api_key = import.meta.env.VITE_CURRENCY_API_KEY;
const baseURL = import.meta.env.VITE_CURRENCY_API_URL;

const currencyInstance = axios.create({
  baseURL,
  params: {
    api_key,
  }
});

export const getCurrency = async () => {
  const { data } = await currencyInstance.get(
    "/currencies"
  );
  return data;
};

export const convertCurrency = async ({ to, from, amount }) => {
  const { data } = await currencyInstance.get("/convert", {
    params: {
      to,
      from,
      amount,
    }
  });

  return data;
}