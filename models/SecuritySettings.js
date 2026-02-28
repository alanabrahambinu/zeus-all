
const mongoose = require("mongoose");

module.exports = mongoose.model("SecuritySettings", new mongoose.Schema({
  guildId: String,
  antiRaid: { type: Boolean, default: true },
  captchaEnabled: { type: Boolean, default: true },
  joinThreshold: { type: Number, default: 5 },
  wordFilter: { type: [String], default: ["badword1","badword2"] },
  linkWhitelist: { type: [String], default: [] },
  lockdown: { type: Boolean, default: false }
}));
