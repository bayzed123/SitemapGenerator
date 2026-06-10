const fs = require("fs");

function generateSitemap(urls) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urls.forEach(u => {
        xml += `
  <url>
    <loc>${u.url}</loc>
    <priority>${u.depth === 0 ? "1.0" : "0.7"}</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    fs.writeFileSync("../output/sitemap.xml", xml);
}

function generateIndex(files) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    files.forEach(f => {
        xml += `
  <sitemap>
    <loc>${f}</loc>
  </sitemap>`;
    });

    xml += `\n</sitemapindex>`;

    fs.writeFileSync("../output/sitemap-index.xml", xml);
}

module.exports = { generateSitemap, generateIndex };
