const fs = require("fs");

// Example static URLs (replace with crawler output later)
const urls = [
  "https://example.com/",
  "https://example.com/blog",
  "https://example.com/contact"
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(url => {
    xml += `
  <url>
    <loc>${url}</loc>
  </url>`;
});

xml += `\n</urlset>`;

// Ensure output folder exists
if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
}

fs.writeFileSync("output/sitemap.xml", xml);

console.log("✅ Sitemap generated successfully");
