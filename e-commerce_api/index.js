const express=require("express");
const app=express();
const {connect_to_db}=require ("./database.js")
const dotenv=require("dotenv")
dotenv.config()
connect_to_db()
const userRoute=require("./routes/user.js")
const authRoute=require("./routes/auth.js")
const productRoute=require("./routes/product.js")
const orderRoute=require("./routes/order.js")
const cartRoute=require("./routes/cart.js")

app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/product",productRoute)
app.use("/api/order",orderRoute)
app.use("api/cart",cartRoute)
app.listen(process.env.PORT || 5000,()=>{
    console.log("backend server is running")
})