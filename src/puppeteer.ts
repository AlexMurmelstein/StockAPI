import puppeteer from "puppeteer";

let main_actual = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const URL = "https://finance.yahoo.com/most-active/";
    await page.goto(URL, { waitUntil: "networkidle2" });
    const scrapedData: any = await page.evaluate(() => {
      Array.from(document.querySelectorAll(".simpTblRow"));
    });
    await browser.close();
    console.log(scrapedData);
    return;
  } catch (e) {
    console.log(e);
  }
};

let main = async () => {
  await main_actual();
};

main();
