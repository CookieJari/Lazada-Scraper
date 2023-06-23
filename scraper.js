import puppeteer from "puppeteer";

const getPrice = async (url) => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const price = await page.evaluate(() => {
    const price = document.querySelector(".pdp-price_type_normal").innerText;

    return { price, message: "wow" };
  });

  console.log(price);
  page.close();
  return price;
};

export { getPrice };
