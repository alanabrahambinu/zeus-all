require("dotenv").config();

/* ==============================
   Validate Required Variables
============================== */

const required = ["TOKEN", "CLIENT_ID", "MONGO_URI"];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

/* ==============================
   Export Config
============================== */

module.exports = {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  mongoURI: process.env.MONGO_URI,
  openaiKey: process.env.OPENAI_KEY || null,
  ownerId: process.env.OWNER_ID || null,
  port: process.env.PORT || 3000,
  prefix: process.env.PREFIX || "!"
};
