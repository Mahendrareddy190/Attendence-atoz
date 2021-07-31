const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollno: {
      type: String,
      trim: true,
      required: true,
    },
    section: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
