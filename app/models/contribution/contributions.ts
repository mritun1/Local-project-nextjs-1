import mongoose from "mongoose";

const contribute = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        require:true,
        immutable:true
    },
    itemType: {
        type: String, //News,Events
        require: true,
        immutable: true
    },
    itemId: {
        type: mongoose.Types.ObjectId,
        require: true,
        immutable: true
    },
    amount: {
        type: Number,
        require: true,
        immutable: true
    },
    comments: {
        type: String,
        immutable: true
    },
    createdDate: {
        type: Number,
        require:true,
        default:Date.now(),
        immutable: true
    },

});
const contributions = mongoose.models.contributions || mongoose.model("contributions",contribute)
export default contributions;