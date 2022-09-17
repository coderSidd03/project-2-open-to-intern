
const express = require('express');
const router = express.Router();
const { CreateCollege, getCollegeDetails } = require("../controllers/collegecontroller");
const { createIntern } = require("../controllers/internController.js");


//** --------- //////           APIs             \\\\\\ --------- **//


router.post("/functionup/colleges", CreateCollege);                         //  >>>>>     Create college

router.post("/functionup/interns", createIntern);                           //  >>>>>     Create Intern

router.get("/functionup/collegeDetails", getCollegeDetails);                //  >>>>>     get college details 


//  >>>>>     for all invalid routes 
router.all("/*", (req, res) => { res.status(404).send({ status: false, error: " / invalid - path params - provided / " }); });


module.exports = router;

