const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'deliveryapi'
});
connection.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Connected to MySQL database!');
});
console.log(">>>>>>>>>>>>>>>>>")
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.static('public'));
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
connection.query('SELECT * FROM registration',(err, results) => {
    io.on('connection', (socket) => {
        socket.emit('mysqldata', results);
   io.sockets.emit('broadcast',results);
   socket.on('disconnect', function () {
   });
    });
    
  })
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});