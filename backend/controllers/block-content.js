const fs = require("fs");

function blockContent(req, res) {
  try {
    fs.readFile(
      `${__dirname}/../data/blockedList.json`,
      "utf8",
      (err, data) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        data = JSON.parse(data);
        let index = data.blocked.findIndex((el) => el.id === req.params.postId);
        if (index >= 0)
          return res.status(404).json({ message: "Post already blocked" });

        data.blocked.push({ id: req.params.postId });

        fs.writeFile(
          `${__dirname}/../data/blockedList.json`,
          JSON.stringify(data),
          function writeJSON(err) {
            if (err) return res.status(500).json({ message: err.message });
            return res
              .status(200)
              .json({ message: "Post blocked successfully" });
          }
        );
      }
    );
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = blockContent;
