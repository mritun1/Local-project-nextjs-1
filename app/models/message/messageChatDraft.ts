import mongoose from "mongoose";

const msg = new mongoose.Schema({
    messageId: {
        type: String,
    },
    userId: String,
    content: String,
    images: [],
    videos: [],
    files: [],
    createdDate: {
        type: Number,
        default: Date.now()
    }
})
const messageChatDraft = mongoose.models.messageChatDraft || mongoose.model("messageChatDraft", msg)
export default messageChatDraft