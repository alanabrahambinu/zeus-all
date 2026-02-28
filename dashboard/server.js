// dashboard/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;  // Use Render's PORT

app.get('/', (req, res) => {
  res.send('Bot is running 🚀');
});

// CRITICAL: Bind to 0.0.0.0 (not localhost)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});
