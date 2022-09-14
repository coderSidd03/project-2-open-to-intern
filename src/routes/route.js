const express = require('express');
const router = express.Router();

const InternController = require("../controllers/internController.js")


//** --------- //////           Create Intern             \\\\\\ --------- **//
router.post("/functionup/interns", InternController.createIntern)


module.exports = router;