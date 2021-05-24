const roomGenerator = require('../util/roomIdGenerator.js');
const Room = require('../models/Room')

//GET request to display existing chat room
function getRoom(request, response){
    Room.findOne({ name: request.params.roomName })
        .lean()
        .then( room => {            
            response.cookie('roomName', request.params.roomName)
            
            var nameSet = false
            if( request.cookies.username != null ){
                nameSet = true
            }

            var newRoom = room.messages.map(m => {
                return {
                    ...m,
                    date: m.date.toLocaleTimeString(),
                }
            })

            response.render(
                "room",
                {
                    name: request.params.roomName,
                    username: "",
                    username_set: nameSet,
                    messages: newRoom
                }
            )
        })
        .catch( err => {
            response.send(err)
        })
}

//POST request to create a chat room
function createRoom(request, response){
    const newRoom = new Room({
      name: request.body.roomName == null ? roomGenerator.roomIdGenerator() : request.body.roomName
    })
    newRoom
      .save()
      .then( x => console.log(x) )
      .catch( y => console.log(y) )
    response.redirect(`/${newRoom.name}`)
}

//POST request to store username
function usernameSet(request, response){
    response.cookie('username', request.body.username)
    console.log(request.cookies)
    
    response.redirect(`/${request.cookies.roomName}`)
    //This is how to retrieve cookie request.cookies.<key>
}

//POST request to update messages
function postMessage(request, response){
    console.log(`Preparing to save message. roomName: ${request.cookies.roomName} and the username: ${request.cookies.username} and the message: ${request.body.message}`)
    if( request.body.message != null ){
        console.log("Updating...")
        Room.updateOne(
            { name: request.cookies.roomName },
            { $push: { messages: [{
                userName : `${request.cookies.username}`,
                message: `${request.body.message}`
            }]}}
        ).then( obj => response.redirect(`/${request.cookies.roomName}`)
        ).catch( err => response.send(err))
    }
}

module.exports = {
    getRoom,
    createRoom,
    usernameSet,
    postMessage
}
