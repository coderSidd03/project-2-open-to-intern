const mongoose = require("mongoose");
const collegeSchema = new mongoose.schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },

    fullName: {
        type: String,
        required: true,
        trim:ture
    },

    logoLink: {
        type: String,
        required: true,
        trim:true
    },

    isDeleted: {
        type: Boolean,
        default: false,
        trim:true
    }

}, {newtimeStamp:true})

module.exports = model.mongoose('College',collegeSchema);

