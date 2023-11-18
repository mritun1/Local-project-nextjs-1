import mongoose from "mongoose";

const msg = new mongoose.Schema({
    messageId:{
        type:String,
    },
    userId:String,
    content:String,
    images:[],
    videos:[],
    files:[],
    createdDate:{
        type:Number,
        default:Date.now()
    }
})
const messageChat = mongoose.models.messageChat || mongoose.model("messageChat",msg)
export default messageChat