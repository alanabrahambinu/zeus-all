const express = require("express");

const app = express();

// Health check route
app.get("/", (req, res) => {
  res.send("Bot is running 🚀");
});

// IMPORTANT: Use Render's PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
