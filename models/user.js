const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const uniquevALIDATOR = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify:{
        type:Boolean,
        default: false,
    }
  },
  {
    collection: "users",
  },
  
);

userSchema.plugin(uniquevALIDATOR, { message: "email alread exisits" });

module.exports = mongoose.model("User", userSchema);
