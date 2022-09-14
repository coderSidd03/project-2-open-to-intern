const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");

//const { default: mongoose } = require("mongoose");

const Creatcollege = async function (req, res) {
  try {
    let { name, fullName, logoLink, ...rest } = req.body;
    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .send({ status: false, Error: "please provide details" });
    }

    if (Object.keys(rest) > 0)
      return res
        .status(400)
        .send({ status: false, Error: "please provide required details only => name, fullName, logoLink" });
    if (!name)
      return res.status(400).send({ status: false, msg: "name is required" });
    if (!fullName)
      return res
        .status(400)
        .send({ status: false, msg: "fullName is required" });
    if (!logoLink)
      return res.status(400).send({ status: false, msg: "logoLink is required" });

    if (typeof name !== "string" || name.trim().length <= 0)
      return res
        .status(400)
        .send({ status: false, msg: "name must be a non empty string" });
    if (typeof fullName !== "string" || fullName.trim().length <= 0)
      return res
        .status(400)
        .send({ status: false, msg: "fullName must be a non empty string" });
    if (typeof logoLink !== "string"|| logoLink.trim().length <= 0)
      return res
        .status(400)
        .send({ status: false, msg: "logolink must be a non empty string"});

    const findcollege = await collegeModel.findOne({ name: name });
    if (findcollege) {
      return res
        .status(400)
        .send({ status: false, msg: "college already exist" });
    }
    const result = await collegeModel.create(req.body);
    res.status(201).send({ status: true, data: result });
  } catch (err) {
    res.status(500).status({ status: false, Error: err });
  }
};
//====================================================================================================
const getCollegeDetails = async function (req, res) {
  try {
    let collegeName = req.query;

    if (Object.keys(collegeName).length == 0) {
      return res.status(404).send({ status: false, msg: "Provide a college Name" });
    }
    let college = Object.values(collegeName).toLocaleString().trim()
    let getCollegeDetails = await collegeModel.findOne({name:college})
   // res.status(200).send({status:true,data:getCollegeDetails})
   if(!getCollegeDetails){
    res.status(400).send({status:false,msg:"college not exist"})
  }

  // let collegeId= getCollegeDetails["_id"]

   let internsDetails= await internModel.find({collegeId:getCollegeDetails["_id"]}).select({ _id: 1, name: 1, email: 1, mobile: 1 })
  //  getCollegeDetails.interns=internsDetails
   res.status(200).send({status:true,data: internsDetails})

   
}
    catch (err) {
        res.status(500).status({ status: false, Error: err });
      }
    }
module.exports ={ Creatcollege, getCollegeDetails};
