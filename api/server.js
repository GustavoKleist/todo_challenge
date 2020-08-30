const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

//BD
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.qnm52.mongodb.net/mydatabase?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("BD ON"))
  .catch(() => console.log("BD OFF"));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  }
  next();
});

//ROUTES
const userRouter = require("./src/routers/userRoutes");
const projectRouter = require("./src/routers/projectRoutes");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//SERVER
app.listen(8000, () => {
  console.log("i am alive on port 8000");
});
