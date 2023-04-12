// HTTP module
const http = require('http');

// Authentication module.
const auth = require('http-auth');
const basic = auth.basic({
  realm: 'WebApp Bootcamp Secret Sauce',
  file: './example.htpasswd',
});

// Creating new HTTP server.
http
  .createServer(
    basic.check((req, res) => {
      res.end(`Welcome to private area - ${req.user}!`);
    })
  )
  .listen(1337, () => {
    // Log URL.
    console.log('Server running at http://127.0.0.1:1337/');
  });
