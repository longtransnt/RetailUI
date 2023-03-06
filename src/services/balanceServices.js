import axios from "axios";
import { LOCALHOST, BALANCE_API } from "../constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getLatestBalance() {
  const balances = await axios.get(BALANCE_API + "/latest/", axiosConfig);
  // console.log(balances);
  return balances.data;
}

export default { getLatestBalance };
