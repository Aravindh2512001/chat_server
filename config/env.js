require("dotenv").config();

module.exports = {
  Uri: process.env.MONGO_DB_URI,
  port: process.env.PORT || 5000,
  secretKey: process.env.JWT_SECRET_KEY,
  expireKey: process.env.EXPIRE_KEY,
  api: process.env.API_KEY,
};
