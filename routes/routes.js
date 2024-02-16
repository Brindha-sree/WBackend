const express = require("express");
const router = express.Router();
const controller = require('../controller/controller');

// GET /api/scrape?keyword=keyword
router.get("/scrape", controller.getSearchResult);

// Handle 404 error
router.all("/*", function (req, res) {
  res.status(400).send({status: false,
    message: "The api you request is not available"})
});

module.exports = router;