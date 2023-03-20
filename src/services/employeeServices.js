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

async function addEmployee(data) {
  console.log(data);
  await axios
    .post(EMPLOY_API, data, axiosConfig)
    .then((response) => console.log(response.data));
}

export default { addEmployee };
