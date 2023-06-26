// const mysql = require('mysql');
// const net = require('net');

// // Create a MySQL connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'username',
//   password: '',
//   database: 'deliveryapi'
// });

// // Create a TCP server using Node.js' net module
// const server = net.createServer((socket) => {
//   console.log('Client connected');

//   // Handle incoming data from the client
//   socket.on('data', (data) => {
//     const parts = data.toString().trim().split(' ');

//     // Check the command sent by the client
//     if (parts[0] === 'ADD') {
//       const name = parts[1];
//       const email = parts[2];
//       const mobile = parts[3];

//       // Add the record to the database
//       pool.query(`INSERT INTO users (name, email, mobile) VALUES ('${name}', '${email}', '${mobile}')`, (error, results) => {
//         if (error) {
//           socket.write(`Error: ${error.message}`);
//         } else {
//           socket.write(`Record added successfully with ID ${results.insertId}`);
//         }
//       });
//     } else if (parts[0] === 'READ') {
//       const id = parts[1];

//       // Read the record from the database
//       pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
//         if (error) {
//           socket.write(`Error: ${error.message}`);
//         } else if (results.length === 0) {
//           socket.write(`Record not found with ID ${id}`);
//         } else {
//           const record = results[0];
//           socket.write(`Name: ${record.name}\nEmail: ${record.email}\nMobile: ${record.mobile}`);
//         }
//       });
//     } else if (parts[0] === 'UPDATE') {
//       const id = parts[1];
//       const name = parts[2];
//       const email = parts[3];
//       const mobile = parts[4];

//       // Update the record in the database
//       pool.query(`UPDATE users SET name = '${name}', email = '${email}', mobile = '${mobile}' WHERE id = ${id}`, (error, results) => {
//         if (error) {
//           socket.write(`Error: ${error.message}`);
//         } else if (results.affectedRows === 0) {
//           socket.write(`Record not found with ID ${id}`);
//         } else {
//           socket.write(`Record updated successfully`);
//         }
//       });
//     } else if (parts[0] === 'DELETE') {
//       const id = parts[1];

//       // Delete the record from the database
//       pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
//         if (error) {
//           socket.write(`Error: ${error.message}`);
//         } else if (results.affectedRows === 0) {
//           socket.write(`Record not found with ID ${id}`);
//         } else {
//           socket.write(`Record deleted successfully`);
//         }
//       });
//     } else {
//       socket.write(`Invalid command: ${parts[0]}`);
//     }
//   });

//   // Handle socket close
//   socket.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// // Start the server on port 3000
// server.listen(3000, () => {
//   console.log('Server started on port 3000');
// });
