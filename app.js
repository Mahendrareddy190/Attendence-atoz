const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const studentrouter = require("./routes/student_list");
const Attendencerouter = require("./routes/attendence");
const Authrouter = require("./routes/user");

// dbcoonection
mongoose
  .connect(
    "mongodb+srv://mahi:<mahimahi>@cluster0.tqx4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db is connected "))
  .catch(() => console.log("db is not connected"));

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// my routesnp
app.use("/api", studentrouter);
app.use("/api", Attendencerouter);
app.use("/api", Authrouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
