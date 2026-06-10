function startCrawl() {
  const url = document.getElementById("url").value;

  document.getElementById("status").innerText = "Crawling started...";

  fetch("https://api.github.com/repos/bayzed123/SitemapGenerator/actions/workflows/crawler.yml/dispatches", {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": "Bearer YOUR_TOKEN"
    },
    body: JSON.stringify({
      ref: "main",
      inputs: { target_url: url }
    })
  });
}

function downloadLinks() {
  window.open("../output/links.json");
}

function downloadSitemap() {
  window.open("../output/sitemap.xml");
}
