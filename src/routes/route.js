//<<<<<<< HEAD




//=======
const express = require('express');
const router = express.Router();
const {Creatcollege,getCollegeDetails}= require("../controllers/collegecontroller")
const {createIntern} = require("../controllers/internController.js")


//** --------- //////           Create Intern             \\\\\\ --------- **//
router.post("/functionup/colleges",Creatcollege)
router.post("/functionup/interns", createIntern)

router.get("/functionup/collegeDetails",getCollegeDetails)
module.exports = router;
//>>>>>>> c80369524a4c630fadc8fc7d63fcb0079aab06d7
