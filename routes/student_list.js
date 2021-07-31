const express = require("express");
const {
  getStudentId,
  createStudent,
  getStudent,
  getallstudent,
  deleteStudent,
} = require("../controlls/student_li");
const { userids } = require("../controlls/user");
const router = express.Router();

router.param("userId", userids);
router.param("studentId", getStudentId);
router.post("/create/:userId", createStudent);
router.get("/get/:studentId", getStudent);
router.get("/getall/:userId", getallstudent);
router.delete("/delete/:studentId", deleteStudent);

module.exports = router;
