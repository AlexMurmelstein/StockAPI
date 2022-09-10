//Seems as the most interesting API
//Check docs here:
//https://polygon.io/docs

import "dotenv/config";
const POLYGONE = process.env.POLYGONE;

//Now to actually query the API
const ticker1: string = "AAPL";
const APIstring: string = `https://api.polygon.io/v1/open-close/${ticker1}/2020-10-14?adjusted=true&apiKey=${POLYGONE}`;

import axios from "axios";

const options = {
  method: "GET",
  url: APIstring,
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
