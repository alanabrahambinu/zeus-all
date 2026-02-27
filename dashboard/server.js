
const express=require("express");
const app=express();
app.get("/",(req,res)=>res.send("Dashboard Running"));
app.listen(process.env.PORT||3000,()=>console.log("Dashboard started"));
