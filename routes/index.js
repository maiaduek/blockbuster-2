const router = require("express").Router();
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/signup", (req, res) => {
//   res.render("user/signup");
// });

module.exports = router;
