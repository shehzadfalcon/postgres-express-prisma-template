const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../prisma/index");

function initialize(passport) {
  try {
    const authenticateUser = async (email, password, done) => {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        return done(null, false, { message: "User not found!!" });
      } else {
        return done(null, user);
      }
    };
    // serializa user
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
      const user = prisma.user
        .findFirst({
          where: {
            id: id,
          },
        })
        .then((userData) => {
          return done(null, userData);
        })
        .catch((err) => {
          console.log("Error --->", err);
        });
    });

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        authenticateUser
      )
    );
  } catch (error) {
    console.log("-->", error.message);
    res.send("SOMETHING WENT WRONG");
  }
}

module.exports = initialize;
