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
    mobile:{
        type: Number,
        require: true,
        unique: true
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
    createdDate:{
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    },
})



let User = mongoose.models.user1 || mongoose.model("user1", userSchema);
export default User;