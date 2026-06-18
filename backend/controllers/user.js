import { User } from "../models/user.js"
import bcrypt from "bcryptjs";

import { setUser } from "../services/auth.js"



export const registerUser = async(req,res) => {
    try{
        const {fullname,username,password,confirmpassword,gender} = req.body;

    if(!fullname || !username || !password || !confirmpassword || !gender ){
        return res.status(400).json({message : "All fields are required " })
    }

    if(password !== confirmpassword){
        return res.status(400).json({message : "password do not match " })
    }

    const user = await User.findOne({username : username});
    if(user){
        return res.status(400).json({message : "username already exists" })
    }


    const hashedPassword =  await bcrypt.hash(password,10);
    const maleProfilePhoto = `https://res.cloudinary.com/dtliouqev/image/upload/v1781713962/OIP_phvb5j.webp`
    const femaleProfilePhoto = `https://res.cloudinary.com/dtliouqev/image/upload/v1781714509/female_qodlae.webp`

    const newUser = new User({
        fullname,
        username,
        password : hashedPassword,
        profilePhoto : gender === "male" ? maleProfilePhoto : femaleProfilePhoto ,
        gender
    })

    await newUser.save();

    // also make the user logedin
    const token = setUser(newUser)

    return res.status(201).cookie("token",token,{
        httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'lax',
      maxAge : 60 * 60 * 1000
    }).json({message : "Registered successfully!", success : true,user : newUser});
    }
    catch (error){
        console.log(error);
    }

}


export const loginUser = async(req,res) => {
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message : "username not found"});
        }


        const isPasswordMatched = await bcrypt.compare(password,user.password);

        if(!isPasswordMatched){
             return res.status(400).json({message : "Incorrect username or password"});
        }

        const token = setUser(user);
        return res.cookie("token",token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'lax',
      maxAge : 60 * 60 * 1000
    }).status(200).json({
            userId : user._id,
            username : user.username,
            success : true,
            message : "Logined Successfully!",
            user : user
        })

    }
    catch (error) {
        console.log(error);
    }
}

 export const logoutUser = (req,res) => {
    try{
         res.clearCookie("token")
         console.log("logout hogya bhai");
         return res.status(200).json({
            message : " Logout successfully",
            success : true
         })
    }
    catch (error) {
        console.log(user);
    }
}

export const getOtherUsers = async(req,res) => {
    try{
        const loginedUserId = req.id;
        console.log(req.id);
        const otherUsers   = await User.find({_id : {$ne : loginedUserId} }).select("-password");

        return res.status(200).json(otherUsers);
    }
    catch (error) {
        console.log(error);
    }
}


export async function getProfile(req,res){

    const user = await User.findOne({_id : req.id});
    console.log(user);

    return res.status(200).json({message : "success", user: user })

}