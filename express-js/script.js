const express = require("express");

// express app
const app = express();
const port = 3000;

// register view engine

app.set("view engien", "ejs");

// listen for request

app.get("/", (req, res) => {
  // res.send(`<h1>Home Page</h1>`);
  // console.log("HEY RAVI THIS IS YOUR WEB");

  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send(`<h1>About Page</h1>`);
  // console.log("HEY RAVI THIS IS YOUR WEB");
  res.sendFile("./views/about.html", { root: __dirname });
});

// port setup
app.listen(port, () => {
  console.log("listing on port 3000");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
