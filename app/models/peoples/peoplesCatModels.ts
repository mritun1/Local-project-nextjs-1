import mongoose from "mongoose";

const peoples = new mongoose.Schema({
    categoryName:{
        type:String
    },
    tags:{
        type:String
    }
})

let peoplesCatModels = mongoose.models.peoplesCatModels || mongoose.model('peoplesCatModels',peoples)
export default peoplesCatModels