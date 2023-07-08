const apiUrl = " https://2021-112-209-226-141.ngrok-free.app/create";
testApi = "https://api.github.com/users/cookiejari";

var sub = document.getElementById("sub");
sub.onclick = async function () {
  if (document.getElementById("name").checkValidity()) {
    let name = document.getElementById("name").value;
    if (document.getElementById("link").checkValidity()) {
      let link = document.getElementById("link").value;
      const userInputs = { name: name, url: link };
      console.log(userInputs);
      // put in message screen status
      document.querySelector(".message").innerText = "loading";
      let response = await sendItem(apiUrl, userInputs);
      document.querySelector(".message").innerText = response.message;
      return response;
    } else {
      const linkInput = document.getElementById("link");
      linkInput.placeholder = "URL must be a valid URL";
    }
  } else {
    const nameInput = document.getElementById("name");
    console.log(nameInput);
    nameInput.placeholder = "Name must be filled out";
  }
};

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
