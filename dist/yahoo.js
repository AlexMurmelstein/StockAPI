//https://rapidapi.com/asepscareer/api/yahoo-finance97/
//Remember: enough with APIs, only programming now.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//These 2 were copy-pasted from API's docs
import axios from "axios";
import { URLSearchParams } from "url";
//
import "dotenv/config";
//BTW, note we have to install ts types with some packages, all kinds of problems
import pg from "pg";
const { Pool } = pg;
//Tried to use type string|undefined, but it caused a complicated bug
const KEY = process.env.YAHOO_KEY;
const HOST = process.env.YAHOO_HOST;
const PGUSER = process.env.PG_USER;
const PGPASSWORD = process.env.PG_PWD;
const ticker = "AAPL";
const endpoint = "earnings";
//Axios section
//All these were copy-pasted from API's docs
const encodedParams = new URLSearchParams();
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
const callAPI = function (endParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const axiosOne = yield axios.request(options);
        if (!axiosOne) {
            console.log("error!");
            return;
        }
        const axiosTwo = yield axiosOne.data;
        if (!axiosTwo) {
            console.log("No data retrieved!");
            return;
        }
        console.log("Endpoint: ", endParam);
        console.log(axiosTwo.data);
        return axiosTwo.data;
    });
};
callAPI(endpoint);
////Here we will establish a complex operation to dig the data we need
const earning = function (year) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield callAPI("earnings");
        if (!data) {
            console.log("no data!");
            return;
        }
        //Again issues with types, when tried Object it gave me trouble
        const filterData = yield data.filter((row) => row.Year === year);
        if (!filterData) {
            console.log("no data!");
            return;
        }
        console.log(filterData);
        return filterData.Earnings;
    });
};
// earning(2021);
//Linking to postgres, local;
////Note: we could use a Client class, but Pool is more flexible and efficient
////Note 2: two last set to 0 to prevent connection timeout bug
const pool = new Pool({
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
let PGquery;
////Creation of table
const create_table = `CREATE TABLE ticker_data (
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
	'aapl',
  94680000000
);`;
//Another note: when I'm not sure about type in complex stuff like this, I'll use any to avoid complications
const pgConnect = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield pool.query(insert_earnings);
        if (!results) {
            console.log("No results from pg!");
            return;
        }
        console.log(results);
        return;
    });
};
pgConnect();
//# sourceMappingURL=yahoo.js.map