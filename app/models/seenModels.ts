import mongoose from "mongoose";

let seen = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        require:true,
        unique:true
    },
    seenNewsPost:{
        type:Number,
        default:Date.now()
    },
    seenEventsPost: {
        type: Number,
        default: Date.now()
    },
    seenOffers: {
        type: Number,
        default: Date.now()
    },
    seenMarket: {
        type: Number,
        default: Date.now()
    },
    seenSecondHand: {
        type: Number,
        default: Date.now()
    },
    seenBusiness: {
        type: Number,
        default: Date.now()
    },
    seenGroups: {
        type: Number,
        default: Date.now()
    },
    seenPeoples: {
        type: Number,
        default: Date.now()
    }
})

let seenModels = mongoose.models.seenModels || mongoose.model('seenModels',seen)
export default seenModels