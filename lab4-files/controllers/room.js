const roomGenerator = require('../util/roomIdGenerator.js');
const Room = require('../models/Rooms')

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    generated_id = roomGenerator.roomIdGenerator()
    if (request.params.roomName != 'favicon.ico'){
        const newRoom = new Room({
                    room_name: request.params.roomName,
                    room_id: generated_id,
                })
                newRoom
                    .save()
                    .then(item => console.log(item))
                    .catch(err => console.log(err));
        response.render('room', 
                        {title: 'chatroom', 
                        roomName: request.params.roomName, 
                        newRoomId: generated_id});
            };
}

module.exports = {
    getRoom
};