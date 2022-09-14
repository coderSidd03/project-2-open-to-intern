<<<<<<< HEAD




=======
const express = require('express');
const router = express.Router();

const InternController = require("../controllers/internController.js")


//** --------- //////           Create Intern             \\\\\\ --------- **//
router.post("/functionup/interns", InternController.createIntern)


module.exports = router;
>>>>>>> c80369524a4c630fadc8fc7d63fcb0079aab06d7
