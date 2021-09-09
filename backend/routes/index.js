const express = require("express");
const router = express.Router({ caseSensitive: false });

const {
  getAllSpamReports,
  resolveSpam,
  blockContent,
} = require("./../controllers");

router.get("/", getAllSpamReports);
router.put("/:id", resolveSpam);
router.post("/:postId", blockContent);

module.exports = router;
