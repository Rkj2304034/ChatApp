import mongoose from "mongoose";

// make schema
const messageSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        type : String,
        default : ""
    },
    mediaType : {
        type : String,
        enum : ["Image", "Pdf" , "File"],
        default : null
    },
    mediaUrl : {
        type : String,
        default : null
    }
},{timestamps : true})

 export  const  Message = mongoose.model("Message",messageSchema);