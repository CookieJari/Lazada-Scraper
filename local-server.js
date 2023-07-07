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
    let previousPrice;
    //CLEAN UP url
    let link = req.body.url;
    let result;
    if (link.includes("?")) {
      result = link.slice(0, link.indexOf("?"));
    } else {
      result = req.body.url;
    }
    //check if item is already in db
    console.log("trying");
    console.log(result);
    let sqlUrl = "http://146.190.85.152:3000/products/historical_prices";
    let body = { product_url: result };
    const itemHistory = await sendItem(sqlUrl, body);

    // Check if item is already EXISTS
    if ("error" in itemHistory) {
      // IF ITEM DOES NOT EXIST
      console.log(itemHistory);
      console.log("item is NOT yet tracked");
      // Scrape new item
      let trackedItem;
      try {
        trackedItem = await ScrapeItem(result, req.body.name);
      } catch (error) {}
      console.log(trackedItem);
      //check if tracking failed or something
      if (trackedItem === null || trackedItem === undefined) {
        console.log("Failed tracking");
        res.send({ message: "Item creation failed" });
      } else {
        if ("message" in itemHistory) {
          SendMail(
            `Tracking for: ${req.body.name} has FAILED`,
            `The item ${req.body.name} does not have a valid Lazada URL or the app has been spotted by the Lazada Police 🚨. This is the URL that was sent: ${result}`
          );
          res.send({ message: "Item creation failed" });
        } else {
          let createUrl = "http://146.190.85.152:3000/products";
          // Put New Item in DB
          let response = await sendItem(createUrl, trackedItem);
          SendMail(
            `Price change for: ${req.body.name}`,
            `The price for the ${req.body.name} is PHP ${trackedItem.product_price}. Here is the URL to the item: ${result}`
          );
          console.log("Item creation happening");
          res.send({ message: "Item created" });
        }
      }
    }
    //IF ITEM EXISTS
    else {
      console.log(itemHistory);
      previousPrice = Number(itemHistory[0].product_price);
      console.log(typeof previousPrice);
      console.log(previousPrice);

      //scrape the item
      let trackedItem = await ScrapeItem(result, req.body.name);
      // If item is same price
      if (previousPrice === trackedItem.product_price) {
        console.log("this item is already in with same price");
        res.send({ message: "Item has same price" });
      } //item has new price
      else {
        console.log("This is existing item with new price");
        //send item to database
        let createUrl = "http://146.190.85.152:3000/products";
        let response = await sendItem(createUrl, trackedItem);
        console.log("sending item");
        SendMail(
          `Price change for: ${req.body.name}`,
          `The price for the ${req.body.name} is PHP ${trackedItem.product_price}. Here is the URL to the item: ${result}`
        );
        res.send({ message: "Item updated" });
      }
    }
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
// ITS BELOW

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

// ------ CALLS TO THE DATABASE AND SRAPER ------

//function to POST request the database
async function sendItem(apiUrl, item) {
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
const ScrapeItem = async (url, itemName) => {
  let resp = await getPrice(url);

  // get price and change to int
  let itemPrice = Number(resp.price.substring(1).replace(",", ""));

  if (itemPrice === 0) {
    console.log("error scraping: captcha gang");
    return {
      message: "error scraping: captcha gang",
      name: itemName,
      url: url,
    };
  } else {
    let itemImage = resp.image;
    console.log("Scrape Success:");

    return {
      product_name: itemName,
      product_url: url,
      product_price: itemPrice,
      product_image: itemImage,
    };
  }
};

// UPDATE ITEM (scrape all and update)

// ------ SCRAPE EVERY X MINS ------
//This is 5 mins
//const FIVE_MIN = 1000 * 60 * 5;
const FIVE_MIN = 1000 * 60 * 30;

//waitEveryFive();

async function waitEveryFive() {
  const msToNextRounded5Min = FIVE_MIN - (Date.now() % FIVE_MIN);

  //get the item list
  let sqlUrl = "http://146.190.85.152:3000/products";
  const itemList = await getItem(sqlUrl);
  //console.log(itemList);

  //loop through the list
  for (let i = 0; i < itemList.length; i++) {
    const name = itemList[i].product_name;
    const url = itemList[i].product_url;

    let newData;
    try {
      newData = await ScrapeItem(url, name);
    } catch (error) {
      console.log(error);
    }

    console.log("-----ITEM RECIEVED SUCCESS------");
    console.log(newData);

    try {
      if (newData.product_price === undefined) {
        // Code here if scrape FAILS
        console.log("------undefined FAILURE----");
      } else {
        // Code here if scrape SUCEED
        console.log("success");
        let scrapedPrice = Number(newData.product_price);
        let previousPrice = Number(itemList[i].product_price);
        if (scrapedPrice !== previousPrice) {
          //if prices are different do this
          //send email
          SendMail(
            `Price change for: ${name}`,
            `The price for the ${name} has changed it's price to: PHP${scrapedPrice} from a previous price of: PHP${previousPrice}. Here is the item URL: ${url}`
          );
          console.log("PRICE IS DIFFERENT: SENDING ITEM");
          //put price in database
          let sqlUrl = "http://146.190.85.152:3000/products";
          let response = await sendItem(sqlUrl, newData);
          console.log("sending item");
        }
      }
    } catch (error) {
      console.log(e);
    }
  }

  console.log("PRINTING ITEM LIST DONE");
  console.log(`Ayo waiting ${msToNextRounded5Min}ms. till 5 mins.`);

  setTimeout(() => {
    console.log("Its been 5 mins now");
    waitEveryFive();
  }, msToNextRounded5Min);
}
