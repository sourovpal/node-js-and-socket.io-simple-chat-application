const express       = require('express');
const app           = express();
const http          = require('http');
const path          = require('path');
const session       = require('express-session');
const server        = http.createServer(app);
const { Server }    = require('socket.io');
const io            = new Server(server);
const {PORT}        = require('./config');
const web           = require('./Router/web');
const user          = require('./Router/user');
const WebSocket     = require('./App/Functions/WebSocket');
//.............//
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// router
app.use('/user', web);
app.use('/', user);

io.on('connection', async(socket)=>{
    await WebSocket(socket, io);
});


server.listen(PORT, ()=>{
    console.log(`Server is Running ==> http://localhost:${PORT}`);
});
// server.listen();