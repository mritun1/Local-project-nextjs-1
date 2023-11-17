import mongoose from "mongoose";

const secondHand = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    productDes: {
        type: String
    },
    productPrice: {
        type: Number,
        require: true
    },
    productOld: {
        type: String
    },
    productPin: {
        type: Number,
        require: true
    },
    productCategory: {
        type: String,
        require: true
    },
    contact1: {
        type: Number
    },
    contact2: {
        type: Number
    },
    images: [],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    updatedDate: {
        type: Number,
        default: Date.now()
    },
    createdDate: {
        type: Number,
        default: Date.now()
    }
})
const productSecondHand = mongoose.models.productSecondHand || mongoose.model("productSecondHand", secondHand)
export default productSecondHand