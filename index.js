var http = require('http');
var  fs  = require('fs');
var index = fs.readFileSync('./index.html');
var control = fs.readFileSync('./conexion.html');

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