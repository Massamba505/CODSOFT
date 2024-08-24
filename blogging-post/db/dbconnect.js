const mongoose = require("mongoose");


const connect = async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGOOSE_URI);
        return response;
    } catch (error) {
        throw new Error("error while connecting to mongodb");
    }
}

module.exports = {connect}