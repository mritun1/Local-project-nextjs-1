import mongoose from "mongoose";

const product = new mongoose.Schema({
    categoryName:{
        type:String,
        require:true
    },
    categorySlug: {
        type: String,
        require: true
    }
})

const productCategories = mongoose.models.productCat1 || mongoose.model("productCat1", product)
export default productCategories