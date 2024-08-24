const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookierParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

const connectToMongoDB = require("./db/connectToMongoDB");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookierParser());
app.use(cors());

app.use("/api/auth/",authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})