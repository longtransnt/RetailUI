import axios from "axios";
import { LOCALHOST, TRANSACTION_API } from "constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getAllTransactions() {
  const transactions = await axios.get(TRANSACTION_API, axiosConfig);
  return transactions.data.rows;
}

async function getAllTransactionsByType(type) {
  const transactions = await axios.get(
    TRANSACTION_API + "/byTypeTotal/" + type,
    axiosConfig
  );
  return transactions.data.rows;
}

export default {};
