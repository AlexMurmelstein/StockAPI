import "dotenv/config";
const KEY: any = process.env.YAHOO_KEY;
const HOST: any = process.env.YAHOO_HOST;
const ticker: string = "AAPL";

import axios from "axios";
import { URLSearchParams } from "url";

const encodedParams: URLSearchParams = new URLSearchParams();
encodedParams.append("symbol", ticker);

const options = {
  method: "POST",
  url: "https://yahoo-finance97.p.rapidapi.com/earnings",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": KEY,
    "X-RapidAPI-Host": HOST,
  },
  data: encodedParams,
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
