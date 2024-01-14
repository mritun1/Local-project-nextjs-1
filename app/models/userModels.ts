import mongoose from "mongoose"

let userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    profilePic:{
        type:String
    },
    pinCode:{
        type:Number,
        require: true
    },
    gender:{
        type:String,
        require:true
    },
    profession:{
        type:String,
        require:true
    },
    professionSlug:{
        type:String
    },
    professionName: {
        type: String,
    },
    mobile:{
        type: Number,
        require: true,
        unique: true
    },
    contacts:[],
    contactPermission:{
        type:String,
    },
    password:{
        type: String,
        require: true
    },
    otp: {
        type: String
    },
    isActive: {
        type: Number,
        default: 0,
    },
    refID:{
        type: mongoose.Types.ObjectId,
        immutable:true
    },
    refPaid: {
        type: Number,//234 or 0
        default:0,
    },
    fcmToken:{
        type: String
    },
    createdDate:{
        type: Number,
        default: Date.now()
    },
    updatedDate: {
        type: Number,
        default: Date.now()
    },
})



let User = mongoose.models.user3 || mongoose.model("user3", userSchema);
export default User;