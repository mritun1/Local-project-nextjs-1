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
        ref:'user'
    },
    images:[],
    createdDate:{
        type:Date,
        default:Date.now()
    }
})

let draftNewsPost = mongoose.models.draftNewsPost || mongoose.model("draftNewsPost", draftNewsPostSchema)
export default draftNewsPost