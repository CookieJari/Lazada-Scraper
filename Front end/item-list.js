const apiUrl = "http://localhost:8080/list";
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
    newItem.querySelector(
      "div span.prev-price"
    ).innerText = `${itemList[i].previous_price}`;

    //image
    newItem.querySelector(
      ".logo"
    ).style.backgroundImage = `url(${itemList[i].product_image})`;

    //href a
    newItem.querySelector(
      ".link-to-item"
    ).href = `item-history.html?${itemList[i].product_url}`;

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
      //"ngrok-skip-browser-warning": true,
    },
  });
  const data = await resp.json();
  return data;
}
