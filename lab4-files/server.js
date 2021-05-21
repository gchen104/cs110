// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const Room = require('./models/Rooms');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

const db = config.get('mongoURI');
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', homeHandler.getHome);

app.post('/roomName', (req, res) =>{
    res.redirect(req.body.room);
})

app.get('/:roomName', roomHandler.getRoom);
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));