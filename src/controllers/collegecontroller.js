const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");
const Validator = require("../validation/validator");


//============================      create college       ==================   /functionup/colleges   ===============

const CreateCollege = async function (req, res) {
    try {
        let { name, fullName, logoLink, ...rest } = req.body;
        console.log(logoLink)
        if (!Validator.checkInputsPresent(req.body)) {
            return res.status(400).send({ status: false, Error: "please provide details" });
        }

        if (Validator.checkInputsPresent(rest)) return res.status(400).send({ status: false, Error: "please provide required details only => name, fullName, logoLink" });

        if (!Validator.checkString(name)) return res.status(400).send({ status: false, msg: "name is required" });
        if (!Validator.validateName(name)) return res.status(400).send({ status: false, msg: "name is invalid,Enter in lowerCase  " });
        
        if (!Validator.checkString(fullName)) return res.status(400).send({ status: false, msg: "fullName is required" });
        if (!Validator.validatefullName(fullName)) return res.status(400).send({ status: false, msg: "fullName is invalid" });

        if (!Validator.checkString(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required" });
        if(!Validator.validatelogoLink(logoLink)) return res.status(400).send({status:false, msg:"logoLink is invalid"})
        
        const findcollege = await collegeModel.findOne({ name: name });

        if (findcollege) return res.status(404).send({ status: false, msg: "college already exist" });

        const result = await collegeModel.create(req.body);

        res.status(201).send({ status: true, data: result });
    } catch (err) {
        res.status(500).status({ status: false, Error: err });
    }
};


//============================      get college Details       ==================   /functionup/collegeDetails   ===============

const getCollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;

        if (!collegeName) return res.status(400).send({ status: false, msg: "Provide collegeName in query" });

        let getCollegeDetails = await collegeModel.findOne({ name: collegeName, isDeleted: false });
        if (!getCollegeDetails) return res.status(400).send({ status: false, msg: "college not exist or deleted already" });

        let internsDetails = await internModel.find({ collegeId: getCollegeDetails._id, isDeleted: false })
        if (internsDetails.length == 0) return res.status(400).send({ status: false, msg: "no interns found for the given coollege or deleted already" });


        let result = {
            name: getCollegeDetails['name'],
            fullName: getCollegeDetails['fullName'],
            logoLink: getCollegeDetails['logoLink'],
            interns: internsDetails
        }
        res.status(200).send({ status: true, data: result })

    } catch (err) {
        res.status(500).status({ status: false, Error: err.message });
    }
}



module.exports = { CreateCollege, getCollegeDetails };
