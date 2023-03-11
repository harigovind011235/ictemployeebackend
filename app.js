// Task1: initiate app and run server at 3000
const express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");
const { employeeModel } = require("./model/Employee");
const sampleData = require("./sampledata.js");

PORT = 3000;
const app = express();

app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
  //   loadData();
});

const path = require("path");
app.use(express.static(path.join(__dirname + "/dist/FrontEnd")));

// Task2: create mongoDB connection
Mongoose.connect(
  "mongodb+srv://harigovind3020:VNKVanxd3Re2qSMt@cluster0.8rwtyz4.mongodb.net/ictemployeedb?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//Loading a sample data documents to my employee collection
async function loadData() {
  try {
    await employeeModel.deleteMany({});
    await employeeModel.insertMany(sampleData);
    console.log("Demo data loaded successfully");
  } catch (e) {
    console.log(`error -> ${e}`);
  }
}

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist", async (req, res) => {
  try {
    let data = await employeeModel.find();
    res.json(data);
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id", async (req, res) => {
  try {
    let employeeID = req.params.id;
    const employee = await employeeModel.findById(employeeID);
    res.json(employee);
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
});

//TODO: send data to db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post("/api/employeelist", async (req, res) => {
  try {
    var data = await new employeeModel(req.body);
    data.save();
    res.json({ status: "success" });
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", async (req, res) => {
  try {
    let employeeID = req.params.id;
    const deleted = await employeeModel.findByIdAndDelete(employeeID);
    res.json({ status: "deleted" });
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put("/api/employeelist", async (req, res) => {
  try {
    let data = await employeeModel.findOneAndUpdate(
      { _id: req.body },
      req.body
    );
    res.json(data);
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
});

//! dont delete this code. it connects the front end file.
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/Frontend/index.html"));
});
