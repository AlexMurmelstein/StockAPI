//ALPHA VANTAGE API

const fetch = require("node-fetch");
const env = require("dotenv").config();
const ALPHA = process.env.ALPHA_VANTAGE;

const ticker = "GOOG";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": ALPHA,
    "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
  },
};

fetch(
  `https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=${ticker}&datatype=json&output_size=compact`,
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
