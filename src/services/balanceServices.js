import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { LOCALHOST, BALANCE_API } from "../constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function postBalance(data) {
  const response = await axios.post(BALANCE_API, data, axiosConfig);
  // console.log(balances);
  return response;
}

async function getBalanceByDate(data) {
  const response = await axios.get(BALANCE_API + "/byDate/" + data, axios);
  return response.data;
}

async function getLatestBalance() {
  const balances = await axios.get(BALANCE_API + "/latest/", axiosConfig);
  // console.log(balances);
  return balances.data;
}

export default { getLatestBalance, postBalance, getBalanceByDate };
