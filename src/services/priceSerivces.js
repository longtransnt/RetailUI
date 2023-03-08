import axios from "axios";
import { LOCALHOST, PRICE_API } from "../constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getLatestPrice() {
  const price = await axios.get(PRICE_API + "/allcategory/1", axiosConfig);
  //   console.log(price);
  return price.data;
}

async function addPrice(data, category) {
  let req_data = {
    price: data.price,
    sellprice: data.sellprice,
    categoryid: Number(category) + 1,
  };

  await axios.post(PRICE_API, req_data, axiosConfig);
}

export default { getLatestPrice, addPrice };
