const hapi=require('hapi');

// Create a server with a host and port
const server = hapi.server({
  host: 'localhost',
  port: 2000
});

// Add the route
server.route({
  method:'GET',
  path:'/hello',
  handler:function(request,h) {
    return'hello world';
  }
});

// Start the server
const start = async function() {

  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Hapi server running at:', server.info.uri);
};

start().then(response => {
});

/*
  Way to start Hapi server
  (i) node server-hapi.js: Changes won't be reflected on the fly
  (ii) Install nodemon and run nodemon server-hapi.js
 */
