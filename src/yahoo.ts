//https://rapidapi.com/asepscareer/api/yahoo-finance97/
//Remember: enough with APIs, only programming now.

import "dotenv/config";
//Tried to use type string|undefined, but it caused a complicated bug
const KEY: any = process.env.YAHOO_KEY;
const HOST: any = process.env.YAHOO_HOST;
const ticker: string = "AAPL";
const endpoint = "cashflow";

//All these were copy-pasted from API's docs
import axios from "axios";
import { URLSearchParams } from "url";

const encodedParams: URLSearchParams = new URLSearchParams();
encodedParams.append("symbol", ticker);

const options = {
  method: "POST",
  url: `https://yahoo-finance97.p.rapidapi.com/${endpoint}`,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": KEY,
    "X-RapidAPI-Host": HOST,
  },
  data: encodedParams,
};

//Turned then/catch copy-pasted from API docs to async by myself
const callAPI = async function (endParam: string) {
  const axiosOne = await axios.request(options);
  if (!axiosOne) {
    console.log("error!");
    return;
  }
  const axiosTwo = await axiosOne.data;
  if (!axiosTwo) {
    console.log("No data retrieved!");
    return;
  }
  console.log("Endpoint: ", endParam);
  console.log(axiosTwo.data);
  return axiosTwo.data;
};

callAPI(endpoint);
