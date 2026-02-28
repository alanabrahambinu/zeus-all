require("dotenv").config();

/**
 * Validate required environment variables
 */
const requiredEnv = [
  "TOKEN",
  "CLIENT_ID",
  "MONGO_URI"
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

/**
 * Export configuration
 */
module.exports = {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  mongoURI: process.env.MONGO_URI,
  openaiKey: process.env.OPENAI_KEY || null,
  ownerId: process.env.OWNER_ID || null,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  prefix: process.env.PREFIX || "!"
};
