const mongoose=require('mongoose');module.exports=mongoose.model('Ticket',new mongoose.Schema({channelId:String,userId:String,createdAt:Date}));
