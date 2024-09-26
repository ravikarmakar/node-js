// express app setup
const express = require("express");
const app = express();
const ejs = require("ejs");

// register view engien
app.set("view engine", "ejs");

//  middlewaee & static files
app.use(express.static("public"));

// listen on request

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// 404 status

app.use((req, res) => {
  res.status(404).render("404", { title: "404 not found" });
});

// port setup
app.listen(3000);
