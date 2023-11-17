import mongoose from "mongoose";

const secondHandDraft = new mongoose.Schema({
    productName:{
        type: String,
        require: true
    },
    productDes:{
        type:String
    },
    productPrice: {
        type:Number,
        require:true
    },
    productOld:{
        type:String
    },
    productPin:{
        type:Number,
        require:true
    },
    productCategory:{
        type: String,
        require:true
    },
    contact1:{
        type:Number
    },
    contact2:{
        type:Number
    },
    images:[],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    updatedDate:{
        type:Number,
        default:Date.now()
    },
    createdDate:{
        type:Number,
        default:Date.now()
    }
})
const productSecondHandDraft = mongoose.models.productSecondHandDraft1 || mongoose.model("productSecondHandDraft1", secondHandDraft)
export default productSecondHandDraft