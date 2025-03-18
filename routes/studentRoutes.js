const express = require("express");
const router = express.Router(); // Fix Router issue
const Student = require("../models/student");
const multer = require("multer");


//set up multer to store files in /uploads folder

// const storage = multer.diskStorage({
//   destination:  (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename:  (req, file, cb) => {
//     const suffix = Date.now()
//     cb(null,suffix + "_" + file.originalname);
//   },
// });

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  }
});




const upload = multer({ storage: storage });

// Middleware to parse JSON (Add this in server.js)
router.use(express.json());

router.post("/create", upload.single("photo")  , async (req, res) => {
  try {

    // Log the received request body
    console.log("Request Body:", req.body);

    const { name, age,phone , email, address } = req.body;

    // const photopath =req.file ? req.file.path : null; // get the file if uploaded 

    const photoBase64 =req.file ? req.file.buffer.toString('base64') : null ; // get the file if uploaded 
    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new student
    const newStudent = new Student({
      name,
      age,
      phone,
      email,
      address,
      photo: photoBase64,
    });

    // Save to database
    await newStudent.save();

    res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

