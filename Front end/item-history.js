const grid = document.querySelectorAll(".main-grid")[0];
const item = document.querySelectorAll(".containers")[0];
const apiUrl = "https://bb64-112-209-226-141.ngrok-free.app/list";

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

  for (let i = historyList.length - 1; (i) => 0; i--) {
    //clone da item
    console.log(historyList[i]);
    let newItem = item.cloneNode(true);

    //name
    newItem.querySelector(
      ".item-title"
    ).innerText = `${historyList[i].product_name}`;

    //price

    let price = Number(historyList[i].product_price);

    newItem.querySelector(".price span.price").innerText = price;
    // for previous price colors
    if (i > 0) {
      let previousPrice = Number(historyList[i - 1].product_price);
      console.log(i);
      console.log(`${typeof previousPrice}prev:  + ${previousPrice}`);
      console.log(`${typeof price}prev:  + ${price}`);
      console.log("red" + previousPrice < price);
      if (previousPrice < price) {
        newItem.querySelector(".price span.price").classList.add("pricesr");
      } else {
        newItem.querySelector(".price span.price").classList.add("pricesg");
      }
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
      "ngrok-skip-browser-warning": true,
    },
    body: JSON.stringify(item),
  });
  const data = await resp.json();
  return data;
}
