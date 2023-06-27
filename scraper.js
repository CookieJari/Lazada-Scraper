import puppeteer from "puppeteer";

const getPrice = async (url) => {
  const browser = await puppeteer.launch({
    //Dito lalagay yung path ng browser
    executablePath: "/snap/bin/chromium",
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const price = await page.evaluate(() => {
    const price = document.querySelector(".pdp-price_type_normal").innerText;

    return { price };
  });

  console.log(price);
  page.close();
  return price;
};

export { getPrice };
