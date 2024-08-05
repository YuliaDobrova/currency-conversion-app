import axios from "axios";

const CURRENCY_API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;
const CURRENCY_API_URL = process.env.REACT_APP_CURRENCY_API_URL;

export const getCurrency = async () => {
  try {
    const response = await axios.get(
      `${CURRENCY_API_URL}currencies?api_key=${CURRENCY_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
