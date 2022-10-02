"use strict";
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//These 2 were copy-pasted from API's docs
var axios_1 = require("axios");
//BTW, note we have to install ts types with some packages, all kinds of problems
var url_1 = require("url");
//
require("dotenv/config");
//Note above line below: importing without * causes error TS1192:
var pg = require("pg");
var Pool = pg.Pool;
//Tried to use type string|undefined, but it caused a complicated bug
var KEY = process.env.YAHOO_KEY;
var HOST = process.env.YAHOO_HOST;
var PGUSER = process.env.PG_USER;
var PGPASSWORD = process.env.PG_PWD;
var ticker = "googl";
var endpoint = "earnings";
//Axios section
//All these were copy-pasted from API's docs
var encodedParams = new url_1.URLSearchParams();
encodedParams.append("symbol", ticker);
var options = {
    method: "POST",
    url: "https://yahoo-finance97.p.rapidapi.com/".concat(endpoint),
    headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": HOST
    },
    data: encodedParams
};
//Turned then/catch copy-pasted from API docs to async by myself
/////
//This function GETs data from the API, using a changing endpoint
//We will know how to extract the exact data into a const by looking at the console.log()
var callAPI = function (endParam) {
    return __awaiter(this, void 0, void 0, function () {
        var axiosOne, axiosTwo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].request(options)];
                case 1:
                    axiosOne = _a.sent();
                    if (!axiosOne) {
                        console.log("error!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, axiosOne.data];
                case 2:
                    axiosTwo = _a.sent();
                    if (!axiosTwo) {
                        console.log("No data retrieved!");
                        return [2 /*return*/];
                    }
                    console.log("Endpoint: ", endParam);
                    console.log(axiosTwo.data);
                    return [2 /*return*/, axiosTwo.data];
            }
        });
    });
};
// callAPI(endpoint);
////Here we will establish a complex operation to dig the data we need
var earning = function (year) {
    return __awaiter(this, void 0, void 0, function () {
        var data, filterData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, callAPI("earnings")];
                case 1:
                    data = _a.sent();
                    if (!data) {
                        console.log("no data!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, data.filter(function (row) { return row.Year === year; })];
                case 2:
                    filterData = _a.sent();
                    if (!filterData) {
                        console.log("no data!");
                        return [2 /*return*/];
                    }
                    console.log(filterData);
                    return [2 /*return*/, filterData.Earnings];
            }
        });
    });
};
//Linking to postgres, local;
////Note: we could use a Client class, but Pool is more flexible and efficient
////Note 2: two last set to 0 to prevent connection timeout bug
var pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "stockapi",
    user: PGUSER,
    password: PGPASSWORD,
    max: 10,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});
//Here we have a string we may change at will;
var PGquery;
////Creation of table
var create_table = "CREATE TABLE ticker_data (\n  id SERIAL PRIMARY KEY,\n  ticker VARCHAR(30) UNIQUE NOT NULL,\n  earnings DECIMAL,\n  expenditures DECIMAL,\n  market_capital DECIMAL,\n  stock_value_ann DECIMAL\n)";
////Insertion of partial data
var insert_earnings = function (earnings) {
    return "INSERT INTO ticker_data (\n\tticker,\n  earnings\n)\nVALUES (\n\t'aapl',\n  ".concat(earnings, "\n);");
};
//Another note: when I'm not sure about type in complex stuff like this, I'll use any to avoid complications
var pgConnect = function () {
    return __awaiter(this, void 0, void 0, function () {
        var insert, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, callAPI(endpoint)];
                case 1:
                    insert = _a.sent();
                    if (!insert) {
                        console.log("API call failed");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, pool.query(insert_earnings)];
                case 2:
                    results = _a.sent();
                    if (!results) {
                        console.log("No results from pg!");
                        return [2 /*return*/];
                    }
                    console.log(results);
                    return [2 /*return*/];
            }
        });
    });
};
pgConnect();
