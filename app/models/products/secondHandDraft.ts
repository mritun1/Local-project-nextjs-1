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
    productCatName: {
        type: String,
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
const productSecondHandDraft = mongoose.models.productSecondHandDraft3 || mongoose.model("productSecondHandDraft3", secondHandDraft)
export default productSecondHandDraft