

/** Basic HTTP server using NodeJS built-in HTTP module */
const http = require("http");

http.createServer((req, res) => {
    res.write('Hello World!');
    res.end();
}).listen(8080);


