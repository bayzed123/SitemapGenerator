const puppeteer = require("puppeteer");
const fs = require("fs");
const progress = require("./progress");

async function crawl(startUrl, maxPages = 500) {

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  let queue = [startUrl];
  let visited = new Set();
  let results = [];

  progress.init(maxPages);

  while (queue.length && visited.size < maxPages) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;

    visited.add(url);
    progress.update(url);

    try {
      await page.goto(url, { waitUntil: "networkidle2" });

      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a"))
          .map(a => a.href)
      );

      results.push(url);

      for (let l of links) {
        if (l && !visited.has(l)) queue.push(l);
      }

    } catch (e) {
      results.push(url);
    }
  }

  await browser.close();

  progress.finish();

  fs.writeFileSync("output/links.json", JSON.stringify(results, null, 2));
}

module.exports = { crawl };

if (require.main === module) {
  const url = process.argv[2];
  crawl(url);
}
