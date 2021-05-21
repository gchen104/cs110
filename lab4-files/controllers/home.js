// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.
const Room = require('../models/Rooms')

function getHome(request, response){
  // do any work you need to do, then
  let room_id = [];
  room_id[0] = "ABC123"

  Room.find()
      .sort({ date: -1 })
      .then(items => {response.render('home', {title: room_id[0], room: items[0].room_name});});
}

module.exports = {
    getHome
};