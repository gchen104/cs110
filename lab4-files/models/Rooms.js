const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChatRooms = new Schema({
  room_name: {
    type: String,
    required: true
  },
  message:{
    type: String
  }
});

module.exports = Item = mongoose.model('room', ChatRooms);