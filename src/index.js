const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const userRoutes = require("./routes/user.routes.js");
const postRoutes = require("./routes/post.routes.js");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
