"use strict";
exports.__esModule = true;
require("dotenv/config");
var KEY = process.env.YAHOO_KEY;
var HOST = process.env.YAHOO_HOST;
var ticker = "AAPL";
var axios_1 = require("axios");
var url_1 = require("url");
var encodedParams = new url_1.URLSearchParams();
encodedParams.append("symbol", ticker);
var options = {
    method: "POST",
    url: "https://yahoo-finance97.p.rapidapi.com/earnings",
    headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": HOST
    },
    data: encodedParams
};
axios_1["default"]
    .request(options)
    .then(function (response) {
    console.log(response.data);
})["catch"](function (error) {
    console.error(error);
});
