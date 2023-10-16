const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

// app.use((req, res, next) => {
//     console.log('First Middleware');
//     next();
// });

// app.use((req, res, next) => {
//     res.send('Hello from express!');
// });

mongoose
  .connect(
    "mongodb+srv://simran_23:9czsMrQtv1i93d6u@cluster0.3gdstot.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb+srv://simran_23:9czsMrQtv1i93d6u"
    // + process.env.MONGO_ATLAS_PW +
    // "@cluster0.3gdstot.mongodb.net"
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


//middleware handling reaching our server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// //api post route
// app.post("/api/posts", (req, res, next) => {
//   // const post = req.body;
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   // console.log(post);
//   post.save().then((createdPost) => {
//     res.status(201).json({
//       message: "Post added successfully!",
//       postId: createdPost._id,
//     });
//   });
// });

// app.put("/api/posts/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content,
//   });
//   Post.updateOne({ _id: req.params.id }, post).then((result) => {
//     console.log(result);
//     res.status(200).json({ message: "Update successful!" });
//   });
// });

// app.get("/api/posts", (req, res, next) => {
//   //    const posts = [
//   //     {
//   //         id:"fadf124211",
//   //         title: "First server-side post",
//   //         content: "This is coming from the server"
//   //     },
//   //     {
//   //         id:"kfdf124211",
//   //         title: "Second server-side post",
//   //         content: "This is coming from the server"
//   //     }
//   //    ];
//   Post.find().then((documents) => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents,
//     });
//   });
//   // console.log(documents);
// });
// //    res.status(200).json({
// //     message: "Posts fetched successfully!",
// //     posts : posts
// //    });
// // });

// app.get("/api/posts/:id"), (req, res, next) =>{
//     Post.findById(req.params.id).then(post => {
//         if (post) {
//             res.status(200).json(post);
//         } else{
//             res.status(404).json({ message: 'Post not found!'});
//         }
//     })
// }

// app.delete("/api/posts/:id", (req, res, next) => {
//   // console.log(req.param.id);
//   Post.deleteOne({ _id: req.params.id }).then((result) => {
//     console.log(result);
//     res.status(200).json({ message: "post deleted!" });
//   });
// });

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
