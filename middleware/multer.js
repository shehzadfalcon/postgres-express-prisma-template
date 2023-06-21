const multer = require("multer");
var fs = require("fs");
const storage = (field) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = "uploads";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, `uploads/${field}`);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const fileFilter = (filters) => (req, file, cb) => {
  if (filters.some((item) => item === file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Wrong extension type"), false);
  }
};

const uploader = (folder) =>
  multer({
    storage: storage(folder),
    fileFilter: fileFilter(["image/png", "image/jpg", "image/jpeg"]),
    limits: { fileSize: 15 * 1024 * 1024 },
  });

async function addPathToBody(req, res, next) {
  if (req.files) {
    if (!Array.isArray(req.files)) {
      let files = {};
      Object.keys(req.files).map((key) => (files[key] = { files: [] }));
      for (var key in req.files) {
        req.files[key].map((file) =>
          files[key].files.push({
            url:
              file.path != undefined ? process.env.BASE_URL + file.path : null,
          })
        );
        req.body["images"] = files;
      }
    } else {
      let files = [];
      req.files.map((file) => {
        files.push({
          url: file.path != undefined ? process.env.BASE_URL + file.path : null,
        });
      });
      req.body["images"] = files;
    }
  }

  next();
}

module.exports = (folder = "/", field, type = "single") => {
  return [
    type === "array"
      ? uploader(folder).array(field)
      : type === "fields"
      ? uploader(folder).fields(field)
      : uploader(folder).single(field),
    addPathToBody,
  ];
};
