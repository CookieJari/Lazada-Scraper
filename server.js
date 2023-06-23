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

app.get("/tshirt", (req, res) => {
  res.status(200).send(getResponse());
});

app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "WE NEED A LOGO DAMN!" });
  } else
    res.send({
      tshirt: `Shirt with your ${logo} and an ID of ${id}`,
    });
});

var url =
  "https://www.lazada.com.ph/products/newjeans-official-light-stick-i3690489353-s19403705410.html?&search=pdp_same_topselling?spm=a2o4l.pdp_revamp.recommendation_1.3.240655c2oEkoF0&mp=1&scm=1007.16389.286994.0&clickTrackInfo=23a21d76-da1d-487a-9277-a5dcc9119747__3690489353__7757__trigger2i__224806__0.206__0.206__0.0__0.0__0.0__0.206__2__null__null__null__null__null__null____4192.0__0.30939885496183206__5.0__17__2895.0__266572__null__null__null__3650.16544_955.3632__null__13426__null__0.0__0.0________null__null";

function getResponse() {
  var resp = getPrice(url);
  console.log("RESPONSE:");
  console.log(resp);
  return resp;
}
