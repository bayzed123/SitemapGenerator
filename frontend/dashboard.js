async function updateDashboard() {
  try {
    const res = await fetch("../output/progress.json");
    const data = await res.json();

    document.getElementById("status").innerText = data.status;

    const percent = data.total
      ? Math.round((data.crawled / data.total) * 100)
      : 0;

    document.getElementById("bar").value = percent;

    document.getElementById("current").innerText =
      "🔍 Crawling: " + (data.current || "-");

    document.getElementById("links").innerText =
      (data.logs || []).map(l => l.url).join("\n");

  } catch (e) {}
}

setInterval(updateDashboard, 1500);
