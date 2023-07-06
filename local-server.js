import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { getPrice } from "./local-scraper.js";

import { SendMail } from "./email-demo.js";

let productToBeViewed = "";

const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors({ origin: "*", methods: ["GET", "POST"] })); // Allow requests from the "null" origin

app.use(express.json());
app.listen(PORT, () => console.log(`Server is up on http://localhost:${PORT}`));

//test listener
app.post("/test", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.post("/track", async (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: req.params });
});

// REMINDER {price:"0",image:"missing"} means failed scrape attempt

// CREATE ITEM
//scrape for initial price
app.post("/create", async (req, res) => {
  console.log("post: /CREATE ");
  console.log(req.body);

  if (!req.body.url) {
    res.status(418).send({ message: "URL missing!" });
  } else {
    //THIS IS LOGIC FOR CREATE ITEM

    //check if item is already in db
    let sqlUrl = "http://146.190.85.152:3000/products/historical_prices";
    const itemHistory = await sendItem(sqlUrl, req.body);
    console.log(itemHistory);
    //let latest = itemHistory[0].product_url

    //scrape the item
    /*
      let trackedItem = await getResponse(req);
      console.log(trackedItem);
    */

    //send item to database
    /*
    let sqlUrl = "http://146.190.85.152:3000/products";
    let response = await sendItem(sqlUrl, trackedItem);
    console.log("sending item");
    */

    //put trackedItem in database
    //res.send(response);
  }
});

// GET ITEM LIST
app.get("/list", async (req, res) => {
  console.log("GETTING LIST");
  let sqlUrl = "http://146.190.85.152:3000/products";
  const itemList = await getItem(sqlUrl);
  console.log(itemList);
  res.status(200).send(itemList);
});

//GET HISTORY LIST
app.post("/list", async (req, res) => {
  console.log("GETTING LIST");
  let sqlUrl = "http://146.190.85.152:3000/products/historical_prices";
  const itemHistory = await sendItem(sqlUrl, req.body);
  console.log(itemHistory);
  res.status(200).send(itemHistory);
});

// UPDATE ITEM (scrape all and update)

app.get("/update", async (req, res) => {
  console.log("get: " + req.body);
  //put code to get list of items here
  // get list of items
  //let itemList  =

  //loop through itemList and scrape each item
  //  check for new price and send notif
  res.status(200).send({ message: "wow" });
});

// GET ITEM HISTORY

// DELETE ITEM

//function to GET request the database
async function getItem(apiUrl) {
  let resp = await fetch(apiUrl, {
    headers: {
      // we have this ngrok skip warning so we wont catch the warning page
      "Content-Type": "application/json",
      //REMINDER! Do not use this when not using ngrok servers
      //Will result in CORS when using mobile devices
    },
  });
  const data = await resp.json();
  return data;
}

//function to POST request the database
async function sendItem(apiUrl, item) {
  console.log(item);
  let resp = await fetch(apiUrl, {
    method: "POST",
    headers: {
      // we have this ngrok skip warning so we wont catch the warning page
      "Content-Type": "application/json",
      //REMINDER! Do not use this when not using ngrok servers
      //Will result in CORS when using mobile devices
    },
    body: JSON.stringify(item),
  });
  const data = await resp.json();
  return data;
}

//this function gets the item price
const getResponse = async (req) => {
  let url = req.body.url;
  let itemName = req.body.name;
  let resp = await getPrice(url);

  // get price and change to int
  let itemPrice = Number(resp.price.substring(1).replace(",", ""));

  if (itemPrice === 0) {
    console.log("error scraping: captcha gang");
    return { message: "error scraping: captcha gang" };
  } else {
    let itemImage = resp.image;
    console.log("RESPONSE:");
    console.log(resp);

    return {
      product_name: itemName,
      product_url: url,
      product_price: itemPrice,
      product_image: itemImage,
    };
  }
};
