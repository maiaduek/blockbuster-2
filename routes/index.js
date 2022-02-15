const router = require("express").Router();
const User = require("../models/User.model");
const Snack = require('../models/Snack.model');

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/profile", (req, res) => {
//   res.render("user/profile", req.session.user);
// });


router.get('/add-snack', isLoggedIn, (req, res) => {
  res.render('snacks/add-snack')
})

router.post('/add-snack', isLoggedIn, (req, res) => {
  console.log("REQ.USER ID:::", req.user)
  Snack.create({
    name: req.body.name,
    category: req.body.category,
    snackerId: req.user
  })
  .then(newSnack => {
    User.findByIdAndUpdate(req.session.user, {
      $addToSet: {favoriteSnacks: newSnack._id}
    }, {
      new: true
    })
    .then(updatedUser => {
      console.log("UPDATED USER:::", updatedUser)
      res.redirect('/auth/profile')
    })
    .catch(err => console.log("ERR CREATING SNACK::", err))
  })
})


module.exports = router;