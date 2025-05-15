import validator from "validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export async function signup(req, res)  {
    const {email, password, fullName} = req.body;

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required."})
        }
        
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters."})
        }
        
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Invalid email format."})
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "Email already exists."})
        }

        const indx = Math.floor(Math.random() * 100) + 1;
        const randomAvator = `https://avatar.iran.liara.run/public/${indx}.png`

        const newUser = new User.create({
            email,
            fullName,
            password,
            profilePic: randomAvator,
        })

        // TODO: CREATE THE USER IN STREAM AS WELL

        const token = jwt.sign(
            {userId: newUser._id}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: "7d"}
        )

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success: true, user: newUser})

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({message: "Internal Server Error"});        
    }
}
export function login(req, res) {
    res.send("login Route.")
}
export function logout(req, res) {
    res.send("logout Route.")
}

