import mongoose from "mongoose";

let draftEventsPostSchema = new mongoose.Schema({
    startDate:{
        type:Date,
        require:true
    },
    endDate:{
        type:Date,
        require:true
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
        unique: true
    },
    images: [],
    createdDate: {
        type: Number,
        default: Date.now()
    }
})

let draftEventsPost = mongoose.models.EventPostDraft3 || mongoose.model("EventPostDraft3", draftEventsPostSchema)
export default draftEventsPost