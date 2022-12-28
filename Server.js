// Set up a websocket server to handle chat messages
const WebSocket = require('ws');

const readline = require('readline');

const server1 = new WebSocket.Server({ port: 8080 });
server1.on('connection', (ws) => {
  
  fs.readFile('Alerts.txt', (err, data) => {
    if (err) throw err;
  
    const lines = String(data).split(/\r?\n/);
    const last15Lines = lines.slice(-29);
    const newContent = last15Lines.join('\n');

    fs.writeFile('Alerts.txt', newContent, (err) => {
      if (err) throw err;

    })

    for (const line of last15Lines) {
      ws.send(line);
    }

  });





  ws.on('message', (message) => {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      hour12: false,
      
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    
    const formattedTimestamp = `<small style="font-size: x-small; color: darkgray">${timestamp.replace(',', ' -')} - </small> `;
    const messageWithTimestamp = formattedTimestamp +  message;


    // Convert the message to a string and broadcast it to all connected clients
    const messageString = String(messageWithTimestamp);
    

      // Check if the message contains a banned word
  if (messageString.trim() === '') {
    // If the message is an empty string, don't broadcast it and return early
    return;
  }




    
    console.log(messageString);


    fs.appendFile('Alerts.txt', messageWithTimestamp + '\n', (err) => {
      if (err) throw err;
    })

    server1.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }

    
    });
  });
});


// Set up an HTTP server to serve the HTML page
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  // Read the HTML file and send it to the client
  if(req.url == '/'){
  fs.readFile('index.html', (err, data) => {
    if (err) throw err;
    res.writeHead(200);
    res.end(data);
  });
  }else if(req.url){}

}).listen(3000);
