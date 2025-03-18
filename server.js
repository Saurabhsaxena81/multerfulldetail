const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const db = require("./db");
const { log } = require("console");
app.use(bodyParser.json()); // req.body
app.use(express.json());
const studentRoutes = require("./routes/studentRoutes");


app.use("/student" , studentRoutes)
app.get("/" , (req ,res)=>{
  res.send(`<h1>multer server is listening</h1>`)
 });

app.listen(port, () => {
  console.log(`Server is running on port 3000`);
});
