import mongoose from "mongoose";

const chat = new mongoose.Schema({
    groupId:mongoose.Types.ObjectId,
    senderId:mongoose.Types.ObjectId,
    chatContent: String,
    images:[],
    videos:[],
    files:[],
    createdDate:Number,
})
const groupsChatDraft = mongoose.models.groupsChatDraft || mongoose.model("groupsChatDraft",chat)
export default groupsChatDraft