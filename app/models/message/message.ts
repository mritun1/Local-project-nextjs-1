import mongoose from "mongoose";

const msg = new mongoose.Schema({
    bulkChat:{
        type:Number //0 = false, 1= true
    },
    bulkApproved: {
        type: Number //0 = false, 1= true
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
    updatedDate:{
        type:Number,
    },
    createdDate:{
        type:Number
    }
})
const messageLists = mongoose.models.messageLists || mongoose.model("messageLists",msg)
export default messageLists