const fs = require("fs");
const {
  resovle: resolveValidation,
} = require("./../validation/spam-validation");

async function resolveSpam(req, res) {
  try {
    const { error, value } = resolveValidation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.message.replace(/"/g, "") });

    if (value.ticketState !== "CLOSED")
      return res.status(400).json({ message: "ticketState must be CLOSED" });

    fs.readFile(`${__dirname}/../data/reports.json`, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      data = JSON.parse(data);
      let index = data.elements.findIndex((el) => {
        return el.id == req.params.id;
      });
      if (index < 0)
        return res.status(404).json({ message: "Report not exists " });

      data.elements[index].state = value.ticketState;

      fs.writeFile(
        `${__dirname}/../data/reports.json`,
        JSON.stringify(data),
        function writeJSON(err) {
          if (err) return res.status(500).json({ message: err.message });
          return res
            .status(200)
            .json({ message: "Report resolved successfully" });
        }
      );
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = resolveSpam;
