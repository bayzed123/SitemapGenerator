const axios = require("axios");
const robotsParser = require("robots-parser");

const cache = {};

async function isAllowedByRobots(url) {
    try {
        const origin = new URL(url).origin;

        if (!cache[origin]) {
            const txt = await axios.get(`${origin}/robots.txt`).then(r => r.data).catch(() => "");
            cache[origin] = robotsParser(`${origin}/robots.txt`, txt);
        }

        return cache[origin].isAllowed(url, "SEO-Crawler");
    } catch {
        return true;
    }
}

module.exports = { isAllowedByRobots };
