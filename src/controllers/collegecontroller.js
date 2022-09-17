const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");
const Validator = require("../validation/validator");


//============================      create college       ==================   /functionup/colleges   ===============

const CreateCollege = async (req, res) => {
    try {

        let { name, fullName, logoLink, ...rest } = req.body;

        if (!Validator.checkInputsPresent(req.body)) return res.status(400).send({ status: false, Error: "please provide details" });

        if (Validator.checkInputsPresent(rest)) return res.status(400).send({ status: false, Error: "please provide required details only => name, fullName, logoLink" });

        if (!Validator.checkString(name)) return res.status(400).send({ status: false, msg: "name is required ( in string )" });
        if (!Validator.validateName(name)) return res.status(400).send({ status: false, msg: "name is invalid " });

        if (!Validator.checkString(fullName)) return res.status(400).send({ status: false, msg: "fullName is required ( in string )" });
        if (!Validator.validateFullName(fullName)) return res.status(400).send({ status: false, msg: "fullName is invalid" });

        if (!Validator.checkString(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required ( in string )" });
        if (!Validator.validateLogoLink(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is invalid" });


        const findCollegeName = await collegeModel.findOne({ name: name.toLowerCase() });
        if (findCollegeName) return res.status(409).send({ status: false, msg: "college already exist" });

        const findCollegeFullName = await collegeModel.findOne({ name: fullName.toLowerCase() });
        if (findCollegeFullName) return res.status(409).send({ status: false, msg: "college already exist" });

        // creating new document
        const result = await collegeModel.create(req.body);
        res.status(201).send({ status: true, data: result });
    } catch (err) {
        res.status(500).status({ status: false, Error: err.message });
    }
};

//============================      get college Details       ==================   /functionup/collegeDetails   ===============
const getCollegeDetails = async (req, res) => {
    try {
        let collegeName = req.query.collegeName;

        if (!collegeName) return res.status(400).send({ status: false, msg: "Provide only collegeName in query" });

        let getCollegeDetails = await collegeModel.findOne({ name: collegeName.toLowerCase(), isDeleted: false });
        if (!getCollegeDetails) return res.status(404).send({ status: false, msg: "college data not exist or deleted already" });

        let internsDetails = await internModel.find({ collegeId: getCollegeDetails._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });
        if (internsDetails.length === 0) (internsDetails.push({ status: false, msg: "no interns found for the given college or deleted already" }));

        let result = {
            name: getCollegeDetails['name'],
            fullName: getCollegeDetails['fullName'],
            logoLink: getCollegeDetails['logoLink'],
            interns: internsDetails
        };
        res.status(200).send({ status: true, data: result });

    } catch (err) {
        res.status(500).status({ status: false, Error: err.message });
    }
}



module.exports = { CreateCollege, getCollegeDetails };
