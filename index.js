import puppeteer from "puppeteer";

const getPrice = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.lazada.com.ph/products/pre-order-twice-official-light-stick-candybong-infinity-ver3-i3663120116-s19174945122.html?",
    {
      waitUntil: "networkidle2",
    }
  );

  const price = await page.evaluate(() => {
    const price = document.querySelector(".pdp-price_type_normal").innerText;

    return { price };
  });

  console.log(price);
  await browser.close();
  return price;
};

const itemPrice = getPrice();
