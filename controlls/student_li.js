const Student = require("../models/student_list");

exports.getStudentId = (req, res, next, Id) => {
  Student.findById(Id).exec((err, stude) => {
    if (err) {
      return res.status(400).json({
        error: "cant save into database",
      });
    }
    req.Student = stude;

    next();
  });
};

exports.createStudent = (req, res) => {
  let userId = req.userSchema._id;
  console.log(userId);
  let stu = new Student({
    name: req.body.name,
    rollno: req.body.rollno,
    section: req.body.section,
    userId: userId,
  });
  stu.save((err, student) => {
    if (err) {
      return res.status(400).json({
        error: "can`t save into database",
      });
    }
    res.json({ message: "successfully student add to database", student });
  });
};

exports.getStudent = (req, res) => {
  return res.json(req.Student);
};

exports.getallstudent = (req, res) => {
  Student.find({ userId: req.userSchema._id }).exec((err, student) => {
    if (err) {
      return res.status(400).json({
        error: "cant get student by id",
      });
    }
    return res.json(student);
  });
};

exports.deleteStudent = (req, res) => {
  let stud = req.Student;
  stud.remove((err, student) => {
    if (err) {
      return res.status(400).json({
        error: "cant delete student",
      });
    }
    res.json({ message: "successfully deleted", student });
  });
};
