const User = require("../models/user");
const tokenandcookie = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"all field sre required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"incorrect email or password."});
        }

        const match = bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({error:"incorrect email or password."});
        }

        const token = tokenandcookie(user._id,res);

        return res.status(201).json({token,fullname:user.fullname});


    } catch (error) {
        console.log("error at login",error);
        res.status(500).json({error:"internal server error"});
    }
}

const signup = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;

        if (!fullname || !email || !password ) {
            return res.status(400).json({ error: "All details are required" });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ error: "email is already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = tokenandcookie(newUser._id, res);

        res.status(201).json({
            token,fullname:newUser.fullname
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = async(req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

module.exports = {
    login,
    signup,
    logout
}