// Init
const router = require("express").Router();
// All Routes
// index page //
router.get("/", function (req, res) {
  res.render("pages/index");
});
// Export
module.exports = router;
