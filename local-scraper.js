import puppeteer from "puppeteer";

const getPrice = async (url) => {
  const browser = await puppeteer.launch({
    //true for no browser. False for show browser
    headless: false,
    //Dito lalagay yung path ng browser
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const item = await page.evaluate(() => {
    try {
      const price = document.querySelector(".pdp-price_type_normal").innerText;
      const image = document.querySelector(".gallery-preview-panel__image").src;

      return { price, image };
    } catch (error) {
      console.log(error);
      return { price: "0", image: "missing" };
    }
  });
  //page.close();
  return item;
};

export { getPrice };
