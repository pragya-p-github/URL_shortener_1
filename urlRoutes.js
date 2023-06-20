const express = require("express");
const {
  generateNewShortURL,
  getAnalytics,
  searchURLs,
} = require("./urlController");

const router = express.Router();

router.post("/", generateNewShortURL);
router.get("/analytics/:shortId", getAnalytics);
router.get("/search", searchURLs);

module.exports = router;