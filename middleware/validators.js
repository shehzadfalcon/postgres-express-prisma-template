// Init
const { check, validationResult } = require("express-validator");
const STRINGS = require("../utils/texts");

/*
====================
Validations
====================
*/
// change password Validation
exports.changePasswordValidator = [
  check("old_password", "Old Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Old Password min length must be 6 characters"),
  check("new_password", "New Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("New Password min length must be 6 characters"),
  check("confirm_password", "Confirm Password is required")
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Confirm Password min length must be 6 characters")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.new_password;
      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password must be same");
      }
    }),
];

// *************** Partner *******************
// **************************************

// partner signup Validation
exports.registerPartnerValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password min length must be 6 characters"),
  check("confirm_password", "Confirm Password is required")
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Confirm Password min length must be 6 characters")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password must be same");
      }
    }),
];
// partner login Validation
exports.loginPartnerValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password min length must be 6 characters"),
];

// partner update Validation
exports.updatePartnerValidator = [
  check("partner_id", "Partner Id is required.").notEmpty().trim(),

  // check("business_name", "Business Name is required.").notEmpty().trim(),
  // check("service_type", "Service Type is required.").notEmpty().trim(),
  // check("business_phoneNo", "Business Phone Number is required.")
  //   .notEmpty()
  //   .trim(),
  // check("company_website", "Company Website is required.").notEmpty().trim(),
  // check("business_city", "Business City is required.").notEmpty().trim(),
  // check("company_address", "Company Address is required.").notEmpty().trim(),
  // check("full_name", "Name is required.").notEmpty().trim(),
  // check("phoneNo", "Phone No is required.").notEmpty().trim(),
  // check("company_relation", "Company Relation is required.").notEmpty().trim(),
];
// forgot password partner  Validation
exports.forgotPasswordPartnerValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
];
// verify  otp partner  Validation
exports.verifyOtpPartnerValidator = [
  check("otp", "Otp is required.").notEmpty().trim(),
];
// reset password partner  Validation
exports.resetPasswordPartnerValidator = [
  check("otp", "Otp is required.")
    .notEmpty()
    .isInt()
    .withMessage("Otp should be type number"),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password min length must be 6 characters"),
  check("confirm_password", "Confirm Password is required")
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Confirm Password min length must be 6 characters")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password must be same");
      }
    }),
];

// *************** Offer *******************
// **************************************

// create offer Validation
exports.createOfferValidator = [
  check("title", "Title is required.").notEmpty().trim(),
  check("service_type", "Service Type is required.").notEmpty().trim(),
  check("price", "Price is required.")
    .notEmpty()
    .isInt()
    .withMessage("Price should be type number"),

  check("off_percentage", "Off Percentage is required.")
    .notEmpty()
    .isInt()
    .withMessage("off_percentage should be type number"),
  check("referral_fee", "Referral fee is required.")
    .notEmpty()
    .isInt()
    .withMessage("Referral Fee should be type number"),
  check("location.lat", "Lat is required.").notEmpty().trim(),
  check("location.long", "Long is required.").notEmpty().trim(),
  check("location.address", "address is required.").notEmpty().trim(),
];
// update offer Validation
exports.updateOfferValidator = [
  check("offer_id", "Offer Id is required.").notEmpty().trim(),
  check("title", "Title is required.").notEmpty().trim(),
  check("service_type", "Service Type is required.").notEmpty().trim(),
  check("price", "Price is required.")
    .notEmpty()
    .isInt()
    .withMessage("Price should be type number"),

  check("off_percentage", "Off Percentage is required.")
    .notEmpty()
    .isInt()
    .withMessage("off_percentage should be type number"),
  check("referral_fee", "Referral fee is required.")
    .notEmpty()
    .isInt()
    .withMessage("Referral Fee should be type number"),
  check("location.lat", "Lat is required.").notEmpty().trim(),
  check("location.long", "Long is required.").notEmpty().trim(),
  check("location.address", "address is required.").notEmpty().trim(),
];
// redeem offer Validation
exports.redeemOfferValidator = [
  check("offer_id", "Offer Id is required.").notEmpty().trim(),
  check("user_id", "User Id is required.").notEmpty().trim(),
];
// add review in offer Validation
exports.AddReviewOfferValidator = [
  check("offer_id", "Offer Id is required.").notEmpty().trim(),
];
// *************** User *******************
// **************************************

// user update Validation
exports.updateUserValidator = [
  check("company_website", "Company Website is required.").notEmpty().trim(),
  check("address", "Address is required.").notEmpty().trim(),
  check("full_name", "Name is required.").notEmpty().trim(),
  check("phoneNo", "Phone No is required.").notEmpty().trim(),
];

// *************** Referral *******************
// **************************************

// create referral Validation
exports.createReferralValidator = [
  check("offer_id", "Offer Id is required.").notEmpty().trim(),
  check("user_id", "User Id is required.").notEmpty().trim(),
  check("partner_id", "Partner Id is required.").notEmpty().trim(),
];
// *************** Admin *******************
// **************************************

// update partner profile request Validation
exports.partnerRequestValidator = [
  check("status", "Status is required.")
    .notEmpty()
    .isIn(Object.values(STRINGS.STATUS))
    .withMessage(`Status must be one of ${Object.values(STRINGS.STATUS)}`),
  check("partner_id", "Partner Id is required.").notEmpty().trim(),
];
// update partner offer request Validation
exports.partnerOfferRequestValidator = [
  check("status", "Status is required.")
    .notEmpty()
    .isIn(Object.values(STRINGS.STATUS))
    .withMessage(`Status must be one of ${Object.values(STRINGS.STATUS)}`),
  check("subscriptions_id", "Subscriptions Id is required.").notEmpty().trim(),
  check("offer_id", "Offer Id is required.").notEmpty().trim(),
  // check("date", "Date is required.").notEmpty().trim(),
  // check("time", "Time is required.").notEmpty().trim(),
];
// update user profile request Validation
exports.userRequestValidator = [
  check("status", "Status is required.")
    .notEmpty()
    .isIn(Object.values(STRINGS.STATUS))
    .withMessage(`Status must be one of ${Object.values(STRINGS.STATUS)}`),
  check("user_id", "User Id is required.").notEmpty().trim(),
];

// create subscriptions request Validation
exports.createSubscriptionValidator = [
  check("title", "Title is required.").notEmpty().trim(),
  check("amount", "Amount is required.")
    .notEmpty()
    .isInt()
    .withMessage("Amount should be type number"),
];
// subscriptions update Validation
exports.updateSubscriptionsValidator = [
  check("title", "Title is required.").notEmpty().trim(),
  check("amount", "Amount is required.")
    .notEmpty()
    .isInt()
    .withMessage("Amount should be type number"),
];
// *************** End *******************
// **************************************

// *************** Member Subscriptions *******************
// **************************************

// create member subscriptions request Validation
exports.createMemberSubscriptionValidator = [
  check("subscriptions_id", "subscriptions_id is required.").notEmpty().trim(),
];

/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = errors.array()[0].msg;
    res.status(400).send({ message: message });
  } else {
    next();
  }
};
