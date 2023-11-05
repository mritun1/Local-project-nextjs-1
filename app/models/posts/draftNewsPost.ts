import mongoose from "mongoose";

let draftNewsPostSchema = new mongoose.Schema({
    title :{
        type:String,
        require:true
    },
    des:{
        type:String,
        require:true
    },
    pin:{
        type:Number,
        require:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        unique:true
    },
    images:[],
    createdDate: {
        type: Number,
        default:Date.now()
    }
})

let draftNewsPost = mongoose.models.NewsPostDraft2 || mongoose.model("NewsPostDraft2", draftNewsPostSchema)
export default draftNewsPost