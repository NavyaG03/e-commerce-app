const mongoose=require("mongoose");
async function connect_to_db(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connection is successful")
    }
    catch(err){
        console.error("DB connection failed:", err.message);
    }
} 
module.exports={connect_to_db}