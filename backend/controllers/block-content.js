const e = require("express");
const fs = require("fs");

function blockContent(req, res) {
  try {
    fs.readFile(
      `${__dirname}/../data/blockedList.json`,
      "utf8",
      (err, fileData) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        fileData = JSON.parse(fileData);
        let index = fileData.blocked.findIndex((el) => {
          return (
            el.id === req.params.postId && el.reportID === req.body.reportID
          );
        });

        if (index >= 0)
          return res.status(201).json({ message: "Content already blocked" });

        fileData.blocked.push({
          id: req.params.postId,
          reportID: req.body.reportID,
        });

        fs.writeFile(
          `${__dirname}/../data/blockedList.json`,
          JSON.stringify(fileData),
          function writeJSON(err) {
            if (err) return res.status(500).json({ message: err.message });
            fs.readFile(
              `${__dirname}/../data/reports.json`,
              "utf8",
              (err, data) => {
                if (err) {
                  return res.status(500).json({ message: err.message });
                }
                data = JSON.parse(data);
                let index = data.elements.findIndex((el) => {
                  return (
                    el.reference.referenceId === req.params.postId &&
                    el.id === req.body.reportID
                  );
                });

                data.elements[index].state = "BLOCKED";
                fs.writeFile(
                  `${__dirname}/../data/reports.json`,
                  JSON.stringify(data),
                  function writeJSON(err) {
                    if (err)
                      return res.status(500).json({ message: err.message });
                    return res
                      .status(200)
                      .json({ message: "Post blocked successfully" });
                  }
                );
              }
            );
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
