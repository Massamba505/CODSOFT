const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const express = require("express");
const cookierParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

const connectToMongoDB = require("./db/connectToMongoDB");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookierParser());// CORS configuration

const corsOptions = {
    origin: 'http://localhost:5173', // The origin of your frontend
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.use("/api/auth/",authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})