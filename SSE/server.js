const http = require("http");
const fs = require("fs");
const PORT = 3000;

http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile("index.html", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    }

    if (req.url === "/sse") {
      res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        // Adding CORS for all origins
        "Access-Control-Allow_origin": "*"
      });

      let id = 1;
      // Send event every 3 seconds or so forever...
      setInterval(() => {
        res.write(`data: myEvent\nid: ${id}\ndata:This is event ${id}.`);
        res.write("\n\n");
        id++;
      }, 2000);
    }
  })
  .listen(PORT, console.log(`Server running on ${PORT}`));
