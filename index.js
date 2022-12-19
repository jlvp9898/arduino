var http = require('http');
var  fs  = require('fs');
const path = require('path');
var index = fs.readFileSync(path.join(__dirname, '.', '', 'index.html')).toString();
var control = fs.readFileSync(path.join(__dirname, '.', '', 'conexion.html')).toString();

  var app = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.url == "/control"){
        res.end(control);
    }else{
        res.end(index);
    }
      
  });

  const { Server } = require("socket.io");
  const io = new Server(app);

  io.on('connection', function(socket){
    console.log("Usuario conectado");
    socket.on('led', function(data){
      
      socket.broadcast.emit("led", data);
    });

  });

  app.listen(8080);