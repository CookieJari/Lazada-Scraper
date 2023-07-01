const userBlock = document.querySelector(".username");
const id = document.querySelector(".id");
const img = document.querySelector(".item-image");

// API URL
// api.pricelaz.asherl.com:8080/track

//API WEBSITE
//Change this whenever ngrok changes
track = "https://fc2c-112-209-221-10.ngrok-free.app/track";
// ITEM TO TRACK URL
url =
  "https://www.lazada.com.ph/products/bcc02tpmeu-bean-to-cup-coffee-machine-with-steam-wand-taupe-i3431186095-s17588624992.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253A%253Bnid%253A3431186095%253Bsrc%253AlazadaInShopSrp%253Brn%253A6283b6347fd01b6b682bb2973b780415%253Bregion%253Aph%253Bsku%253A3431186095_PH%253Bprice%253A51995%253Bclient%253Adesktop%253Bsupplier_id%253A100122871%253Bpromotion_biz%253A%253Basc_category_id%253A22336%253Bitem_id%253A3431186095%253Bsku_id%253A17588624992%253Bshop_id%253A135766&fastshipping=0&freeshipping=1&fs_ab=2&fuse_fs=1&lang=en&location=Metro%20Manila&price=51995&priceCompare=&ratingscore=5.0&request_id=6283b6347fd01b6b682bb2973b780415&review=2&sale=3&search=1&source=search&spm=a2o4l.store_product.list.i77.3ca6c862leUka5&stock=1";
// GITHUB API FOR TEST
testApi = "https://api.github.com/users/cookiejari";
//WE USE POST SO WE CAN PUT A BODY
// The URL of the API we are using = urlAPI
// The URL of the item we are tracking = itemURL
async function getPrice(urlAPI, itemURL) {
  resp = await fetch(urlAPI, {
    method: "POST",
    headers: {
      // we have this ngrok skip warning so we wont catch the warning page
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
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
  img.src = obj.image;
}

//This functions calls the API and responds with price, date, img
async function getMsg(urlAPI) {
  resp = await fetch(urlAPI, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const data = await resp.json();
  return data;
}

async function changeDOMTest() {
  var obj = await getMsg(track);
  console.log(obj);
  userBlock.textContent = obj.message;
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
