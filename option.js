//Stock and Options Trading Data Provider

const fetch = require("node-fetch");
const env = require("dotenv").config();
const SECRET = process.env.SECRET;
const KEY = process.env.KEY;
const ticker = "msft";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Proxy-Secret": SECRET,
    "X-RapidAPI-Key": KEY,
    "X-RapidAPI-Host": "stock-and-options-trading-data-provider.p.rapidapi.com",
  },
};

fetch(
  `https://stock-and-options-trading-data-provider.p.rapidapi.com/options/${ticker}`,
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
