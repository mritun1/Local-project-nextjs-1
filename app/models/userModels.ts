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
        require: true
    },
    password:{
        type: String,
        require: true
    }
})
let User = mongoose.model("user",userSchema);
export default User;