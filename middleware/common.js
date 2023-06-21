// Init
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const initializePassport = require("../utils/passport-config");

// Common Middleware
module.exports = (app) => {
  app.use(cors());
  // set the view engine to ejs
  app.set("view engine", "ejs");
  initializePassport(passport);

  app.use(
    session({
      secret: "SOMEThingReallyTRicky1345",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

  // app.use(logger("dev"));
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("uploads", { maxAge: "31536000" }));
  app.use(express.static("public"));
};
