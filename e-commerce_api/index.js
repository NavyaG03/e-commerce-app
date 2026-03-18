const express=require("express");
const app=express();
const {connect_to_db}=require ("./database.js")
const dotenv=require("dotenv")
dotenv.config()
connect_to_db()
const userRoute=require("./routes/user.js")
const authRoute=require("./routes/auth.js")


app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute)
app.listen(process.env.PORT || 5000,()=>{
    console.log("backend server is running")
})