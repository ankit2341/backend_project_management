const {connection}=require("./config/db");
const { userRouter } = require("./routes/user.route");
const { projectRouter }=require("./routes/projects.route");
const cors=require("cors");
const express=require("express");

const app=express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.use("/users",userRouter);
app.use("/projects",projectRouter);

app.get("/",async(req,res)=>{
    try{
       res.status(200).send({"msg":"welocme to projects database"});
    }
    catch(err){
        res.status(404).send({"msg":"error connecting to api"})
    }
})

app.listen(4500,async(req,res)=>{
    try{
        await connection;
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log("running server")
})