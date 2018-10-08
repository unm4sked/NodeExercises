const http = require("http");
const fs = require("fs");
const path = require("path");
const doWork = require("./work");
const { buildResponse } = require("./helpers");

(async () => {
  try {
    // read input.json file
    const data = fs.readFileSync(
      path.resolve(
        __dirname,
        "somewhere",
        "in",
        "the",
        "universe",
        "input.json"
      ),
      "utf8"
    );
    const dataJSON = JSON.parse(data);
    //console.log(data);
    // Create function helper that will resolve task: See ./work.js file
    // e.g. const output = doWork(...);
    const output = await doWork(dataJSON);
    //use buildResponse helper input, output
    const response = buildResponse(dataJSON, output);

    http
      .createServer(function(req, res) {
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": response.length
        });
        res.write(response); //write a response to the client
        res.end(); //end the response
      })
      .listen(8080); //the server object listens on port 8080
  } catch (error) {
    console.log("We got an error", error);
  }
})();
