const Client = require('mariasql');

function getClient() {
  return new Client({
    host: '127.0.0.1',
    user: 'root',
    password: 'p-O)i9U*',
    db: 'tododb'
  })
};

module.exports = {
  getAllTodos: function() {
    return new Promise((resolve, reject) => {
      let c = getClient();
      c.query('SELECT * FROM todo', function(err, rows) {
        if (err) return reject(err);
        resolve(rows)
      });
      c.end();
    })
  },
  createTodo: function(todo) {
    return new Promise((resolve, reject) => {
      let c = getClient();
      c.query('INSERT INTO todo SET name = :name, description = :description', todo,
        function(err, rows) {
          if (err) return reject(err);
          c.query('SELECT * FROM todo WHERE id = :id', { id: rows.info.insertId },
            function(err, rows) {
              if (err) return reject(err);
              resolve(rows[0])
            });
        });
      c.end();
    })
  },
  deleteTodo: function(id) {
    return new Promise((resolve, reject) => {
      let c = getClient();
      c.query('DELETE FROM todo WHERE id = :id', { id: id },
        function(err, rows) {
          if (err) return reject(err);
          resolve(rows)
        });
      c.end();
    })
  }
};
