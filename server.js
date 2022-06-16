var https = require("https");
var fs = require("fs");

const next = require("next");
const port = 443;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

var options = {
  key: fs.readFileSync("2_react-animation.cloud.key"),
  cert: fs.readFileSync("1_react-animation.cloud_bundle.crt"),
};

app.prepare().then(() => {
  const server = https.createServer(options, (req, res) => {
    handle(req, res)
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port}`);
  });
});
