const express = require('express');
const app = express();

// IMPORTANT: Use Render's PORT environment variable
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Bot is running 🚀');
});

// CRITICAL: Bind to '0.0.0.0' (required for Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

// Optional: Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
