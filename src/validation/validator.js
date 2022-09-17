const mongoose = require('mongoose');


//** Globally used functions **/

// checking that there is something as input
const checkInputsPresent = (value) => { return (Object.keys(value).length > 0) };

// validating that the input must be a non-empty string
const checkString = (value) => { return ((typeof (value) === 'string' && value.trim().length > 0)) };

// function to validate regex formats >  name ,fullName, logoLink, email , mobile, id
const validateName = (name) => { return (/^[a-z]+$/g.test(name)); }

const validateFullName = (fullName) => { return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(fullName)); }

const validateLogoLink = (logoLink) => {
    const urlRegex = /(http[s]:\/\/)([a-z\-0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-\/._~:?#\[\]@!$&'()+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
    return urlRegex.test(logoLink)
};

const validateEmail = (email) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)); }

const validateMobileNo = (number) => { return (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(number)); }

const validateId = (id) => { return mongoose.isValidObjectId(id); }


module.exports = { checkInputsPresent, checkString, validateName, validateFullName, validateLogoLink, validateEmail, validateMobileNo, validateId }