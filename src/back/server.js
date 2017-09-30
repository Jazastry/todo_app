let express = require('express'),
  path = require('path'),
  http = require('http'),
  paths = require(path.resolve(process.cwd(), './config/paths.js')),
  db = require('./db.js'),
  app = express(),
  server = http.createServer(app),
  serverPort = 8888;

app.use(express.static(path.resolve(process.cwd(), paths.build)))

server.listen(serverPort, function() {
  console.log('listening on port ', serverPort)
});

let io = require('socket.io').listen(server);

io.on('connection', function(client) {
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
})
