// express app setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// register view engien
app.set("view engine", "ejs");

//  middlewaee & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB

const dbURL = `mongodb+srv://codewithravi585:GMMpOP5J56e9iAFP@vlogsite.vk6gb.mongodb.net/?retryWrites=true&w=majority&appName=VlogSite`;

mongoose
  .connect(dbURL)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// listen on request

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// all routes

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blogs Details", blog: result });
    })
    .catch((err) => console.log(err));
});

// app.delete("/blogs/:id", (req, res) => {
//   const id = req.params.id;
//   Blog.findByIdAndDelete(id)
//     .then((result) => {
//       res.redirect("/blogs");
//     })
//     .catch((err) => console.log(err));

//   // console.log(id);
// });

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({ message: "Blog deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to delete blog" });
    });
});
// 404 status

app.use((req, res) => {
  res.status(404).render("404", { title: "404 not found" });
});

// to using for add data

// app.get("/add-data", (req, res) => {
//   const blog = new Blog({
//     title: "my new blog2",
//     snippet: "my blog snippet2",
//     body: "more blog body2",
//   });

//   blog
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });
