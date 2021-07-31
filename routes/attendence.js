const express = require("express");
const router = express.Router();
const {
  attendence,
  addAttendence,
  SingleAttendence,
  AllAttendence,
  deleteAttendence,
  match,
} = require("../controlls/attendence");
const { userids } = require("../controlls/user");

router.param("userId",userids);
router.param("attendenceId", attendence);
router.post("/created/:userId", addAttendence);
router.post("/match/:userId", match);
router.get("/get/:attendenceId", SingleAttendence);
router.get("/getalls/:userId", AllAttendence);
router.delete("/delete/:attendenceId", deleteAttendence);

module.exports = router;
