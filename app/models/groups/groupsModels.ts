import mongoose from "mongoose";

const groups = new mongoose.Schema({
    groupName:String,
    groupPic:String,
    groupPin:Number,
    groupCreatorId:mongoose.Types.ObjectId,
    groupMembers:[],
    updatedDate:{
        type:Number,
        default:Date.now()
    },
    createdDate:{
        type: Number,
        default: Date.now()
    }
})
const groupsModels = mongoose.models.groupsModels || mongoose.model("groupsModels",groups)
export default groupsModels