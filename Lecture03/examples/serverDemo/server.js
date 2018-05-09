const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    
    if (req.url === "/welcome") {
        fs.readFile("welcome.html", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, "FAIL", { "Content-Type": "text/plain" })
                res.write(err);
                res.end();
                return;
            }
            
            res.writeHead(200, "OK", { "Content-Type": "text/html" })
            res.write(data);
            res.end();
        });
        return;
    }


    fs.readFile("index.html", "utf8", (err, data) => {
        if (err) {
            res.writeHead(500, "FAIL", { "Content-Type": "text/plain" })
            res.write(err);
            res.end();
            return;
        }
        
        res.writeHead(200, "OK", { "Content-Type": "text/html" })
        res.write(data);
        res.end();
    });
}).listen(7080);

//localhost:7080
//127.0.0.1:7080