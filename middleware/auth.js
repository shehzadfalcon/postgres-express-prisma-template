const JWT = require("jsonwebtoken");
const STRINGS = require("../utils/texts");
const prisma = require("../prisma/index");
const HelperController = require("../utils/helpers");

/**
 * If no role is passed the default role is user
 *
 * @param  {String} role role allowed to access the route
 */

function auth(role = "") {
  // roles = roles.length > 0 && roles : role.USER;
  return async (req, res, next) => {
    const header = req.get("Authorization");
    if (!header || !header.startsWith("Bearer")) {
      return res.status(401).json({ message: STRINGS.ERRORS.tokenInvalid });
    }
    try {
      const token = header.split(" ")[1];

      const decoded = await HelperController.generateVerifyToken(
        token,
        process.env.JWT_SECRET
      );
      let user;
      let _id = String(decoded.id);
      if (role == STRINGS.ROLES.PARTNER) {
        user = await prisma.partner.findFirst({
          where: {
            id: _id,
          },
        });
      } else {
        user = await prisma.user.findFirst({
          where: {
            id: _id,
          },
        });
      }
      if (!user)
        return res.status(401).json({ message: STRINGS.ERRORS.userNotFound });

      if (role !== user?.role)
        return res.status(401).json({ message: STRINGS.ERRORS.unAuthorized });
      req.user = user;
      req.userId = user.id;
      next();
    } catch (err) {
      // console.log("err--->", err.message);
      return res.status(401).json({ message: STRINGS.ERRORS.tokenExpired });
    }
  };
}

module.exports = auth;
