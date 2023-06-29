const userBlock = document.querySelector(".username");
const id = document.querySelector(".id");

// API URL
// api.pricelaz.asherl.com:8080/track

//API WEBSITE
//Change this whenever ngrok changes
track = "http://localhost:8080/track";
// ITEM TO TRACK URL
url =
  "https://www.lazada.com.ph/products/alfa43k-60cm-free-standing-oven-54l-capacity-fan-assisted-i2111841001-s9428532224.html?spm=a2o4l.10450891.0.0.1cd66b2dfR8qx9&search=store&mp=3";
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
}

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
