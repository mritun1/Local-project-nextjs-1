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
        type: Number,
        default: Date.now()
    },
    updatedDate: {
        type: Number,
        default: Date.now()
    }
});

let NewsPost = mongoose.models.NewsPost4 || mongoose.model("NewsPost4", NewsPostSchema)
export default NewsPost