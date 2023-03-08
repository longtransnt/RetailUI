const HOST = "http://localhost:8080";
const DEBT_API = HOST + "/api/debts";
const EMPLOY_API = HOST + "/api/employees";
const TRANSACTION_API = HOST + "/api/transactions";
const BALANCE_API = HOST + "/api/balances";
const PRICE_API = HOST + "/api/goldprice";
const UPDATE_INTERVAL = 60 * 1000; // 60S

export {
  HOST,
  BALANCE_API,
  TRANSACTION_API,
  EMPLOY_API,
  DEBT_API,
  PRICE_API,
  UPDATE_INTERVAL,
};
