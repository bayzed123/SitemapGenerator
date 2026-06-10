let data = [];

async function crawl() {
    const url = document.getElementById("url").value;
    const depth = document.getElementById("depth").value;

    const res = await fetch("/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, depth })
    });

    const json = await res.json();
    data = json.data;

    document.getElementById("result").innerHTML =
        data.map(d => `<p>${d.url}</p>`).join("");
}

function download() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "crawl.json";
    a.click();
}
