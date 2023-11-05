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
        type: Number,
        default: Date.now()
    }
})

let eventsPost = mongoose.models.eventsPost3 || mongoose.model("eventsPost3", eventsPostSchema)
export default eventsPost