const puppeteer = require("puppeteer");
const fs = require("fs");

function normalize(base, href) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

async function crawl(startUrl) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  const queue = [startUrl];
  const visited = new Set();
  const results = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;

    visited.add(current);

    try {
      await page.goto(current, {
        waitUntil: "networkidle2",
        timeout: 60000
      });

      // IMPORTANT FIX: allow JS + lazy content load
      await autoScroll(page);
      await page.waitForTimeout(1500);

      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("a"))
          .map(a => a.href)
          .filter(Boolean);
      });

      for (let link of links) {
        const normalized = normalize(current, link);

        if (!normalized) continue;

        // keep only SAME DOMAIN (important fix)
        if (!normalized.startsWith(startUrl)) continue;

        if (!visited.has(normalized)) {
          queue.push(normalized);
        }
      }

      results.push(current);

    } catch (e) {
      // ignore broken pages but still continue crawling
    }
  }

  await browser.close();

  fs.writeFileSync(
    "output/links.json",
    JSON.stringify([...new Set(results)], null, 2)
  );

  console.log("✔ Crawl completed:", results.length);
}

module.exports = { crawl };

if (require.main === module) {
  crawl(process.argv[2]);
}