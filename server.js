import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { getPrice } from "./scraper.js";

const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server is ACTIVE on http://localhost:${PORT}`)
);

app.get("/track", async (req, res) => {
  res.status(200).send(await getResponse(req));
});

app.post("/tshirt/:id", (req, res) => {
  //"/tshirt/:id" FOR THIS
  //const { id } = req.params;
  //const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "WE NEED A LOGO DAMN!" });
  } else
    res.send({
      tshirt: `Shirt with your ${logo} and an ID of ${id}`,
    });
});

const getResponse = async (req) => {
  var url = req.body.url;
  console.log("url: " + url);
  var resp = await getPrice(url);
  //  var resp = { price: "3200" };
  var itemPrice = resp.price;
  console.log("RESPONSE:");
  console.log(resp);
  return { price: itemPrice, date: Date() };
};
