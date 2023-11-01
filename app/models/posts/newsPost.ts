import mongoose from "mongoose";

let NewsPostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    des: {
        type: String,
        require: true
    },
    pin: {
        type: Number,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    images: [],
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

let NewsPost = mongoose.models.NewsPost || mongoose.model("NewsPost", NewsPostSchema)
export default NewsPost