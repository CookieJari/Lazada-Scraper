import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { getPrice } from "./local-scraper.js";

import { SendMail } from "./email-demo.js";

const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors({ origin: "*", methods: ["GET", "POST"] })); // Allow requests from the "null" origin

app.use(express.json());
app.listen(PORT, () => console.log(`Server is up on http://localhost:${PORT}`));

app.get("/track", async (req, res) => {
  console.log("get: " + req.body);
  res.status(200).send({ message: "wow" });
});

app.post("/track", async (req, res) => {
  console.log("post: " + req.body);
  if (!req.body.url) {
    res.status(418).send({ message: "WE NEED A LOGO DAMN!" });
  } else res.send(await getResponse(req));
});

// REMINDER {price:"0",image:"missing"} means failed scrape attempt

// CREATE ITEM
//scrape for initial price
app.post("/create", async (req, res) => {
  console.log("post: " + req.body);
  if (!req.body.url) {
    res.status(418).send({ message: "URL missing!" });
  } else {
    let trackedItem = await getResponse(req);
    //put trackedItem in database
    res.send(trackedItem);
  }
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

//this function gets the item price
const getResponse = async (req) => {
  let url = req.body.url;
  let resp = await getPrice(url);
  let itemPrice = resp.price;
  let itemImage = resp.image;
  console.log("RESPONSE:");
  console.log(resp);
  const date = new Date();
  // calling a constructor, can use other methods to extract info from returned value
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${month}-${day}-${year}`;

  console.log(fullDate);
  return { price: itemPrice, date: fullDate, image: itemImage };
};
