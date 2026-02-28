
const mongoose=require("mongoose");
module.exports=mongoose.model("User",new mongoose.Schema({
userId:String,guildId:String,
wallet:{type:Number,default:0},
bank:{type:Number,default:0},
xp:{type:Number,default:0},
level:{type:Number,default:0},
lastDaily:Date,lastWork:Date
}));
