require("dotenv").config();


const Uri = process.env.MONGO_DB_URI;
const port = process.env.PORT || 5000;
const secretKey = process.env.JWT_SECRET_KEY;
const expireKey = process.env.EXPIRE_KEY;
const api = process.env.API_KEY;

module.exports = { Uri, port, secretKey, expireKey, api };
