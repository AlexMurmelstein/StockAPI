"use strict";
//Seems as the most interesting API
//Check docs here:
//https://polygon.io/docs
exports.__esModule = true;
require("dotenv/config");
var POLYGONE = process.env.POLYGONE;
//Now to actually query the API
var ticker1 = "AAPL";
var APIstring = "https://api.polygon.io/v1/open-close/".concat(ticker1, "/2020-10-14?adjusted=true&apiKey=").concat(POLYGONE);
var axios_1 = require("axios");
var options = {
    method: "GET",
    url: APIstring
};
axios_1["default"]
    .request(options)
    .then(function (response) {
    console.log(response.data);
})["catch"](function (error) {
    console.error(error);
});
