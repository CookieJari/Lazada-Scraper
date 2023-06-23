const userBlock = document.querySelector(".username");
const id = document.querySelector(".id");

url = "https://api.github.com/users/cookiejari";
tshirt = "http://localhost:8080/tshirt";

function httpGet(theurl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theurl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var obj = JSON.parse(httpGet(tshirt));

console.log(obj);

userBlock.textContent = obj.tshirt;
id.textContent = obj.size;
