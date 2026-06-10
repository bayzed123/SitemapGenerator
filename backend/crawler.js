const axios = require("axios");
const cheerio = require("cheerio");
const Queue = require("./queue");
const { isAllowedByRobots } = require("./robots");

let visited = new Set();

// Blog detection
function isBlog(url) {
    return (
        url.includes("/blog") ||
        url.includes("/news") ||
        url.includes("/article") ||
        url.includes("/post") ||
        url.includes("/category")
    );
}

// normalize URL
function normalize(base, href) {
    try {
        return new URL(href, base).href;
    } catch {
        return null;
    }
}

async function crawlWebsite(startUrl, maxDepth = 4) {
    visited = new Set();
    const queue = new Queue();
    const results = [];

    queue.enqueue({ url: startUrl, depth: 0 });

    while (!queue.isEmpty()) {
        const { url, depth } = queue.dequeue();

        if (visited.has(url)) continue;
        if (depth > maxDepth) continue;

        visited.add(url);

        if (!(await isAllowedByRobots(url))) continue;

        try {
            const res = await axios.get(url);
            const $ = cheerio.load(res.data);

            results.push({ url, depth });

            $("a").each((_, el) => {
                let href = $(el).attr("href");
                if (!href) return;

                const full = normalize(url, href);
                if (!full) return;

                if (!full.startsWith(new URL(startUrl).origin)) return;

                if (visited.has(full)) return;

                // BLOG PRIORITY BOOST
                const nextDepth = isBlog(full) ? depth + 1 : depth + 2;

                queue.enqueue({
                    url: full,
                    depth: nextDepth
                });
            });

        } catch (err) {
            // ignore broken pages
        }
    }

    return results;
}

module.exports = { crawlWebsite };
