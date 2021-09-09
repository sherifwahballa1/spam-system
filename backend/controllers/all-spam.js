const fs = require("fs");

function getAllSpamReports(req, res) {
  try {
    fs.readFile(`${__dirname}/../data/reports.json`, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      data = JSON.parse(data);
      let reports = data.elements.filter((el) => {
        return el.state !== "CLOSED";
      });
      return res.status(200).json({ reports, count: reports.length });
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = getAllSpamReports;
