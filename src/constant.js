const LOCALHOST = "http://localhost:8080";
const DEPLOYED = "https://retail-mgt-backend.herokuapp.com";
const HOST = DEPLOYED;
const DEBT_API = HOST + "/api/debts";
const EMPLOY_API = HOST + "/employees";
const TRANSACTION_API = HOST + "/api/transactions";
const BALANCE_API = HOST + "/api/balances";
const PRICE_API = HOST + "/api/goldprice";
const LATEST_PRICE = HOST + "/api/goldpricelatest";
const UPDATE_INTERVAL = 600000;

export {
  HOST,
  LATEST_PRICE,
  BALANCE_API,
  TRANSACTION_API,
  EMPLOY_API,
  DEBT_API,
  PRICE_API,
  UPDATE_INTERVAL,
};
