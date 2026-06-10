const express = require("express");
const app = express();
const path = require("path");
const { crawlWebsite } = require("./crawler");
const { generateSitemap, generateIndex } = require("./sitemap");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

let latest = [];

app.post("/crawl", async (req, res) => {
    const { url, depth } = req.body;

    try {
        const data = await crawlWebsite(url, depth || 4);
        latest = data;

        generateSitemap(data);
        generateIndex([`${url}/sitemap.xml`]);

        res.json({
            success: true,
            total: data.length,
            data
        });

    } catch (e) {
        res.json({ success: false, error: e.message });
    }
});

app.get("/export", (req, res) => {
    res.json(latest);
});

app.listen(3000, () => {
    console.log("🚀 Server running: http://localhost:3000");
});
