const userBlock = document.querySelector(".username");
const id = document.querySelector(".id");
const img = document.querySelector(".item-image");

// API URL
// api.pricelaz.asherl.com:8080/track

//API WEBSITE
//Change this whenever ngrok changes
track = "https://7e4f-112-209-226-141.ngrok-free.app/track";
// ITEM TO TRACK URL
url =
  "https://www.lazada.com.ph/products/tulip-pork-luncheon-meat-340g-i567226158-s1542274263.html?spm=a2o4l.home.just4u.22.206dca18Xm2gCa&&scm=1007.17519.162103.0&pvid=059e2e41-6887-41ea-95e5-5142637e219c&search=0&clickTrackInfo=pvid%3A059e2e41-6887-41ea-95e5-5142637e219c%3Bchannel_id%3A0000%3Bmt%3Ahot%3Bitem_id%3A567226158%3Bself_ab_id%3A162103%3Bself_app_id%3A7519%3Blayer_buckets%3A955.3629_5437.25236_955.3631_6059.28889%3Bpos%3A22%3B";
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
changeDOM();
