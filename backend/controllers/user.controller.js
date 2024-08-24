const User = require("../models/user");


const all = async (req,res)=>{
    try {
        const all = await User.find({}).select("-password");
        return res.status(200).json(all);
    } catch (error) {
        console.error("Error in all users controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    all
}