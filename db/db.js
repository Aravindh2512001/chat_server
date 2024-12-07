const mongoose = require('mongoose');
const { Uri } = require('../config/env');

const connectDb = async () => {
    try {
        await mongoose.connect(Uri);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;  
