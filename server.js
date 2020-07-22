const http = require("http");
const express = require("express");
const app = express();
const cors = require('cors');
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectID = mongodb.ObjectID;
const bodyparser = require("body-parser");
const dotenv=require("dotenv");
dotenv.config();
app.use(bodyparser.json());
app.use(cors({
    origin: '*'
}));

const dbURL = "mongodb+srv://padma:pa6789@cluster0.rkjto.mongodb.net/schoolRecords?retryWrites=true&w=majority";
//const dbURL=" mongodb://127.0.0.1:27017/?"

let studentDetails = [];
let staffDetails = [];
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("your app is running in", port));

app.get("/", (req, res) => {
  res.send("<h1>Simple GET & POST request app..! </h1>");
});
app.post("/studentCreation", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    client
      .db("schoolRecords")
      .collection("students")
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        client.close();
        console.log("student Created successfully, Connection closed");
        res.status(200).json({
          message: "student Created..!!",
        });
      });
  });
});

app.post("/staffCreation", (req, res) => {
   mongoClient.connect(dbURL, (err, client) => {
    client
      .db("schoolRecords")
      .collection("staff")
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        client.close();
        console.log("staff Created successfully, Connection closed");
        res.status(200).json({
          message: "staff Created..!!",
        });
      });
  });
});

app.get("/allStaff", (req, res) => {
 mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    let db = client.db("schoolRecords");
    db.collection("staff")
      .find()
      .toArray()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json({
          message: "No data Found or some error happen",
          error: err,
        });
      });
  });
});

app.get("/allStudents", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    let db = client.db("schoolRecords");
    db.collection("students")
      .find()
      .toArray()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json({
          message: "No data Found or some error happen",
          error: err,
        });
      });
  });
});

app.put("/editStudent", (req, res) => {
   mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("schoolRecords")
      .collection("students")
      .findOneAndUpdate({ id:req.body.id }, { $set:req.body })
      .then((data) => {
        console.log("students data update successfully..!!");
        client.close();
        res.status(200).json({
          message: "student data updated..!!",
        });
      });
  });
});

app.delete("/deleteStudent", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("schoolRecords")
      .collection("students")
      .deleteOne({ id:req.body.id }, (err, data) => {
        if (err) throw err;
        client.close();
        res.status(200).json({
          message: "student deleted...!!",
        });
      });
  });
});

