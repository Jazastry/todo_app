// express initialization
let express = require('express'),
  path = require('path'),
  http = require('http'),
  paths = require(path.resolve(process.cwd(), './config/paths.js')),
  serverPort = 8888,
  db = require('./db.js'),
  app = express(),
  server = http.createServer(app);

app.use(express.static(path.resolve(process.cwd(), paths.build)))

server.listen(serverPort, function() {
  console.log('listening on port ', serverPort)
});


// Initialize socket.io
let io = require('socket.io').listen(server),
  connections = 0;

io.on('connection', function(client) {
  connections++;
  console.log('Client connected connections - ', connections)
  db.getAllTodos().then((todos) => {
    io.emit('todos.create', todos);
  })
  client.on('todo.create', function(todo) {
    db.createTodo(todo)
        .then((todo) => {
            io.emit('todo.create', todo)
        })
  })
  client.on('todo.delete', function(id) {
    db.deleteTodo(id)
        .then((todo) => {
            io.emit('todo.delete', id)
        })
  })
  client.on('disconnect', function() {
    connections--;
    console.log('Client disconected connections - ', connections)
  })
})
