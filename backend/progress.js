const fs = require("fs");

let state = {
  status: "idle",
  total: 0,
  crawled: 0,
  current: "",
  logs: []
};

function init(total) {
  state.status = "running";
  state.total = total;
  state.crawled = 0;
  save();
}

function update(url) {
  state.crawled++;
  state.current = url;
  state.logs.push({ url });
  save();
}

function finish() {
  state.status = "done";
  state.current = "";
  save();
}

function save() {
  fs.writeFileSync("output/progress.json", JSON.stringify(state, null, 2));
}

module.exports = { init, update, finish };
