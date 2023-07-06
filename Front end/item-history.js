const grid = document.querySelectorAll(".main-grid")[0];
const item = document.querySelectorAll(".containers")[0];
const apiUrl = "http://localhost:8080/list";

console.log(grid);
console.log(item);

//sample loop for creating the list

GetHistory();
//remove the template item
item.remove();

async function GetHistory() {
  const queryString = window.location.search.substring(1);
  let url = { product_url: queryString };
  console.log(queryString);
  let historyList = await sendItem(apiUrl, url);

  console.log(historyList);

  for (let i = 0; i < historyList.length; i++) {
    //clone da item
    console.log(historyList[i]);
    let newItem = item.cloneNode(true);

    //name
    newItem.querySelector(
      ".item-title"
    ).innerText = `${historyList[i].product_name}`;

    //price

    let price = historyList[i].product_price;

    newItem.querySelector(".price span.price").innerText = price;
    // for previous price colors
    if (i > 0) {
      console.log(i);
      let previousPrice = historyList[i - 1].product_price;
      console.log(previousPrice);
    }

    //date
    let mydate = new Date(historyList[i].date_inserted);
    // replace first nonspace combination along with whitespace
    let date = mydate.toDateString().replace(/^\S+\s/, "");
    newItem.querySelector("div span.date").innerText = `${date}`;

    //image
    newItem.querySelector(
      ".logo"
    ).style.backgroundImage = `url(${historyList[i].product_image})`;

    //href a
    newItem.querySelector(
      ".link-to-item"
    ).href = `item-history.html?${historyList[i].product_url}`;

    //add the newly created div to the grid
    grid.appendChild(newItem);
  }
}

async function sendItem(apiUrl, item) {
  console.log(item);
  resp = await fetch(apiUrl, {
    method: "POST",
    headers: {
      // we have this ngrok skip warning so we wont catch the warning page
      "Content-Type": "application/json",
      //REMINDER! Do not use this when not using ngrok servers
      //Will result in CORS when using mobile devices
      //"ngrok-skip-browser-warning": true,
    },
    body: JSON.stringify(item),
  });
  const data = await resp.json();
  return data;
}
