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
import "dotenv/config";
//Tried to use type string|undefined, but it caused a complicated bug
const KEY = process.env.YAHOO_KEY;
const HOST = process.env.YAHOO_HOST;
const ticker = "AAPL";
const endpoint = "cashflow";
//All these were copy-pasted from API's docs
import axios from "axios";
import { URLSearchParams } from "url";
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
//# sourceMappingURL=yahoo.js.map