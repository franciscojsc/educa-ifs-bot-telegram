const mongoose = require('../config/database');

const UserSchema = new mongoose.Schema({
  id_telegram: {
    type: String,
    require: true,
  },
  first_name: {
    type: String,
    require: false,
  },
  init_chat: {
    type: Boolean,
    require: false,
    default: false,
  },
  tutorials: {
    type: Array,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
