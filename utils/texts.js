module.exports = {
  ERRORS: {
    partnerAlreadyExists: "Partner exists with this email!",
    partnerNotExists: "Partner does not exists ",
    userNotExists: "User does not exists ",

    passwordInvalid: "Invalid password!",
    oldPasswordInvalid: "Invalid old password!",
    accountExists: "Account exists with this email!",
    partnerAccountExists: "Partner account exists with this email!",
    userAccountExists: "Member account exists with this email!",

    NoMemberSubscriptionsExists: "Member does not have any subscription !",

    tokenInvalid: "Unauthorized access: Token not found",
    userNotFound: "Unauthorized access: User does not exist",
    unAuthorized: "Unauthorized access",
    emailInvalid: "Invalid Email",
    optInvalid: "Invalid OTP",
    otpExpires: "Otp Expires",
    notVerified: "You are not verified by admin ",
    tokenExpired: "Token expired!",
    // offer ******

    offerExists: "You already have offer with this title",
    offerAlreadyRedeemed: "You have already redeem this offer ",
    reviewAlready: "You have already added review to this offer ",

    // subscriptions ******
    subscriptionsExists: "You already have subscriptions with this title",
    subscriptionsNotExists: "Subscriptions does not exists ",
    // member subscriptions ******
    member_subscriptionsExists: "You already have subscriptions",
    member_subscriptionsNotExists:
      "You don't  have subscriptions with this subscriptions id",

    offerNotFound: "Offer not found",
    imageNotFound: "No image found with this id",
    // user *****
    userAlreadyExists: "User exists with this email!",
    userNotExists: "User does not exists with this user id!",
    // referral *****
    referralExists:
      "You  already  sent an offer to this partner with this offer",
  },
  TEXTS: {
    // partner *******
    partnerCreated: "Partner created successfully",
    partnerLogin: "Partner login successfully",
    partnerUpdated: "Partner updated successfully",
    forgotPasswordEmailSubject: "Forgot Password",
    passwordResetEmailSent: "Reset password email sent",

    passwordUpdated: "Password updated successfully",
    otpVerified: "Otp verified successfully",

    // offer **********
    offerCreated: "Offer created successfully",
    offerUpdated: "Offer updated successfully",
    offerRedeemed: "Offer Redeemed successfully",
    reviewAdded: "Review added successfully",

    imageDeleted: "Image deleted successfully",
    partnerDeleted: "Partner deleted successfully",
    userDeleted: "User deleted successfully",

    // user
    userCreated: "User created successfully",
    userLogin: "User login successfully",
    userUpdated: "User updated successfully",
    fcmUpdated: "FcmToken updated successfully",

    // Referral ***
    referralSent: "Referral Sent Successfully",

    // subscriptions
    subscriptionsCreated: "Subscriptions created successfully",
    subscriptionsUpdated: " Subscriptions updated successfully",
    subscriptionsDeleted: " Subscriptions deleted successfully",
    //member subscriptions
    member_subscriptionsCreated: "Membership Subscribed  successfully",
    member_subscriptionsDeleted: " Membership Un Subscribed  successfully",
    // ***********************
    // Notifications of redeem offer
    RedeemOfferTitle: "Redeem Offer",
    RedeemOfferBody: "Offer Redeemed Successfully ",
    offerApprovedTitle: "Offer Approval",
    offerApprovedBody: "Offer is approved successfully",
    offerRejectTitle: "Offer Rejected",
    offerRejectBody: "Your Offer is Rejected",
    partnerApprovedTitle: "Partner Profile Request Approval",
    partnerApprovedBody: "Your Partner Request is approved successfully",
    partnerRejectTitle: "Partner Profile Request Rejected",
    partnerRejectBody: "Your Partner Approval Request is Rejected",
    benefitTitle: "New Benefit",
    benefitBody: "you got a new benefit check it out!",
    receivedReferralTitle: "New Referral",
    receivedReferralBody: "you got a new referral check it out!",
    receivedReviewTitle: "New Review",
    receivedReviewBody: "you got a new review check it out!",
  },

  ROLES: {
    MEMBER: "member",
    ADMIN: "admin",
    PARTNER: "partner",
  },
  STATUS: {
    ACTIVE: "active",
    PENDING: "pending",
    REJECTED: "rejected",
    INACTIVE: "inactive",
    UNAPPROVED: "unapproved",
    APPROVED: "approved",
  },
};
