// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`))
let userCount = 0
  // Create the WebSockets server
const wss = new SocketServer({ server });
wss.on('connection', function connection(ws) {
  //count connnections and send to users
  ++userCount
  let message = { type: 'userCount', count: userCount }
  message = JSON.stringify(message)
  wss.clients.forEach(function each(client) {
    client.send(message)
  });
  ws.on('message', function incoming(message) {
    message = JSON.parse(message)
    message.type = message.type == 'postNotification' ? 'incomingNotification' : message.type
    message.id = uuidV4()
    message = JSON.stringify(message)
    wss.clients.forEach(function each(client) {
      client.send(message);
      /*      if (client !== ws && client.readyState === SocketServer.OPEN) {
            }*/
    });
  });


});




// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
      --userCount
    let message = { type: 'userCount', count: userCount }
    message = JSON.stringify(message)
    wss.clients.forEach(function each(client) {
      client.send(message)
    });

  });
});
