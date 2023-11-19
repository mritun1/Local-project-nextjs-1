import mongoose from "mongoose";

const msg = new mongoose.Schema({
    bulkChat:{
        type:Number, //0 = false, 1= true
        default:0
    },
    bulkApproved: {
        type: Number, //0 = false, 1= true
        default:0
    },
    firstUser:{
        type:mongoose.Types.ObjectId,
    },
    secondUser:{
        type:mongoose.Types.ObjectId,
    },
    lastUserId:{
        type:mongoose.Types.ObjectId
    },
    lastMessage:{
        type:String,
    },
    count: {
        type: Number,
        default:0
    },
    updatedDate:{
        type:Number,
    },
    createdDate:{
        type:Number
    }
})
const messageLists = mongoose.models.messageLists1 || mongoose.model("messageLists1",msg)
export default messageLists