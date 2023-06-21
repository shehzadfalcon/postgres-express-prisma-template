const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const ENV = process.env;
const prisma = require("../../prisma/index");
const util = require("util");
var QRCode = require("qrcode");
const { OAuth2Client } = require("google-auth-library");
let CLIENT_ID = "118099216812879611886";
const client = new OAuth2Client(CLIENT_ID);
const axios = require("axios");
const NodeRSA = require("node-rsa");
var admin = require("firebase-admin");

class HelperController {
  constructor() {
    this.refreshTokens = [];
  }
  // hash password
  HashPassword = (password) => {
    //   generate salt for password
    const salt = bcrypt.genSaltSync(+ENV.BCRYPT_SALT);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };
  // compare passwords
  comparePassword = (password, user_password) => {
    // Check if user password is correct
    const isCorrect = bcrypt.compareSync(password, user_password);
    return isCorrect;
  };
  // generate otp
  generateOTP = () => {
    // generate otp
    let otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  };
  // generate otp expiry
  generateOTPExpires = () => {
    // generate otp expiry
    const resetPasswordExpires = Date.now() + 900000;
    return resetPasswordExpires;
  };

  // tokens methods
  // generate token
  generateToken = (user) => {
    // generate token
    let expiry_token = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;

    const accessToken = JWT.sign(
      {
        id: user.id,
        exp: expiry_token,
      },
      ENV.JWT_SECRET
    );

    const refreshToken = JWT.sign(
      { id: user.id },
      ENV.REFRESH_TOKEN_JWT_SECRET
    );
    this.refreshTokens.push(refreshToken);
    return { accessToken, refreshToken };
  };
  // generate refresh token
  generateRefreshToken = async (token, response) => {
    if (!this.refreshTokens.includes(token)) {
      return response.status(404).json({ message: "Refresh token expired" });
    }
    const user = await this.generateVerifyToken(
      token,
      ENV.REFRESH_TOKEN_JWT_SECRET
    );
    const access_token = this.generateToken(user);

    return access_token;
  };
  // verify jwt token
  generateVerifyToken = async (token, secret) => {
    const jwtVerifyAsync = util.promisify(JWT.verify);
    let decoded = await jwtVerifyAsync(token, secret);
    return decoded;
  };

  // generate QrCode
  generateQR = async (text) => {
    var opts = {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.3,
      margin: 1,
      color: {
        dark: "#208698",
        light: "#FFF",
      },
    };

    let url = await new Promise((resolve, reject) => {
      QRCode.toDataURL(`${text.id}`, opts, function (err, url) {
        if (err) throw err;

        resolve(url);
      });
    });
    return url;
  };

  // get public key from apple
  getApplePublicKey = async () => {
    let res = await axios.request({
      method: "GET",
      url: "https://appleid.apple.com/auth/keys",
    });
    let key = res.data.keys[0];
    const pubKey = new NodeRSA();
    pubKey.importKey(
      { n: Buffer.from(key.n, "base64"), e: Buffer.from(key.e, "base64") },
      "components-public"
    );
    return pubKey.exportKey(["public"]);
  };
  // verufy
  VerifySocialToken = async (idToken) => {
    let jwtClaims;
    try {
      const applePublicKey = await this.getApplePublicKey();
      jwtClaims = this.generateVerifyToken(idToken, applePublicKey, {
        algorithms: "RS256",
      });
    } catch (error) {
      console.log("error-->", error);
      jwtClaims = error;
    }
    return jwtClaims;
  };
  // get Offer Images
  getOfferImages = async (offer_id) => {
    const images = await prisma.offer_images.findMany({
      where: {
        offer_id: offer_id,
      },
    });
    return images;
  };

  // send Notification to device with FCM Token
  SendNotificationFCMToken = async (FCMToken, payload) => {
    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    };
    admin
      .messaging()
      .sendToDevice(FCMToken, payload, options)
      .then(function (response) {
        console.log("Successfully sent message:", response.results);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
      });
  };
}
module.exports = new HelperController();
