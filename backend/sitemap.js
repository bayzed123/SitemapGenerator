const fs = require("fs");

function generate() {
  const links = JSON.parse(fs.readFileSync("output/links.json"));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  links.forEach(url => {
    xml += `
  <url>
    <loc>${url}</loc>
  </url>`;
  });

  xml += `\n</urlset>`;

  fs.writeFileSync("output/sitemap.xml", xml);
}

module.exports = { generate };

if (require.main === module) {
  generate();
}
