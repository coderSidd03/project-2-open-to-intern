const internModel = require('../model/internModel.js');
const collegeModel = require('../model/collegeModel.js');
const Validator = require('../validation/validator');

//============================      create intern       ==================   /functionup/interns"   ===============
// ### POST /functionup/interns
// - Create a document for an intern.
// - Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
// - Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like [this](#successful-response-structure)
// - Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)


//============================      create interns       ==================   /functionup/interns   ===============

const createIntern = async (req, res) => {
    try {
        let internData = req.body;
        let { name, mobile, email, collegeName, ...rest } = internData;

        // checking that non empty body found
        if (!Validator.checkInputsPresent(internData)) return res.status(400).send({ status: false, msg: "nothing found from body" });

        // checking that nothing given other than required fields
        if (Validator.checkInputsPresent(rest)) return res.status(404).send({ status: false, msg: "provide required details only => name, mobile, email, collegeName" });

        // checking that all inputs are in non empty string and validating with regex
        // name , email , mobile
        if (!Validator.checkString(name)) return res.status(400).send({ status: false, msg: "name required to create new intern ( in string )" })
        if (!Validator.validatefullName(name)) return res.status(400).send({ status: false, msg: "invalid name provided" })

        if (!Validator.checkString(email)) return res.status(400).send({ status: false, msg: "email required to create new intern ( in string )" });
        if (!Validator.validateEmail(email)) return res.status(400).send({ status: false, msg: "invalid email provided" });

        if (!Validator.checkString(mobile)) return res.status(400).send({ status: false, msg: "mobile required to create new intern ( in string );" })
        if (!Validator.validateMobileNo(mobile)) return res.status(400).send({ status: false, msg: "invalid mobile no provided" });

       
        // finding that email is already present inside DB or not ?
        let findEmailId = await internModel.findOne({ email: email });
        if (findEmailId) return res.status(404).send({ status: false, message: "provided email is already used...." });

        // finding that mobile no is already present inside DB or not ?
        let findMobile = await internModel.findOne({ mobile: mobile });
        if (findMobile) return res.status(404).send({ status: false, message: 'provided Mobile No is already used....' });

        // finding that if college is present in DB or not ?
        let findCollege = await collegeModel.findOne({ name: collegeName.toLowerCase(), isDeleted: false })
        if (!findCollege) return res.status(404).send({ status: false, message: "provided college is not present in DB" })

        // setting the found college's id inside data
        internData.collegeId = findCollege._id;

        // create the intern data in DB
        let createdIntern = await internModel.create(internData);
        return res.status(201).send({ status: true, data: createdIntern });

    } catch (error) {
        res.status(500).send({ status: "ERROR", error: error.message });
    }
}


module.exports = { createIntern }