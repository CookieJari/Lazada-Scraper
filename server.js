import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { getPrice } from "./scraper.js";

const express = require("express");
const app = express();
const PORT = 8080;
const WEB_SERVER = "0.0.0.0";

app.use(express.json());

// API URL
// api.pricelaz.asherl.com:8080/track
app.listen(PORT, WEB_SERVER, () =>
  console.log(`Server is ACTIVE on http://api.pricelaz.asherl.com:${PORT}`)
);

app.get("/track", async (req, res) => {
  console.log("get: " + req.body);
  res.status(200).send({ hello: "wow" });
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
