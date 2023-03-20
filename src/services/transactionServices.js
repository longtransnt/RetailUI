import axios from "axios";
import { LOCALHOST, TRANSACTION_API } from "constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function postTransaction(data, type) {
  let req_data = {
    amount: data.real_value,
    date: data.date,
    context: data.content,
    type: type,
  };
  const transaction = axios.post(TRANSACTION_API, req_data, axiosConfig);
  return transaction;
}

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

export default { postTransaction };
