const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const cookie_parser = require("cookie-parser");
const path = require("path");
const {connect} = require("./db/dbconnect");


const app = express();

const auth = require("./routes/auth");
const user = require("./routes/user");
const gets = require("./routes/gets");


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname,"/frontend")));

app.use("/api/auth",auth);
app.use("/api/user",user);
app.use("/api",gets);

app.get("/",(req,res)=>{
    res.status(200).json({"messgae":"HI"});
});




connect()
.then(()=>{
    console.log("db coonected");
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})


