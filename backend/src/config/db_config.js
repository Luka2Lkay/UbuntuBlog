require("dotenv").config();

const db = { connectionString: process.env.CONNECTION_STRING };

module.exports = { db };
