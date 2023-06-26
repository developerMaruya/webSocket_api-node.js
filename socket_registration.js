
const mysql = require('mysql');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'deliveryapi'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
wss.on('connection', (ws) => {
    console.log('New connection established');
  
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      const { type, username, password } = data;
  
      if (type === 'register') {
        connection.query('INSERT INTO registration SET ?', {
          username: username,
          password: password,
          email: data.email,
          mobile: data.mobile,
          role: data.role
        }, (error, results) => {
          if (error) throw error;
          console.log('New employee registered');
          ws.send(JSON.stringify({ id: results.insertId }));
        });
      } else if (type === 'getEmployee') {
        connection.query('SELECT * FROM registration WHERE username = ? AND password = ?', [username, password], (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            const employee = {
              id: results[0].id,
              username: results[0].username,
              email: results[0].email,
              mobile: results[0].mobile,
              role: results[0].role
            };
            ws.send(JSON.stringify(employee));
          } else {
            ws.send(JSON.stringify({ error: 'Invalid username or password' }));
          }
        });
      } else if (type === 'updateEmployee') {
        connection.query('UPDATE registration SET email = ?, mobile = ?, role = ? WHERE username = ? AND password = ?', [data.email, data.mobile, data.role, username, password], (error, results) => {
          if (error) throw error;
          if (results.affectedRows > 0) {
            ws.send(JSON.stringify({ message: 'Employee details updated' }));
          } else {
            ws.send(JSON.stringify({ error: 'Invalid username or password' }));
          }
        });
      } else if (type === 'deleteEmployee') {
        connection.query('DELETE FROM registration WHERE username = ? AND password = ?', [username, password], (error, results) => {
          if (error) throw error;
          if (results.affectedRows > 0) {
            ws.send(JSON.stringify({ message: 'Employee deleted' }));
          } else {
            ws.send(JSON.stringify({ error: 'Invalid username or password' }));
          }
        });
      }
    });
  });
  