//https://rapidapi.com/asepscareer/api/yahoo-finance97/
//Remember: enough with APIs, only programming now.

//These 2 were copy-pasted from API's docs
import axios from "axios";
import { URLSearchParams } from "url";
//
import "dotenv/config";
//BTW, note we have to install ts types with some packages, all kinds of problems
import pg from "pg";
const { Pool } = pg;
//Tried to use type string|undefined, but it caused a complicated bug
const KEY: any = process.env.YAHOO_KEY;
const HOST: any = process.env.YAHOO_HOST;
const PGUSER: any = process.env.PG_USER;
const PGPASSWORD: any = process.env.PG_PWD;
const ticker: string = "AAPL";
const endpoint = "earnings";

//Axios section

//All these were copy-pasted from API's docs
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
/////
//This function GETs data from the API, using a changing endpoint
//We will know how to extract the exact data into a const by looking at the console.log()
const callAPI = async function (endParam: string) {
  const axiosOne = await axios.request(options);
  if (!axiosOne) {
    console.error("error!");
    return;
  }
  const axiosTwo = await axiosOne.data;
  if (!axiosTwo) {
    console.error("No data retrieved!");
    return;
  }
  console.log("Endpoint: ", endParam);
  console.log(axiosTwo.data);
  return axiosTwo.data;
};

callAPI(endpoint);

////Here we will establish a complex operation to dig the data we need
const earning = async function (year: Number) {
  const data = await callAPI("earnings");
  if (!data) {
    console.error("no data!");
    return;
  }
  //Again issues with types, when tried Object it gave me trouble
  const filterData = await data.filter((row: any) => row.Year === year);
  if (!filterData) {
    console.error("no data!");
    return;
  }
  console.log(filterData);
  return filterData.Earnings;
};

// earning(2021);

//Linking to postgres, local;
////Note: we could use a Client class, but Pool is more flexible and efficient
////Note 2: two last set to 0 to prevent connection timeout bug
const pool: any = new Pool({
  host: "localhost",
  port: 5432,
  database: "stockapi",
  user: PGUSER,
  password: PGPASSWORD,
  max: 10,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

//Here we have a string we may change at will;
let PGquery: string;
////Creation of table
const create_table: string = `CREATE TABLE ticker_data (
  id SERIAL PRIMARY KEY,
  ticker VARCHAR(30) UNIQUE NOT NULL,
  earnings DECIMAL,
  expenditures DECIMAL,
  market_capital DECIMAL,
  stock_value_ann DECIMAL
)`;
////Insertion of partial data
const insert_earnings = `INSERT INTO ticker_data (
	ticker,
  earnings
)
VALUES (
	'googl',
  94680000000
);`;

//Another note: when I'm not sure about type in complex stuff like this, I'll use any to avoid complications
const pgConnect = async function () {
  const results = await pool.query(insert_earnings);
  if (!results) {
    console.error("No results from pg!");
    return;
  }
  console.log(results);
  return;
};

pgConnect();
