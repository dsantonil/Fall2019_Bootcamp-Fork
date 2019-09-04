var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  //looks if URL is has a GET request for /listing
  if(parsedUrl.pathname == "/listings"){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(listingData));
  }

  else{
    response.writeHead(404);
    response.end('Bad gateway error');
  }
  
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  //check for errors
  if (err) throw err;

  //save JSON file data in listingData variable
  listingData = JSON.parse(data);

  //Creates the server
  server = http.createServer(requestHandler);
  //Start the server
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://localhost:' + port);
  });

});
