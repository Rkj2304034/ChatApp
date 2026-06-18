import mongoose from "mongoose";

// making a user model 

// make schema
const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profilePhoto : {
        type : String,
        default : ""
    },
    gender : {
        type : String,
        enum : ["male","female"],
        required : true
    },
},{timestamps : true})


// make model

export const User = mongoose.model("User",userSchema);