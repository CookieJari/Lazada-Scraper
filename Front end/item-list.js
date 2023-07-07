const apiUrl = "https://bb64-112-209-226-141.ngrok-free.app/list";
testApi = "https://api.github.com/users/cookiejari";

const grid = document.querySelectorAll(".main-grid")[0];
const item = document.querySelectorAll(".containers")[0];

console.log(grid);
console.log(item);

UpdateList();

//remove the template item
item.remove();

async function UpdateList() {
  const itemList = await sendItem(apiUrl);
  console.log(itemList);
  console.log(typeof itemList);

  for (let i = 0; i < itemList.length; i++) {
    //clone da item
    console.log(itemList[i]);
    let newItem = item.cloneNode(true);

    //name
    newItem.querySelector(
      ".item-title"
    ).innerText = `${itemList[i].product_name}`;

    //price
    newItem.querySelector(
      ".price span.price"
    ).innerText = `${itemList[i].product_price}`;

    //previous price
    let prevPrice = itemList[i].previous_price;
    if (prevPrice === null) {
      newItem.querySelector("div span.prev-price").innerText = `none`;
    } else {
      newItem.querySelector(
        "div span.prev-price"
      ).innerText = `${itemList[i].previous_price}`;
    }

    //image
    newItem.querySelector(
      ".logo"
    ).style.backgroundImage = `url(${itemList[i].product_image})`;

    //href a
    newItem.querySelector(
      ".link-to-item"
    ).href = `item-history.html?${itemList[i].product_url}`;

    let curPrice = Number(itemList[i].previous_price);
    prevPrice = Number(itemList[i].previous_price);
    if (curPrice === null || prevPrice === 0) {
    } else if ((curPrice) => prevPrice) {
      newItem.querySelector(".price span.price").classList.add("pricesg");
    } else newItem.querySelector(".price span.price").classList.add("pricesr");

    //add the newly created div to the grid
    grid.appendChild(newItem);
  }
}

async function sendItem(apiUrl) {
  resp = await fetch(apiUrl, {
    headers: {
      // we have this ngrok skip warning so we wont catch the warning page
      "Content-Type": "application/json",
      //REMINDER! Do not use this when not using ngrok servers
      //Will result in CORS when using mobile devices
      "ngrok-skip-browser-warning": true,
    },
  });
  const data = await resp.json();
  return data;
}
