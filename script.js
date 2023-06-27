const userBlock = document.querySelector(".username");
const id = document.querySelector(".id");

// API URL
// api.pricelaz.asherl.com:8080/track

//API WEBSITE
track = "http://localhost:8080/track";
// ITEM TO TRACK URL
url =
  "https://www.lazada.com.ph/products/ndonhand-twice-official-candyfan-z-i3047510590-s15018676998.html?&search=pdp_v2v?spm=a2o4l.pdp_revamp.recommendation_2.12.71884faaCGWoQM&mp=1&scm=1007.16389.286994.0&clickTrackInfo=53d43af7-418e-4f4b-a8e4-7c8863a99112__3047510590__5509__trigger2i__287002__0.076__0.076__0.0__0.0__0.0__0.076__11__null__null__null__null__null__null____3767.0__0.0__0.0__0__3767.0__255084,255127,255313__null__null__null__3650.16544_955.3632__null__32104__null__0.0__0.0________null__null__0";

// GITHUB API FOR TEST
testApi = "https://api.github.com/users/cookiejari";
//WE USE POST SO WE CAN PUT A BODY
// The URL of the API we are using = urlAPI
// The URL of the item we are tracking = itemURL
async function getPrice(urlAPI, itemURL) {
  resp = await fetch(urlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "wow", url: itemURL }),
  });
  const data = await resp.json();
  return data;
}

//making an asnyc function so we can change the DOM based on the response
//If we dont use an asnyc function here Response will be pending
async function changeDOM() {
  var obj = await getPrice(track, url);
  console.log(obj);
  userBlock.textContent = obj.price;
  id.textContent = obj.time;
}

async function getMsg(urlAPI) {
  resp = await fetch(urlAPI);
  const data = await resp.json();
  return data;
}

async function changeDOMTest() {
  var obj = await getMsg(track);
  console.log(obj);
  userBlock.textContent = obj.hello;
}

async function testGit() {
  var test = await getMsg(testApi);
  console.log(test);
  id.textContent = test.login;
}

// TEST FUNCTIONS
//testGit();
//changeDOMTest();

// REAL FUNCTION ONE
//changeDOM();
