


const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    // Determine the file path based on the requested URL
    const filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);

    // Check if the requested file exists
    fs.exists(filePath, exists => {
        if (exists) {
            // Read the file and send it as the response
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(`Error reading file: ${err}`);
                } else {
                    // Set the appropriate content type based on the file extension
                    const ext = path.extname(filePath);
                    let contentType = 'text/html';
                    if (ext === '.css') {
                        contentType = 'text/css';
                    } else if (ext === '.js') {
                        contentType = 'text/javascript';
                    } else if (ext === '.png') {
                        contentType = 'image/png';
                    } else if (ext === '.jpg' || ext === '.jpeg') {
                        contentType = 'image/jpeg';
                    }

                    res.setHeader('Content-Type', contentType);
                    res.end(data);
                }
            });
        } else {
            // File not found, send a 404 response
            res.statusCode = 404;
            res.end('File not found');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});