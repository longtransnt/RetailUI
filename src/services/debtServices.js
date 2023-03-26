import axios from "axios";
import { LOCALHOST, DEBT_API } from "constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getAllEmployeeDebt() {
  const debts = await axios.get(
    DEBT_API + "/byAllEmployeeTotal/1",
    axiosConfig
  );
  return debts.data;
}

async function getAllEmployeeDebtNotOnDate(date) {
  const debts = await axios.get(
    DEBT_API + "/allEmployeeNotOnDate/" + date,
    axiosConfig
  );
  return debts.data;
}

async function getAllEmployeeDebtOnDate(date) {
  const debts = await axios.get(
    DEBT_API + "/allEmployeeOnDate/" + date,
    axiosConfig
  );
  return debts.data;
}

async function uploadDebts(list) {
  for (let item in list.debt) {
    let data = {
      employee_id: list.debt[item].employeeId,
      amount: list.debt[item].amount,
      date: list.debt[item].date,
    };
    await axios
      .post(DEBT_API, data, axiosConfig)
      .then((response) => console.log(response.data));
  }
}

async function getDebtsByEmployee(id) {
  const debts = await axios.get(
    DEBT_API + "/byEmployeeTotal/" + id,
    axiosConfig
  );
  return debts.data.rows;
}

async function getEmployeeTotalDebt(id) {
  const debts = await axios.get(DEBT_API + "/byEmployee/" + id, axiosConfig);
  return debts.data.rows;
}
export default {
  getAllEmployeeDebt,
  uploadDebts,
  getAllEmployeeDebtNotOnDate,
  getAllEmployeeDebtOnDate,
};
