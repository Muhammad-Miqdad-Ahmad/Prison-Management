const express = require("express");
const client = require("./Connections/Connections");
require("dotenv").config();
const cors = require('cors');

const AdminRouter = require("./routes/AdminRoutes");
const GuardRouter = require("./routes/GuardRoutes");
const VisitorRouter = require("./routes/VisitorRoutes");
const PrisonerRouter = require("./routes/PrisonerRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/guard", GuardRouter);
app.use("/admin", AdminRouter);
app.use("/visitor", VisitorRouter);
app.use("/prisoner", PrisonerRouter);

client.connect(function (err) {
  if (err) {
    console.log("An Error has occurred");
    console.error(err);
  } else {
    console.log("Data Base Connected 😊");
    app.listen(
      process.env.PORT,
      console.log(`Server is running at PORT ${process.env.PORT} 🫠`)
    );
  }
});
