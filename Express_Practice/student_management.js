const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/1208", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.log("Mongo ", err);
});


const db = mongoose.connection;


app.use(bodyParser.json());


const student = mongoose.model("student", {
  name: String,
  roll: Number,
  branch: String,
});


app.post("/student", async (req, res, next) => {
  try {
    const std = new student(req.body);
    await std.save();
    res.send(std);
    next();
  } catch (err) {
    console.error(err);
  }
});


app.get("/student", async (req, res, next) => {
  try {
    const std = await student.find();
    res.send(std);
    next();
  } catch (err) {
    console.error(err);
  }
});


app.get("/student/:id", async (req, res, next) => {
  try {
    const std = await student.findById(req.params.id);
    res.send(std);
    next();
  } catch (err) {
    console.error(err);
  }
});


app.delete("/student/:id", async (req, res) => {
  try {
    await student.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    console.error(err);
  }
});


app.put("/student/:id", async (req, res) => {
  try {
    const std = await student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(std);
  } catch (err) {
    console.error(err);
  }
});


app.listen(PORT, () => {
  console.log("Server connected");
})