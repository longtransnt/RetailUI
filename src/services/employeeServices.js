import axios from "axios";
import { LOCALHOST, EMPLOY_API } from "constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getAllEmployees() {
  const employees = await axios.get(EMPLOY_API, axiosConfig);
  return employees.data.rows;
}

export default {};
