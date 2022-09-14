
const express = require('express');
const router = express.Router();
const { CreateCollege, getCollegeDetails } = require("../controllers/collegecontroller")
const { createIntern } = require("../controllers/internController.js")


//** --------- //////           APIs             \\\\\\ --------- **//

//  >>>>>     Create college
router.post("/functionup/colleges", CreateCollege) 

//  >>>>>     Create Intern
router.post("/functionup/interns", createIntern)

//  >>>>>     get college details 
router.get("/functionup/collegeDetails", getCollegeDetails)


module.exports = router;

