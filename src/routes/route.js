
const express = require('express');
const router = express.Router();
const {Createcollege,getCollegeDetails}= require("../controllers/collegecontroller")
const {createIntern} = require("../controllers/internController.js")


//** --------- //////           Create Intern             \\\\\\ --------- **//
router.post("/functionup/colleges",Createcollege)
router.post("/functionup/interns", createIntern)

router.get("/functionup/collegeDetails",getCollegeDetails)
module.exports = router;

