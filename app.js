// import express and path modules
// express is a web framework for node.js
// while path provides utilities for working with file and directories.
var path = require("path"),  
    express = require("express");

// get the build directory where all compiled source code resides
// provide a port number and put express function in a variable calle app
var DIST_DIR = path.join(__dirname, "dist"),  
    PORT = 8000,
    app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {  
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

console.log('production app running on PORT: ', PORT)

// make the application running on the desired Port number
app.listen(PORT);