import mongoose from "mongoose";

let eventsPostSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
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

let eventsPost = mongoose.models.eventsPost || mongoose.model("eventsPost", eventsPostSchema)
export default eventsPost