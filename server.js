var https = require("https");
var fs = require("fs");

const next = require("next");
const { parse } = require("url");
const port = parseInt(process.env.PORT, 10) || 443;
const dev = process.env.NODE_ENV !== "production";
const hostname = "react-animation.cloud";

const app = next({ dev });
const handle = app.getRequestHandler();

var options = {
  key: fs.readFileSync("2_react-animation.cloud.key"),
  cert: fs.readFileSync("1_react-animation.cloud_bundle.crt"),
};

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
