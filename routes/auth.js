const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Snack = require("../models/Snack.model")

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/signup", isLoggedOut, (req, res) => {
  console.log("LALALALAAL")
  res.render("user/signup");
});

router.post("/signup", isLoggedOut, (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .render("user/signup", { errorMessage: "Please provide your username." });
  }

  // if (password.length < 8) {
  //   return res.status(400).render("user/signup", {
  //     errorMessage: "Your password needs to be at least 8 characters long.",
  //   });
  // }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res
        .status(400)
        .render("user/signup", { errorMessage: "Username already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username: req.body.username,
          password: hashedPassword,
        });
      })
      .then((user) => {
        // Bind the user to the session object
        // console.log("USER::", user)
        req.session.user = user;
        res.render("user/profile", {user: user});
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("user/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("user/signup", {
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
          });
        }
        return res
          .status(500)
          .render("user/signup", { errorMessage: error.message });
      });
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("user/login");
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .render("user/login", { errorMessage: "Please provide your username." });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  // if (password.length < 8) {
  //   return res.status(400).render("user/login", {
  //     errorMessage: "Your password needs to be at least 8 characters long.",
  //   });
  // }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res
          .status(400)
          .render("user/login", { errorMessage: "Wrong credentials." });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .render("user/login", { errorMessage: "Wrong credentials." });
        }
        req.session.user = user;
        req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect("/auth/profile");
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("/", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

router.get("/profile", (req, res) => {
  // console.log('THIS IS SESSION', req.session)
  User.findById(req.session.user)
  .populate('favoriteSnacks')
  .then(foundUser => {
    // console.log("RESULTS::", foundUser)
    res.render("user/profile", {user: foundUser, snacks: foundUser.favoriteSnacks});
  })
  .catch(err => {
    console.log("ERROR::", err)
  })
});

router.get("/edit-user", (req, res) => {
  User.findById(req.session.user)
  .then(foundUser => {
    res.render('user/edit-user', {username: foundUser.username})
  })
  .catch(err => console.log(err))
})

router.post("/edit-user", (req, res) => {
  User.findByIdAndUpdate(req.session.user, {
    username: req.body.username
  })
  .then(results => {
    res.redirect("/auth/profile")
  })
  .catch(err => console.log(err))
})

router.post('/delete', (req, res) => {
  console.log("REQQQ:::",req.session.user)
  User.findByIdAndRemove(req.session.user)
  .then(results => {
    console.log("DELETED USER:::", results)
    res.redirect('/auth/logout')
  })
  .catch(err => console.log(err))
})

router.post('/delete/:id', (req, res) => {
  console.log("REQ PARAMS ID DELETEING::", req.params.id)
  Snack.findByIdAndRemove(req.params.id)
  .then(results => {
    // console.log("RESULTS DELETING::", results)
    res.redirect("/auth/profile")
  })
  .catch(err => {
    console.log("ERROR DELETING SNACK::", err)
  })
})



module.exports = router;
