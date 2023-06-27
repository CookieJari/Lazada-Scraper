import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { getPrice } from "./local-scraper.js";

const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors({ origin: "*" })); // Allow requests from the "null" origin

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

//this function gets the item price
const getResponse = async (req) => {
  var url = req.body.url;
  var resp = await getPrice(url);
  var itemPrice = resp.price;
  console.log("RESPONSE:");
  console.log(resp);
  return { price: itemPrice, date: Date() };
};