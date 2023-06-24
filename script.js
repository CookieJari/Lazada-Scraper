const userBlock = document.querySelector(".username");
const id = document.querySelector(".id");

track = "http://localhost:8080/track/";

function httpGet(theurl, trackingUrl) {
  var body = { message: "wow", url: trackingUrl };

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theurl, true);
  xmlHttp.send(null);
  console.log(body);
  return xmlHttp.responseText;
}
url =
  "https://www.lazada.com.ph/products/ndonhand-twice-official-candyfan-z-i3047510590-s15018676998.html?&search=pdp_v2v?spm=a2o4l.pdp_revamp.recommendation_2.12.71884faaCGWoQM&mp=1&scm=1007.16389.286994.0&clickTrackInfo=53d43af7-418e-4f4b-a8e4-7c8863a99112__3047510590__5509__trigger2i__287002__0.076__0.076__0.0__0.0__0.0__0.076__11__null__null__null__null__null__null____3767.0__0.0__0.0__0__3767.0__255084,255127,255313__null__null__null__3650.16544_955.3632__null__32104__null__0.0__0.0________null__null__0";
var obj = JSON.parse(httpGet(track, url));

console.log(obj);

userBlock.textContent = obj.price;
id.textContent = obj.time;
