const jwt = require("jsonwebtoken");

const tokenandcookie = (userId, res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    });

    res.cookie("jwt",  token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    
    return token;
}

module.exports = tokenandcookie;