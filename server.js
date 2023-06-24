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
  res.status(200).send(await getResponse());
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
  "https://www.lazada.com.ph/products/newjeans-1st-ep-new-jeans-bluebook-ver-i3238193427-s16318521607.html?&search=pdp_same_topselling?spm=a2o4l.pdp_revamp.recommendation_1.2.541227af5rPIVN&mp=1&scm=1007.16389.286994.0&clickTrackInfo=71c7693d-5a98-41b0-9235-d43824fae8ef__3238193427__7757__trigger2i__224806__0.304__0.304__0.0__0.0__0.0__0.304__1__null__null__null__null__null__null____2143.0__0.2221185254316379__5.0__61__1667.0__202290,203107,204828,204914,205596,210315,212298,215654,219059,227369,227476,232522,234498,235428,235521,235822,237551,238750,241041,242264,244065,250456,250839,250934,255984,263530,264708,266572,267209,267674,268998,271427,273469,286892__null__null__null__3650.16538_955.3629_3650.16544_955.3632__null__13426__null__0.0__0.0________null__null";

const getResponse = async () => {
  var resp = await getPrice(url);

  console.log("RESPONSE:");
  console.log(resp);
  console.log(resp); // This prints Promise{<pending>}
  return resp;
};
