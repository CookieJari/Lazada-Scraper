# Lazada-Scraper
This is an app made to track the prices in Lazada. It is an API hosted on your PC that scrapes Lazada for any price increase and decrease. Any change in price sends out an email, which alerts the user of any price change. Unfortunately, user profiles are not yet developed. This app was made for the requirements of our subject: Mobile Application Development.<br> 
This API was hosted using ngrok for the presentation of the system. Currently, it is not open. ( I do not want my pc to be a server )<br>
A sample Front end app also connects to the API in the Front end folders. Connect the endpoints to your API and then simply run index.html<br><br>

The Database is connected to a separate server. Someday I will move it here.<br>
Web scraping can be improved in the future using proxy servers to avoid detection. <br><br>



##Setup:

Follow the setup here<br>
https://www.freecodecamp.org/news/web-scraping-in-javascript-with-puppeteer/<br>

You will need express to handle the APIs<br>
npm install express<br><br>

You will also need nodemailer to handle the emails.<br>
npm install nodemailer<br>



