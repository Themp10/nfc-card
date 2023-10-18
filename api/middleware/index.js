
const corsMiddleware = require("./cors");
const reqFormatMiddleware = require("./reqFormat");
const authJwt = require("./authJwt");
const multerMiddleware = require("./multer");
module.exports = {
   multerMiddleware,
  reqFormatMiddleware,
  corsMiddleware,
  authJwt
};
