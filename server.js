const http = require("http");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = 4000;
app.use(bodyparser.json());
let studentDetails = [];
let staffDetails = [];

app.post("/studentCreation", (req, res) => {
  studentDetails.push(req.body);
  res.json({ message: "student created" });
});

app.post("/staffCreation", (req, res) => {
  staffDetails.push(req.body);
  res.json({ message: "staff created" });
});

app.get("/allStaff", (req, res) => {
  for (let i = 0; i < staffDetails.length; i++) {
    let count = 0;
    for (let j = 0; j < studentDetails.length; j++) {
      if (staffDetails[i].id === studentDetails[j].staff_id) {
        count += 1;
      }
    }
    staffDetails[i].student_count = count;
  }
  let staff = staffDetails.map((data) => {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      student_count: data.student_count,
    };
  });
  res.json(staff);
});

app.get("/allStudents", (req, res) => {
  let students = studentDetails.map((data) => {
    return {
      id: data.id,
      name: data.name,
      staff_id: data.staff_id,
    };
  });
  res.json(students);
});

app.put("/editStudent/:id", (req, res) => {
  studentDetails.forEach((elem) => {
    if (elem.id == req.params.id) {
      elem.name = req.body.name;
      res.status(200).send({
        message: "User Updated..!",
      });
    }
  });
  res.send("student name is edited");
});

app.delete("/deleteStudent/:id", (req, res) => {
  let filterval = studentDetails.filter((val) => {
    if (val.id == req.params.id) {
      return val;
    }
  })[0];
  let index = studentDetails.indexOf(filterval);
  studentDetails.splice(index, 1);
  res.json({ message: "student deleted" });
});
app.listen(process.env.PORT || port, () => {
  console.log(`the server is listening ${port}`);
});

