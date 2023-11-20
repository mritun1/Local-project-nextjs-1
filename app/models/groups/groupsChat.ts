import mongoose from "mongoose";

const chat = new mongoose.Schema({
    groupId: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId,
    chatContent: String,
    images: [],
    videos: [],
    files: [],
    createdDate: Number,
})
const groupsChat = mongoose.models.groupsChat || mongoose.model("groupsChat", chat)
export default groupsChat