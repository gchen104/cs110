// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const config = require('config')
const mongoose = require('mongoose')

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');
const db = config.get('mongoURI')

mongoose   
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
    .then( () => console.log("Connected to MongoDB"))
    .catch( err => console.error(err))

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: __dirname + '/views/layouts/',
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.post('/create', roomHandler.createRoom);
app.post('/usernameSet', roomHandler.usernameSet);
app.post('/message', roomHandler.postMessage);
app.get('/:roomName/messages', roomHandler.getRoom);
app.get('/:roomName', roomHandler.getRoom);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
// const socket = require('socket.io')
// const io = socket(server)

// io.on('connection', socket => {
//     console.log("A user is here")

//     socket.on('sendMessage', data =>{
//         console.log("Received new message: "+ data.message)
//     })
// })