const userBlock = document.querySelector(".username");
const id = document.querySelector(".id");

url = "https://api.github.com/users/cookiejari";

function httpGet(theurl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theurl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var obj = JSON.parse(httpGet(url));

console.log(obj.login);

userBlock.textContent = obj.login;
id.textContent = obj.id;
